"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useProfile } from "@/hooks/useProfile";
import { searchSkills } from "@/services/skills";
import { UserType } from "@/types/user";
import { Pencil, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface EditSkillsModalProps {
  user: UserType;
  onUpdate?: () => void;
}

interface Skill {
  id: string;
  name: string;
}

export function EditSkillsModal({ user, onUpdate }: EditSkillsModalProps) {
  const [skills, setSkills] = useState<string[]>(
    user.skills?.map((s) => s.skill.name) || []
  );
  const [newSkill, setNewSkill] = useState("");
  const [searchResults, setSearchResults] = useState<Skill[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const { toast } = useToast();
  const { handleProfileOperation } = useProfile();
  const initialSkills = user.skills?.map((s) => s.skill.name) || [];
  const hasChanges =
    JSON.stringify(skills.sort()) !== JSON.stringify(initialSkills.sort());

  useEffect(() => {
    if (newSkill.trim()) {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
      searchTimeout.current = setTimeout(async () => {
        setIsSearching(true);
        try {
          const results = await searchSkills(newSkill);
          setSearchResults(results);
        } catch (error) {
          console.error("Error searching skills:", error);
        } finally {
          setIsSearching(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
    }
  }, [newSkill]);

  const handleAddSkill = (skillName: string) => {
    if (!skillName.trim() || skills.includes(skillName.trim())) return;
    setSkills([...skills, skillName.trim()]);
    setNewSkill("");
    setSearchResults([]);
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await handleProfileOperation({
        type: "skills",
        action: "update",
        data: skills,
      });
      onUpdate?.();
      toast({
        title: "Skills updated",
        description: "Your skills have been updated successfully.",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update skills. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Skills</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative">
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                value={newSkill}
                onValueChange={setNewSkill}
                placeholder="Search or add a skill..."
                className="h-9"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newSkill.trim()) {
                    handleAddSkill(newSkill);
                  }
                }}
              />
              {searchResults.length > 0 && (
                <CommandList>
                  {/* @ts-ignore */}
                  <CommandEmpty>No matching skills found.</CommandEmpty>
                  <CommandGroup>
                    {searchResults.map((skill) => (
                      <CommandItem
                        key={skill.id}
                        onSelect={() => handleAddSkill(skill.name)}
                        className="cursor-pointer"
                      >
                        {skill.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              )}
              {newSkill.trim() &&
                searchResults.length === 0 &&
                !isSearching && (
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        onSelect={() => handleAddSkill(newSkill)}
                        className="cursor-pointer text-muted-foreground"
                      >
                        Add &quot;{newSkill}&quot;
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                )}
            </Command>
            {isSearching && (
              <div className="absolute right-2 top-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="text-md px-3 py-1 rounded-md bg-green-100 text-green-800 font-bold flex items-center gap-1"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-1 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
            {isSaving ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
