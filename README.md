# 🍽️ Restaurant Table Booking System

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

A modern, responsive restaurant table booking system built with Next.js, MongoDB, and TypeScript. This application allows restaurant owners to manage table reservations efficiently and provides a seamless booking experience for customers.

## ✨ Features

- 📅 User-friendly booking form with date and time selection
- 👥 Support for specifying the number of guests
- 🔒 Prevents double bookings for the same time slot
- 📱 Responsive design for both desktop and mobile devices
- 🗑️ Easy deletion of existing bookings
- 🖥️ Admin dashboard to view and manage all bookings

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB Atlas account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/restaurant-booking-system.git
   cd restaurant-booking-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🏗️ Project Structure

```
restaurant-booking-system/
├── app/
│   ├── api/
│   │   └── bookings/
│   │       ├── [id]/
│   │       │   └── route.ts
│   │       └── route.ts
│   └── page.tsx
├── components/
│   ├── BookingCard.tsx
│   ├── BookingDashboard.tsx
│   ├── BookingForm.tsx
│   └── BookingModal.tsx
├── lib/
│   └── mongodb.ts
├── types/
│   ├── booking.ts
│   └── environment.d.ts
├── .env.local
├── next.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## 🛠️ Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building the user interface
- [MongoDB](https://www.mongodb.com/) - Database for storing booking information
- [TypeScript](https://www.typescriptlang.org/) - For type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - For styling the application
- [shadcn/ui](https://ui.shadcn.com/) - For pre-built UI components

## 📚 API Routes

- `GET /api/bookings`: Fetch all bookings
- `POST /api/bookings`: Create a new booking
- `DELETE /api/bookings/[id]`: Delete a specific booking

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Node.js Driver](https://mongodb.github.io/node-mongodb-native/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

---

Made with ❤️ by [Mayank Diwate](https://github.com/MayankDiwate)
