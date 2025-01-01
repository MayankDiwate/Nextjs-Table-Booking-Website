import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("restaurant-bookings");
    const bookings = await db.collection("bookings").find({}).toArray();
    return NextResponse.json(bookings);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("restaurant-bookings");
    const body = await request.json();

    const existingBooking = await db.collection("bookings").findOne({
      date: body.date,
      time: body.time,
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: "This time slot is already booked" },
        { status: 400 }
      );
    }

    const result = await db.collection("bookings").insertOne(body);
    return NextResponse.json({ id: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
