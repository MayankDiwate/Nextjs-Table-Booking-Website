import clientPromise from "@/lib/mongodb";
import { generateTimeSlots } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { error: "Date parameter is required" },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db("restaurant-bookings");
    const bookings = await db
      .collection("bookings")
      .find({ date: date })
      .toArray();

    const bookedSlots = bookings.map((booking) => booking.time);
    const timeSlots = generateTimeSlots();
    const availableSlots = timeSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    return NextResponse.json({ availableSlots });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch available slots" },
      { status: 500 }
    );
  }
}
