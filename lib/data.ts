import { supabase } from './supabase'
import {
  categories as staticCategories,
  machines as staticMachines,
  type Category,
  type Machine,
  type CategorySlug,
} from './products'

type SupabaseMachine = {
  id: string
  slug: string
  name: string
  category_slug: string
  image: string
  price: string
  vat: string | null
  year: string
  hours: string
  location: string
  make: string
  condition: string[]
  description: string
  specs: { label: string; value: string }[]
  featured: boolean
}

type SupabaseCategory = {
  id: string
  slug: string
  name: string
  short_name: string
  blurb: string
  image: string
}

function mapCategory(c: SupabaseCategory): Category {
  return {
    slug: c.slug as CategorySlug,
    name: c.name,
    shortName: c.short_name,
    blurb: c.blurb,
    image: c.image,
  }
}

function mapMachine(m: SupabaseMachine): Machine {
  return {
    slug: m.slug,
    name: m.name,
    category: m.category_slug as CategorySlug,
    image: m.image,
    price: m.price,
    vat: m.vat ?? undefined,
    year: m.year,
    hours: m.hours,
    location: m.location,
    make: m.make,
    condition: m.condition ?? [],
    description: m.description,
    specs: m.specs ?? [],
    featured: m.featured,
  }
}

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return !!(url && key && url !== 'your-supabase-project-url')
}

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return staticCategories
  const { data, error } = await supabase.from('categories').select('*')
  if (error || !data || data.length === 0) return staticCategories
  return (data as SupabaseCategory[]).map(mapCategory)
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  if (!isSupabaseConfigured()) return staticCategories.find((c) => c.slug === slug)
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()
  if (!data) return staticCategories.find((c) => c.slug === slug)
  return mapCategory(data as SupabaseCategory)
}

export async function getAllMachines(): Promise<Machine[]> {
  if (!isSupabaseConfigured()) return staticMachines
  const { data, error } = await supabase
    .from('machines')
    .select('*')
    .order('created_at', { ascending: false })
  if (error || !data || data.length === 0) return staticMachines
  return (data as SupabaseMachine[]).map(mapMachine)
}

export async function getMachinesByCategory(slug: string): Promise<Machine[]> {
  if (!isSupabaseConfigured()) {
    return staticMachines.filter((m) => m.category === slug)
  }
  const { data, error } = await supabase
    .from('machines')
    .select('*')
    .eq('category_slug', slug)
    .order('created_at', { ascending: false })
  if (error || !data) {
    return staticMachines.filter((m) => m.category === slug)
  }
  return (data as SupabaseMachine[]).map(mapMachine)
}

export async function getMachineBySlug(slug: string): Promise<Machine | undefined> {
  if (!isSupabaseConfigured()) {
    return staticMachines.find((m) => m.slug === slug)
  }
  const { data } = await supabase
    .from('machines')
    .select('*')
    .eq('slug', slug)
    .single()
  if (!data) return staticMachines.find((m) => m.slug === slug)
  return mapMachine(data as SupabaseMachine)
}

export async function getFeaturedMachines(limit?: number): Promise<Machine[]> {
  if (!isSupabaseConfigured()) {
    const list = staticMachines.filter((m) => m.featured)
    return typeof limit === 'number' ? list.slice(0, limit) : list
  }
  let query = supabase
    .from('machines')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
  if (typeof limit === 'number') {
    query = query.limit(limit)
  }
  const { data, error } = await query
  if (error || !data || data.length === 0) {
    const list = staticMachines.filter((m) => m.featured)
    return typeof limit === 'number' ? list.slice(0, limit) : list
  }
  return (data as SupabaseMachine[]).map(mapMachine)
}

export async function getAllSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return staticMachines.map((m) => m.slug)
  }
  const { data } = await supabase.from('machines').select('slug')
  if (!data || data.length === 0) return staticMachines.map((m) => m.slug)
  return (data as { slug: string }[]).map((d) => d.slug)
}

export async function getAllCategorySlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return staticCategories.map((c) => c.slug)
  }
  const { data } = await supabase.from('categories').select('slug')
  if (!data || data.length === 0) return staticCategories.map((c) => c.slug)
  return (data as { slug: string }[]).map((d) => d.slug)
}
