# 🎬 StudioSpace — Studio & Workspace Booking Platform

**StudioSpace** is a modern, full-stack web application designed for seamlessly browsing, reserving, and managing production studios and creative workspaces.

🌐 **Live Site URL:** https://studio-space-project.vercel.app/
*(Note: Replace the URL above with your actual Vercel client deployment link)*

---

## ✨ Key Features

- **Double-Booking Prevention:** Backend checks time slot availability against existing `Confirmed` and `Pending` reservations using MongoDB time-overlap logic.
- **Smart Authentication & Protected Routes:** Custom auth proxy middleware protects pages like `/my-bookings` and `/my-listings`, maintaining intended navigation via `callbackUrl` redirects.
- **Interactive Booking System:** Dynamic hours and total price calculation modal with smooth UI feedback and conflict handling.
- **Reservation Management:** Dedicated "My Bookings" page displaying status badges (`Pending`, `Confirmed`, `Completed`, `Cancelled`) with instant cancellation options for pending slots.
- **Responsive & Dark-Mode Ready Design:** Crafted with Next.js App Router, Tailwind CSS, and Shadcn UI/DaisyUI components for a polished cross-device experience.

---

## 🛠️ Tech Stack

### Front-End:
- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS, Shadcn UI / Lucide React
- **Auth Client:** Better Auth
- **Notifications:** Sonner Toast

### Back-End & Database:
- **Runtime:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Hosting & Deployment:** Vercel

---

## 🔑 Examiner / Demo Test Credentials

To evaluate protected features (booking, managing reservations, viewing user listings), please use the following credentials:

- **Email:** `testuser@example.com`
- **Password:** `12345678`

*(Or choose **"Continue with Google"** on the Sign-In page)*

---

## 🚀 Local Setup & Installation Instructions

Follow these steps to run the client project locally on your machine:

### Prerequisites:
- **Node.js:** v18.0.0 or higher
- **npm** 

### 1. Clone the repository:
```bash
git clone [https://github.com/arifulislam7979/Studio-space-client.git](https://github.com/arifulislam7979/Studio-space-client.git)
cd Studio-space-client
