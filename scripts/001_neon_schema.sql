-- =====================================================
-- St Edwards Parish, Amawbia — Neon PostgreSQL Schema
-- Run this once in your Neon SQL Editor
-- =====================================================

-- Users table (replaces Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Password reset tokens
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Member registrations
CREATE TABLE IF NOT EXISTS member_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  nationality TEXT,
  state TEXT,
  local_government TEXT,
  town TEXT,
  age INTEGER,
  marital_status TEXT,
  employment_status TEXT,
  contact TEXT,
  email TEXT,
  birthday DATE,
  zone INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wedding registrations
CREATE TABLE IF NOT EXISTS wedding_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  groom_full_name TEXT NOT NULL,
  groom_nationality TEXT,
  groom_state TEXT,
  groom_local_government TEXT,
  groom_town TEXT,
  groom_age INTEGER,
  groom_contact TEXT,
  groom_email TEXT,
  groom_employment_status TEXT,
  groom_married_before BOOLEAN DEFAULT FALSE,
  groom_parents_name TEXT,
  groom_home_parish TEXT,
  bride_full_name TEXT NOT NULL,
  bride_nationality TEXT,
  bride_state TEXT,
  bride_local_government TEXT,
  bride_town TEXT,
  bride_age INTEGER,
  bride_contact TEXT,
  bride_email TEXT,
  bride_employment_status TEXT,
  bride_married_before BOOLEAN DEFAULT FALSE,
  bride_parents_name TEXT,
  bride_home_parish TEXT,
  wedding_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Baptism registrations
CREATE TABLE IF NOT EXISTS baptism_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  child_name TEXT NOT NULL,
  child_age INTEGER,
  name_to_be_given TEXT NOT NULL,
  parent_names TEXT NOT NULL,
  sponsor_name TEXT NOT NULL,
  contact TEXT,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Marriage certificate requests
CREATE TABLE IF NOT EXISTS marriage_certificate_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  groom_full_name TEXT NOT NULL,
  bride_full_name TEXT NOT NULL,
  wedding_date DATE,
  certificate_type TEXT NOT NULL,
  copies_needed INTEGER DEFAULT 1,
  contact TEXT,
  email TEXT,
  status TEXT DEFAULT 'pending',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments (tithes & donations via Stripe)
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  amount NUMERIC(10, 2) NOT NULL,
  payment_type TEXT NOT NULL,
  stripe_payment_id TEXT,
  status TEXT DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Marriage course enrollments
CREATE TABLE IF NOT EXISTS marriage_course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  groom_email TEXT NOT NULL,
  bride_email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- Make yourself an admin (run after creating account):
-- UPDATE users SET is_admin = TRUE WHERE email = 'your@email.com';
-- =====================================================
