# INDC Snippets — Personal Code Library

A full-stack personal code snippet library built with **Next.js 14 App Router**, **Tailwind CSS**, **Prisma ORM**, **PostgreSQL (Supabase)**, and **NextAuth.js**. Dark mode, syntax highlighting, real-time search, and a secured Admin Dashboard for CRUD operations.

## ✨ Features

- 🌑 **Dark mode UI** — zinc-950 base with cyan accent, grid background, subtle glow effects
- 🔍 **Real-time search & filtering** — client-side search by title, description, code, language, and category
- 📋 **Copy to clipboard** — one-click code copying on every snippet card
- 🎨 **Syntax highlighting** — via `react-syntax-highlighter` with One Dark theme
- 🔐 **Admin authentication** — secured `/admin/dashboard` with NextAuth.js credentials
- ✏️ **Full CRUD** — create, read, update, delete snippets via Admin Dashboard
- ⚡ **Server Actions** — type-safe mutations with Next.js 14 Server Actions
- 🚀 **Vercel-ready** — optimized for deployment on Vercel + Supabase

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Public homepage (Server Component)
│   ├── layout.tsx                  # Root layout + fonts
│   ├── globals.css                 # Global styles + Tailwind
│   ├── loading.tsx                 # Loading skeletons
│   ├── not-found.tsx               # 404 page
│   ├── api/
│   │   ├── auth/[...nextauth]/     # NextAuth handler
│   │   └── snippets/              # REST API routes
│   └── admin/
│       ├── layout.tsx              # Protected admin layout
│       ├── page.tsx                # Redirects to /admin/dashboard
│       ├── login/page.tsx          # Login form
│       └── dashboard/page.tsx      # Admin dashboard
├── components/
│   ├── ui/
│   │   └── SessionProvider.tsx     # NextAuth SessionProvider wrapper
│   ├── public/
│   │   ├── Navbar.tsx              # Public site header
│   │   ├── SnippetCard.tsx         # Snippet card with syntax + copy
│   │   ├── SnippetGrid.tsx         # Grid layout with filter state
│   │   └── SearchAndFilter.tsx     # Search bar + category/language tags
│   └── admin/
│       ├── AdminHeader.tsx         # Admin nav with sign out
│       ├── SnippetForm.tsx         # Create/Edit form
│       └── SnippetTable.tsx        # Dashboard table with actions
├── lib/
│   ├── prisma.ts                   # Prisma client singleton
│   ├── auth.ts                     # NextAuth config
│   └── actions.ts                  # Server Actions (CRUD)
├── types/
│   └── index.ts                    # TypeScript types + constants
└── middleware.ts                   # Route protection
prisma/
├── schema.prisma                   # Database schema
└── seed.ts                         # Seed admin + sample snippets
```

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/your-username/indc-snippets.git
cd indc-snippets
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXTAUTH_SECRET="your-secret-here"          # openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@indc.dev"
ADMIN_PASSWORD="your-password-here"
```

### 3. Set Up Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to Supabase (development)
npm run db:push

# Seed admin user + sample snippets
npm run db:seed
```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` for the public site.  
Visit `http://localhost:3000/admin/login` to access the admin panel.

---

## 🗃️ Database Schema

```prisma
model Snippet {
  id          String   @id @default(cuid())
  title       String
  description String?
  code        String   @db.Text
  language    String
  category    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model AdminUser {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## ☁️ Deploying to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set to your production URL)
4. The `vercel.json` build command runs `prisma generate && next build` automatically

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL via Supabase |
| ORM | Prisma |
| Auth | NextAuth.js v4 (Credentials) |
| Syntax | react-syntax-highlighter |
| Icons | lucide-react |
| Hosting | Vercel |

---

## 📡 API Routes

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/snippets` | Public | Get all snippets (supports `?q=`, `?category=`, `?language=`) |
| GET | `/api/snippets/[id]` | Public | Get single snippet |
| PUT | `/api/snippets/[id]` | Admin | Update a snippet |
| DELETE | `/api/snippets/[id]` | Admin | Delete a snippet |

Server Actions (used internally in forms):
- `getAllSnippets()` — public
- `getSnippetById(id)` — public
- `createSnippet(input)` — admin only
- `updateSnippet(id, input)` — admin only
- `deleteSnippet(id)` — admin only
