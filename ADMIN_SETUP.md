# Admin Setup Instructions

## Summary of Changes

I've updated the admin authentication system to use database credentials instead of hardcoded passwords.

### What Changed:
1. ✅ Added `admins` table to database schema
2. ✅ Updated `AdminLogin` component to accept username & password
3. ✅ Updated login action to verify credentials from database
4. ✅ Implemented JWT token-based authentication
5. ✅ Generated migration file `0001_add_admins.sql`

## Setup Steps

### Step 1: Apply Database Migrations

Run this SQL in your Neon dashboard SQL Editor. This creates all three tables the app expects:

```sql
CREATE TABLE IF NOT EXISTS "inquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"email" text,
	"message" text NOT NULL,
	"status" text DEFAULT 'pending',
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "reports" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_name" text NOT NULL,
	"age" integer,
	"sex" text,
	"residence" text,
	"reporting_date" text,
	"next_of_kin" text,
	"presenting_history" text,
	"assessment_findings" text,
	"intervention" text,
	"review" text,
	"created_by" text,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "admins_username_unique" UNIQUE("username"),
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
```

### Step 2: Add Initial Admin User

After the tables are created, run this SQL to insert the admin user. The password is `neuroflex2026`.

```sql
INSERT INTO "admins" ("username", "password", "email") 
VALUES ('admin', '$2a$10$GdwFwABXEGqVXAJGawVtXOVp8LmS8bMVJ8HBBDKzG9jFhYNLXL.kW', 'admin@neuroflexkenya.com')
ON CONFLICT ("username") DO NOTHING;
```

### Step 3: Test Login

Once the admin user is created, you can login at `/admin` with:
- **Username:** `admin`
- **Password:** `neuroflex2026`

## Admin Credentials

- **Username:** admin
- **Password:** neuroflex2026
- **Email:** admin@neuroflexkenya.com

## No Signup Flow

✅ As designed, there is NO signup functionality for admins. Only pre-created admin accounts can login.

## Security Notes

- Passwords are bcrypt hashed
- JWT tokens expire in 7 days
- Only database-created admins can access the admin panel
