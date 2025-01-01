import React from 'react';
import { Calendar, Clock, Users, User, Mail, Phone, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking } from '@/types/booking';

interface BookingCardProps {
  booking: Booking;
  onDelete: (booking: Booking) => void;
}

export function BookingCard({ booking, onDelete }: BookingCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-semibold">
            Booking #{booking._id}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(booking)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>{new Date(booking.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="h-4 w-4" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="h-4 w-4" />
            <span>{booking.guests} guests</span>
          </div>
        </div>
        <div className="pt-2 border-t space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <User className="h-4 w-4" />
            <span>{booking.name}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <span>{booking.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <span>{booking.phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}