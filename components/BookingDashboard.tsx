"use client";

import { Button } from "@/components/ui/button";
import { Booking } from "@/types/booking";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { BookingCard } from "./BookingCard";
import BookingModal from "./BookingModal";
import { DeleteModal } from "./DeleteModal";
import { Alert, AlertDescription } from "./ui/alert";

export default function BookingDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch("/api/bookings");
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      setError("Failed to load bookings. Please try again later.");
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      const response = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete booking");
      await fetchBookings();
    } catch (error) {
      setError("Failed to delete booking. Please try again later.");
      console.error("Error deleting booking:", error);
    }
  };

  const handleDeleteClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedBooking) {
      await handleDelete(selectedBooking._id);
      setIsDeleteModalOpen(false);
      setSelectedBooking(null);
    }
  };

  const handleBookingCreated = async () => {
    await fetchBookings();
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Booking Management</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Booking
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No bookings found.</p>
          <Button
            variant="link"
            onClick={() => setIsModalOpen(true)}
            className="mt-2"
          >
            Create your first booking
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onDelete={() => handleDeleteClick(booking)}
            />
          ))}
        </div>
      )}

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookingCreated={handleBookingCreated}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Booking"
        description={`Are you sure you want to delete booking #${selectedBooking?._id}? This action cannot be undone.`}
      />
    </div>
  );
}
