import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type React from "react";
interface AlertProps {
  id: string;
  buttonText: string;
  question: string;
  description: string;
  button1: string;
  button2: string;
  onAction: (id: string) => void;
}

export const AlertBox: React.FC<AlertProps> = ({ id, buttonText, question, description, button1, button2, onAction }) => {
  const handleAction = () => {
    onAction(id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 text-white">{buttonText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{question}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{button1}</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>{button2}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
