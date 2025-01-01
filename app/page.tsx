import BookingDashboard from '@/components/BookingDashboard'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Restaurant Booking Dashboard</h1>
      <BookingDashboard />
    </main>
  )
}
