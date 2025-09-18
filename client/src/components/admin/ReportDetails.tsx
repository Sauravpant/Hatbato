import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type React from "react";

interface ReportsDetailsProps {
  reason: string;
  description: string;
}

export const ReportsDetails: React.FC<ReportsDetailsProps> = ({ reason, description }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-green-100 cursor-pointer hover:bg-green-50">
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-h-[70vh] overflow-y-auto p-4 shadow-lg">
        <div className="mt-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Reason</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">{reason}</p>
        </div>

        <div className="mt-1 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Description</h3>
          <p className="text-sm text-gray-700 whitespace-pre-line">{description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
