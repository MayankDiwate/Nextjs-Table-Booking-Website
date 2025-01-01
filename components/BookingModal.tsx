"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BookingForm from "./BookingForm";

export default function BookingModal({
  isOpen,
  onClose,
  onBookingCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  onBookingCreated: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Booking</DialogTitle>
        </DialogHeader>
        <BookingForm onBookingCreated={onBookingCreated} />
      </DialogContent>
    </Dialog>
  );
}
