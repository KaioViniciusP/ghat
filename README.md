
# Ghat

Ghat is a chat-style social app built with React, Vite, Tailwind, and Supabase. It includes a landing screen, auth flows, chats, status, settings, profile editing, and a glassmorphism UI.

## Features

- Login, register, and forgot-password screens
- Chats, groups, status, and settings flows
- Supabase-backed messaging and status uploads
- Glass UI across the authenticated experience
- Persistent user name, email, and language settings

## Tech Stack

- React + Vite
- Tailwind CSS
- Radix UI
- Motion
- Supabase

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

## Environment

Create a `.env` file from `.env.example` and set your Supabase values:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Notes

- The project uses `src/app` for the main screens and shared UI.
- The authenticated area is rendered after login or register.
  