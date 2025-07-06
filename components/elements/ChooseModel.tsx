/* eslint-disable @next/next/no-img-element */
import { AI_MODELS } from "@/azure/models";
import { useChatMessageStore } from "@/stores/chatmessages.store";
import clsx from "clsx";
import { FC, ReactNode, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface ChooseModel {
  onSuccess?: (model: string) => void;
  children: ReactNode;
  current?: string;
}
export const ChooseModel: FC<ChooseModel> = ({
  onSuccess,
  current,
  children,
}) => {
  const [open, setOpen] = useState(false);
  const currentmodel = useChatMessageStore((s) => s.chatmodel);
  const updateChatModel = useChatMessageStore((s) => s.updateChatModel);
  const modelName = useMemo(() => {
    return AI_MODELS.find((m) => m.value === currentmodel)?.name || "GPT 4.1";
  }, [currentmodel]);
  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <div className="p-4 pb-0">
          <DialogTitle>Choose your model</DialogTitle>
        </div>
        <div className="">
          <div className="py-4">
            {AI_MODELS.map((model) => {
              return (
                <div
                  key={model.name}
                  className={clsx(
                    "flex cursor-pointer items-center border-b border-primary/20 px-4 py-1 gap-6",
                    model.value === current || model.value === currentmodel
                      ? "bg-primary/20"
                      : ""
                  )}
                  style={{ opacity: model.available ? 1 : 0.5 }}
                  onClick={() => {
                    if (!model.available) {
                      return;
                    }
                    updateChatModel(model.value);
                    setOpen(false);
                    onSuccess?.(model.value);
                  }}
                >
                  <img
                    src={model.logo}
                    alt={model.name}
                    width={20}
                    height={20}
                    className="h-5 w-5"
                  />
                  <p className="font-medium">{modelName}</p>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
