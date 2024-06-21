"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toast} from "sonner";

interface EmailFormProps {
  url: string;
}

export default function EmailForm({ url }: EmailFormProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<string>("");

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddEmail = () => {
    const newEmails = inputValue.split(",").map((email) => email.trim());
    const validEmails = newEmails.filter(isValidEmail);
    const invalidEmails = newEmails.filter((email) => !isValidEmail(email));

    setEmails([...emails, ...validEmails]);
    setInputValue("");
    
    invalidEmails.forEach((email) => {
      toast.error(`Invalid email: ${email}`);
    });
  };

  const handleRemoveEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email));
  };

  const isValidEmail = (email: string) => {
    return /^([A-Z0-9a-z._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z]{2,63})+)@(?![-])([a-zA-Z]{2,63})(?:\.[a-zA-Z]{2,63})+$/.test(email); // updated regex to verify approved domains
  };

  const handleSendEmails = async () => {
    setStatus("Sending...");

    try {
      const response = await fetch("/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: emails,
          text: `Here is the link for you: ${url}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("Emails sent successfully!");
        console.log("Response from API:", result);
      } else {
        setStatus(`Failed to send emails: ${result.error}`);
      }
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
    handleRemoveEmail(emails[0]);
    setInputValue("");
    setStatus("");
  };

  return (
    <div className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-md">Add Email Addresses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                placeholder="Enter email address"
                value={inputValue}
                onChange={handleEmailInput}
                className="px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 max-h-32"
              />
              <div className="flex flex-wrap items-center gap-2 overflow-y-scroll max-h-24">
                {emails.map((email) => (
                  <div
                    key={email}
                    className={`flex items-center gap-2 rounded-full p-0.5 fs-sm font-medium ${
                      isValidEmail(email)
                        ? "bg-gray-100 dark:bg-gray-800 text-green-500"
                        : "bg-red-100 dark:bg-red-900 text-red-500"
                    }`}
                  >
                    <span>{isValidEmail(email) ? <CheckIcon /> : <XIcon />}</span>
                    <span>{email}</span>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      onClick={() => handleRemoveEmail(email)}
                    >
                      <XIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="sm" onClick={handleAddEmail}>
                Add Email
              </Button>
              <Button size="sm" onClick={handleSendEmails} className="ml-2" variant="secondary">
                Send Emails
              </Button>
            </div>
          </div>
        </CardContent>
      {status && <p>{status}</p>}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
