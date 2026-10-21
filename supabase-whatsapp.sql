-- ============================================
-- E-kwip-T WhatsApp posting bot
-- Run this in your Supabase SQL Editor AFTER supabase-schema.sql
-- ============================================

-- Extra photos for a listing. machines.image stays the primary/cover photo
-- so every existing page keeps working untouched.
alter table public.machines
  add column if not exists images text[] default '{}';

-- Buffers an in-progress WhatsApp submission. WhatsApp delivers each photo
-- as a separate webhook with no album grouping, so parts are collected here
-- until the sender confirms with DONE.
create table if not exists public.whatsapp_pending (
  phone text primary key,
  text_parts text[] default '{}',
  image_urls text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Service-role only. RLS on with no policies means the anon key cannot read
-- or write this table at all.
alter table public.whatsapp_pending enable row level security;
