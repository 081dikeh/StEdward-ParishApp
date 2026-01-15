-- Profiles RLS Policies
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);
CREATE POLICY "profiles_admin_select" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- Member Registrations RLS Policies
CREATE POLICY "member_select_own" ON public.member_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "member_insert_own" ON public.member_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "member_update_own" ON public.member_registrations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "member_delete_own" ON public.member_registrations FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "member_admin_all" ON public.member_registrations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- Wedding Registrations RLS Policies
CREATE POLICY "wedding_select_own" ON public.wedding_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "wedding_insert_own" ON public.wedding_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "wedding_update_own" ON public.wedding_registrations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "wedding_delete_own" ON public.wedding_registrations FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "wedding_admin_all" ON public.wedding_registrations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- Baptism Registrations RLS Policies
CREATE POLICY "baptism_select_own" ON public.baptism_registrations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "baptism_insert_own" ON public.baptism_registrations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "baptism_update_own" ON public.baptism_registrations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "baptism_delete_own" ON public.baptism_registrations FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "baptism_admin_all" ON public.baptism_registrations FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- Marriage Certificate Requests RLS Policies
CREATE POLICY "cert_select_own" ON public.marriage_certificate_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "cert_insert_own" ON public.marriage_certificate_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "cert_update_own" ON public.marriage_certificate_requests FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "cert_delete_own" ON public.marriage_certificate_requests FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "cert_admin_all" ON public.marriage_certificate_requests FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- Payments RLS Policies
CREATE POLICY "payments_select_own" ON public.payments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "payments_insert_own" ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "payments_update_own" ON public.payments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "payments_admin_all" ON public.payments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
);

-- Marriage Course Enrollments RLS Policies
CREATE POLICY "course_select_own" ON public.marriage_course_enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "course_insert_own" ON public.marriage_course_enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "course_update_own" ON public.marriage_course_enrollments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "course_admin_all" ON public.marriage_course_enrollments FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE)
);
