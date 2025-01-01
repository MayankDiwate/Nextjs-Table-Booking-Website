'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Booking } from '@/types/booking'

interface BookingFormProps {
  onBookingCreated: () => void
}

export default function BookingForm({ onBookingCreated }: BookingFormProps) {
  const [formData, setFormData] = useState<Omit<Booking, '_id'>>({
    date: '',
    time: '',
    guests: 1,
    name: '',
    email: '',
    phone: ''
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (formData.date) {
      fetchAvailableSlots(formData.date)
    }
  }, [formData.date])

  const fetchAvailableSlots = async (date: string) => {
    try {
      const response = await fetch(`/api/available-slots?date=${date}`)
      if (!response.ok) throw new Error('Failed to fetch available slots')
      const data = await response.json()
      setAvailableSlots(data.availableSlots)
    } catch (error) {
      console.error('Error fetching available slots:', error)
      setAvailableSlots([])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }))
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.date) errors.date = 'Date is required'
    if (!formData.time) errors.time = 'Time is required'
    if (!formData.guests) errors.guests = 'Number of guests is required'
    if (!formData.name) errors.name = 'Name is required'
    if (!formData.email) errors.email = 'Email is required'
    if (!formData.phone) errors.phone = 'Phone number is required'
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create booking')
      }
      onBookingCreated()
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'An error occurred' })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="date">Date</Label>
        <Input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
        {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
      </div>
      {formData.date && (
        <div>
          <Label>Time</Label>
          <div className="grid grid-cols-6 gap-2 mt-2 h-36 overflow-auto">
            {availableSlots.map((slot) => (
              <Button
                key={slot}
                type="button"
                onClick={() => handleTimeSelect(slot)}
                variant={formData.time === slot ? "default" : "outline"}
              >
                {slot}
              </Button>
            ))}
          </div>
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
        </div>
      )}
      <div>
        <Label htmlFor="guests">Number of Guests</Label>
        <Input type="number" id="guests" name="guests" value={formData.guests} onChange={handleChange} min="1" max="10" />
        {errors.guests && <p className="text-red-500 text-sm">{errors.guests}</p>}
      </div>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
      <Button type="submit" className="w-full">Book Table</Button>
      {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
    </form>
  )
}

