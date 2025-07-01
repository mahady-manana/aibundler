"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EDUCATION_ICON_COLORS } from "@/lib/constants";
import { format } from "date-fns";
import { GraduationCap } from "lucide-react";
import { Separator } from "../ui/separator";
import { AddEducationButton } from "./buttons/AddEducationButton";
import { EditEducationButton } from "./edits/EditEducationButton";

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startedAt: string;
  endedAt?: string;
  current: boolean;
  description?: string;
}

interface EducationSectionProps {
  user: any;
  editable?: boolean;
}

export function EducationSection({ user, editable }: EducationSectionProps) {
  const educationList = user.education || [];

  if (educationList.length === 0) {
    return (
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Education</h2>
            {editable && <AddEducationButton />}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((index) => (
              <div
                key={index}
                className="border-2 border-dashed border-gray-200 rounded-lg p-4 h-32 flex items-center justify-center"
              >
                <p className="text-gray-500">Add your education</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="py-4 bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Education</h2>
          {editable && <AddEducationButton />}
        </div>
        <div className="space-y-6">
          {educationList.map((education: Education, index: number) => (
            <div key={education.id}>
              <div className="flex gap-4 md:mb-0">
                <div
                  className={`h-10 w-10 mt-2 ${
                    EDUCATION_ICON_COLORS[index % EDUCATION_ICON_COLORS.length]
                  } flex items-center justify-center font-bold text-md rounded-md`}
                >
                  <GraduationCap />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {education.school}
                      </h3>
                      <p className="text-gray-600">
                        {education.degree} in {education.field}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(education.startedAt), "MMM yyyy")} -{" "}
                        {education.current
                          ? "Present"
                          : education.endedAt
                          ? format(new Date(education.endedAt), "MMM yyyy")
                          : ""}
                      </p>
                    </div>
                    {editable && <EditEducationButton education={education} />}
                  </div>
                  {education.description && (
                    <p className="mt-2 text-gray-600">
                      {education.description}
                    </p>
                  )}
                </div>
              </div>
              {index < educationList.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
