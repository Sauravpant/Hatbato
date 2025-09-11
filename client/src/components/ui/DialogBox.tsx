import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DialogBoxProps {
  buttonText: string;
  title: string;
  description: string;
}

export const DialogBox: React.FC<DialogBoxProps> = ({ title, buttonText, description }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={buttonText !== "Buy Now" ? "destructive" : "secondary"} className="cursor-pointer">
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant={buttonText !== "Buy Now" ? "destructive" : "secondary"} className="cursor-pointer">
              {buttonText}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
