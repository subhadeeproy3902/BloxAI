import { useState } from "react";
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
} from "../ui/alert-dialog";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type Props = {
  dialogTitle: string;
  dialogDescription: string;
  successTitle: string;
  privateFIle: boolean;
  fileId: string;
  email: string;
};

export default function FileStatusModal({
  dialogTitle,
  dialogDescription,
  successTitle,
  privateFIle,
  fileId,
  email,
}: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Badge variant={"secondary"} className=" text-gray-200/90">
          {!privateFIle ? "Public" : "Private"}
        </Badge>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {!isSubmitted && (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {dialogDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={() => {}}>Continue</Button>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
