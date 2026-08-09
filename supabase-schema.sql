-- ============================================
-- E-kwip-T Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Categories table
create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  short_name text not null,
  blurb text,
  image text,
  created_at timestamptz default now()
);

-- Machines table
create table if not exists public.machines (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  name text not null,
  category_slug text references public.categories(slug),
  image text,
  price text not null default 'POA',
  vat text,
  year text,
  hours text,
  location text,
  make text,
  condition text[] default '{}',
  description text,
  specs jsonb default '[]'::jsonb,
  featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.categories enable row level security;
alter table public.machines enable row level security;

-- Public read policies (anyone can view)
create policy "Public can read categories" on public.categories for select using (true);
create policy "Public can read machines" on public.machines for select using (true);

-- Authenticated write policies (only logged-in users can modify)
create policy "Authenticated can insert categories" on public.categories for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update categories" on public.categories for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete categories" on public.categories for delete using (auth.role() = 'authenticated');

create policy "Authenticated can insert machines" on public.machines for insert with check (auth.role() = 'authenticated');
create policy "Authenticated can update machines" on public.machines for update using (auth.role() = 'authenticated');
create policy "Authenticated can delete machines" on public.machines for delete using (auth.role() = 'authenticated');

-- ============================================
-- Storage bucket for machine images
-- ============================================
insert into storage.buckets (id, name, public) values ('machines', 'machines', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Public can read machine images" on storage.objects for select using (bucket_id = 'machines');
create policy "Authenticated can upload machine images" on storage.objects for insert with check (bucket_id = 'machines' and auth.role() = 'authenticated');
create policy "Authenticated can delete machine images" on storage.objects for delete using (bucket_id = 'machines' and auth.role() = 'authenticated');

-- ============================================
-- Seed categories (optional)
-- ============================================
insert into public.categories (slug, name, short_name, blurb, image) values
  ('agricultural', 'Agricultural Equipment', 'Agricultural', 'Tractors, harvesters, tillage and hay equipment for the farm.', '/machines/jd-6155r-tractor.png'),
  ('forestry', 'Forestry Equipment', 'Forestry', 'Harvesters, forwarders, chippers and mulchers for plantation work.', '/machines/forestry-harvester.png'),
  ('yellow-equipment', 'Yellow Equipment', 'Yellow Equipment', 'Dozers, ADTs, excavators and loaders for earthmoving and civils.', '/machines/bell-b40e-adt.png'),
  ('mining', 'Mining Plant', 'Mining', 'Haul trucks, loaders, drill rigs and graders for the pit.', '/machines/rigid-dump-truck.png'),
  ('support', 'Support Machinery', 'Support', 'Generators, compressors, pumps and site support gear.', '/machines/diesel-generator.png')
on conflict (slug) do nothing;
