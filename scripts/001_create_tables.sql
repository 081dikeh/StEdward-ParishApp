-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create member registrations table
CREATE TABLE IF NOT EXISTS public.member_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  nationality TEXT,
  state TEXT,
  local_government TEXT,
  town TEXT,
  age INTEGER,
  marital_status TEXT,
  employment_status TEXT,
  contact TEXT NOT NULL,
  email TEXT NOT NULL,
  birthday DATE,
  zone INTEGER CHECK (zone >= 1 AND zone <= 4),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create wedding registrations table
CREATE TABLE IF NOT EXISTS public.wedding_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  groom_full_name TEXT NOT NULL,
  groom_nationality TEXT,
  groom_state TEXT,
  groom_local_government TEXT,
  groom_town TEXT,
  groom_age INTEGER,
  groom_contact TEXT NOT NULL,
  groom_email TEXT NOT NULL,
  groom_employment_status TEXT,
  groom_married_before BOOLEAN,
  groom_parents_name TEXT,
  groom_home_parish TEXT,
  bride_full_name TEXT NOT NULL,
  bride_nationality TEXT,
  bride_state TEXT,
  bride_local_government TEXT,
  bride_town TEXT,
  bride_age INTEGER,
  bride_contact TEXT NOT NULL,
  bride_email TEXT NOT NULL,
  bride_employment_status TEXT,
  bride_married_before BOOLEAN,
  bride_parents_name TEXT,
  bride_home_parish TEXT,
  wedding_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create baptism registrations table
CREATE TABLE IF NOT EXISTS public.baptism_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  child_name TEXT NOT NULL,
  child_age INTEGER,
  name_to_be_given TEXT NOT NULL,
  parent_names TEXT NOT NULL,
  sponsor_name TEXT NOT NULL,
  contact TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create marriage certificate requests table
CREATE TABLE IF NOT EXISTS public.marriage_certificate_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  groom_full_name TEXT NOT NULL,
  bride_full_name TEXT NOT NULL,
  wedding_date DATE,
  certificate_type TEXT CHECK (certificate_type IN ('church', 'government', 'both')),
  copies_needed INTEGER DEFAULT 1,
  contact TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tithe and donation payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  payment_type TEXT CHECK (payment_type IN ('tithe', 'donation')),
  payment_method TEXT,
  stripe_payment_id TEXT UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create marriage course enrollments table
CREATE TABLE IF NOT EXISTS public.marriage_course_enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  groom_email TEXT NOT NULL,
  bride_email TEXT NOT NULL,
  status TEXT DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'in-progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.baptism_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marriage_certificate_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marriage_course_enrollments ENABLE ROW LEVEL SECURITY;
