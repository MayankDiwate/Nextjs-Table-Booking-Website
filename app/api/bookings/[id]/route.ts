import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("restaurant-bookings")
    const result = await db.collection("bookings").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Booking deleted successfully' })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 })
  }
}

