"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { createContactRequest } from "@/actions/contact";
import { Loader2, Send } from "lucide-react";

interface ContactFormProps {
  landId: string;
  landTitle: string;
}

export function ContactForm({ landId, landTitle }: ContactFormProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `Hi, I'm interested in "${landTitle}". Please contact me with more details.`,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const result = await createContactRequest({
        landId,
        ...formData,
      });

      if (result.success) {
        toast({
          title: "Inquiry Sent!",
          description: result.message,
          variant: "success",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="contactName">Your Name</Label>
        <Input
          id="contactName"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactEmail">Email Address</Label>
        <Input
          id="contactEmail"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactPhone">Phone Number</Label>
        <Input
          id="contactPhone"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactMessage">Message</Label>
        <Textarea
          id="contactMessage"
          placeholder="Tell the seller what you're looking for..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          disabled={isPending}
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send Inquiry
          </>
        )}
      </Button>
    </form>
  );
}
