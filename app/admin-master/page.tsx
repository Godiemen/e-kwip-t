'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'
import { categories as fallbackCategories } from '@/lib/products'
import {
  Lock,
  Mail,
  Upload,
  Plus,
  Trash2,
  Edit3,
  X,
  Save,
  Star,
  Image as ImageIcon,
  Loader2,
  LogOut,
  Search,
  Eye,
  EyeOff,
} from 'lucide-react'

type MachineRow = {
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
  featured: boolean
}

type CategoryRow = {
  id: string
  slug: string
  name: string
  short_name: string
  blurb: string
  image: string
}

export default function AdminMasterPage() {
  const [authed, setAuthed] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)

  const [machines, setMachines] = useState<MachineRow[]>([])
  const [cats, setCats] = useState<CategoryRow[]>([])
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<MachineRow | null>(null)
  const [creating, setCreating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  // ---- Auth ----
  useEffect(() => {
    const ok = sessionStorage.getItem('admin-master-ok')
    if (ok === '1') setAuthed(true)
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setAuthError(error.message)
      setLoading(false)
    } else {
      sessionStorage.setItem('admin-master-ok', '1')
      setAuthed(true)
      setLoading(false)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    sessionStorage.removeItem('admin-master-ok')
    setAuthed(false)
    setEmail('')
    setPassword('')
  }

  // ---- Fetch data ----
  const fetchData = useCallback(async () => {
    const [mRes, cRes] = await Promise.all([
      supabase.from('machines').select('*').order('created_at', { ascending: false }),
      supabase.from('categories').select('*'),
    ])
    if (mRes.data) setMachines(mRes.data as MachineRow[])
    if (cRes.data && cRes.data.length > 0) {
      setCats(cRes.data as CategoryRow[])
    } else {
      setCats(
        fallbackCategories.map((c) => ({
          id: c.slug,
          slug: c.slug,
          name: c.name,
          short_name: c.shortName,
          blurb: c.blurb,
          image: c.image,
        }))
      )
    }
  }, [])

  useEffect(() => {
    if (authed) fetchData()
  }, [authed, fetchData])

  // ---- Filter ----
  const filtered = machines.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.make?.toLowerCase().includes(search.toLowerCase()),
  )

  // ---- Upload image ----
  async function uploadImage(file: File): Promise<string | null> {
    setUploading(true)
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
    const { error } = await supabase.storage.from('machines').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })
    setUploading(false)
    if (error) {
      alert('Upload failed: ' + error.message)
      return null
    }
    const { data } = supabase.storage.from('machines').getPublicUrl(fileName)
    return data.publicUrl
  }

  // ---- Save machine ----
  async function saveMachine(m: MachineRow, isNew: boolean) {
    setLoading(true)
    setSaveMsg('')
    if (isNew) {
      const { error } = await supabase.from('machines').insert({
        slug: m.slug,
        name: m.name,
        category_slug: m.category_slug,
        image: m.image,
        price: m.price,
        vat: m.vat,
        year: m.year,
        hours: m.hours,
        location: m.location,
        make: m.make,
        condition: m.condition,
        description: m.description,
        featured: m.featured,
      })
      if (error) alert('Insert failed: ' + error.message)
      else setSaveMsg('Machine added successfully')
    } else {
      const { error } = await supabase
        .from('machines')
        .update({
          slug: m.slug,
          name: m.name,
          category_slug: m.category_slug,
          image: m.image,
          price: m.price,
          vat: m.vat,
          year: m.year,
          hours: m.hours,
          location: m.location,
          make: m.make,
          condition: m.condition,
          description: m.description,
          featured: m.featured,
          updated_at: new Date().toISOString(),
        })
        .eq('id', m.id)
      if (error) alert('Update failed: ' + error.message)
      else setSaveMsg('Machine updated successfully')
    }
    setLoading(false)
    setEditing(null)
    setCreating(false)
    fetchData()
    setTimeout(() => setSaveMsg(''), 3000)
  }

  // ---- Delete machine ----
  async function deleteMachine(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    const { error } = await supabase.from('machines').delete().eq('id', id)
    if (error) alert('Delete failed: ' + error.message)
    fetchData()
  }

  // ---- Toggle featured ----
  async function toggleFeatured(m: MachineRow) {
    const { error } = await supabase
      .from('machines')
      .update({ featured: !m.featured })
      .eq('id', m.id)
    if (error) alert('Failed: ' + error.message)
    fetchData()
  }

  // ---- Login screen ----
  if (!authed) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background image */}
        <Image
          src="/machines/construction-site-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a4d45]/90 via-[#202e12]/80 to-black/90" />

        {/* Login card */}
        <div className="relative z-10 w-full max-w-md px-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#f9f7f2]/95 shadow-2xl backdrop-blur-xl">
            {/* Header band */}
            <div className="bg-[#6b7c2a] px-8 py-6 text-center">
              <div className="mx-auto mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full ring-4 ring-white/20">
                <Image
                  src="/123690 (1).jpg"
                  alt="E-KWIP-t logo"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </div>
              <h1 className="font-display text-2xl font-bold text-[#f9f7f2]">Admin Master</h1>
              <p className="mt-1 text-sm text-[#f9f7f2]/80">E-KWIP-t Management Panel</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5 p-8">
              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#202e12]">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5c6b52]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-[#d7d4c9] bg-white py-3.5 pl-11 pr-4 text-[#202e12] outline-none transition focus:border-[#6b7c2a] focus:ring-2 focus:ring-[#6b7c2a]/30"
                    placeholder="admin@ekwipt.co.za"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#202e12]">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5c6b52]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-[#d7d4c9] bg-white py-3.5 pl-11 pr-12 text-[#202e12] outline-none transition focus:border-[#6b7c2a] focus:ring-2 focus:ring-[#6b7c2a]/30"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5c6b52] transition hover:text-[#6b7c2a]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {authError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {authError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#6b7c2a] px-4 py-3.5 font-display text-lg font-bold text-[#f9f7f2] transition hover:bg-[#5a6a22] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Sign In
                  </>
                )}
              </button>

              {/* Back to site */}
              <div className="pt-2 text-center">
                <a
                  href="/"
                  className="text-sm font-medium text-[#5c6b52] underline decoration-1 underline-offset-4 transition hover:text-[#6b7c2a]"
                >
                  Back to website
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // ---- Admin dashboard ----
  const catOptions = cats.length > 0 ? cats : fallbackCategories.map((c) => ({ slug: c.slug, name: c.name }))

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
        {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-[#d7d4c9] bg-[#6b7c2a]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-3 sm:px-4 md:px-6 md:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Image src="/123690 (1).jpg" alt="Logo" width={36} height={36} className="h-9 w-9 shrink-0 rounded-full ring-2 ring-white/20 sm:h-10 sm:w-10" />
            <div className="min-w-0">
              <h1 className="truncate font-display text-base font-bold text-[#f9f7f2] sm:text-lg">Admin Master</h1>
              <p className="hidden text-xs text-[#f9f7f2]/70 sm:block">E-KWIP-t Management</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href="/"
              className="rounded-md px-2.5 py-2 text-xs font-medium text-[#f9f7f2]/80 transition hover:text-[#f9f7f2] sm:px-3 sm:text-sm"
            >
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#f9f7f2]/10 px-2.5 py-2 text-xs font-medium text-[#f9f7f2] transition hover:bg-[#f9f7f2]/20 sm:px-3 sm:text-sm"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        {saveMsg && (
          <div className="mb-6 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
            {saveMsg}
          </div>
        )}

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard label="Total Machines" value={machines.length} />
          <StatCard label="Featured" value={machines.filter((m) => m.featured).length} />
          <StatCard label="Categories" value={catOptions.length} />
          <StatCard label="Priced (not POA)" value={machines.filter((m) => m.price !== 'POA').length} />
        </div>

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5c6b52]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search machines..."
              className="w-full rounded-lg border border-[#d7d4c9] bg-white py-2.5 pl-10 pr-4 text-sm text-[#202e12] outline-none focus:border-[#6b7c2a]"
            />
          </div>
          <button
            onClick={() => {
              setCreating(true)
              setEditing({
                id: '',
                slug: '',
                name: '',
                category_slug: catOptions[0]?.slug ?? 'yellow-equipment',
                image: '',
                price: 'POA',
                vat: 'ex VAT',
                year: '',
                hours: '',
                location: '',
                make: '',
                condition: [],
                description: '',
                featured: false,
              })
            }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#6b7c2a] px-5 py-2.5 font-display text-sm font-semibold text-[#f9f7f2] transition hover:bg-[#5a6a22] sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add Machine
          </button>
        </div>

        {/* Machine list - cards on mobile, table on desktop */}
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-[#d7d4c9] bg-white p-8 text-center text-[#5c6b52] shadow-sm sm:p-12">
            No machines found. Click "Add Machine" to create one.
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-3 sm:hidden">
              {filtered.map((m) => (
                <div key={m.id} className="rounded-xl border border-[#d7d4c9] bg-white p-3 shadow-sm">
                  <div className="flex items-start gap-3">
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name}
                        width={56}
                        height={56}
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#efede5]">
                        <ImageIcon className="h-5 w-5 text-[#5c6b52]" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-[#202e12]">{m.name}</p>
                      <p className="truncate text-xs text-[#5c6b52]">{m.make} · {m.year}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="rounded-full bg-[#efede5] px-2 py-0.5 text-xs font-semibold text-[#6b7c2a]">
                          {catOptions.find((c) => c.slug === m.category_slug)?.name ?? m.category_slug}
                        </span>
                        <span className="font-display text-sm font-bold text-[#202e12]">{m.price}</span>
                        {m.vat && <span className="text-xs text-[#5c6b52]">{m.vat}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-end gap-2 border-t border-[#d7d4c9] pt-3">
                    <button
                      onClick={() => toggleFeatured(m)}
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition ${
                        m.featured ? 'bg-yellow-100 text-yellow-600' : 'bg-[#efede5] text-[#5c6b52]'
                      }`}
                      title={m.featured ? 'Unfeature' : 'Feature'}
                    >
                      <Star className="h-4 w-4" fill={m.featured ? 'currentColor' : 'none'} />
                    </button>
                    <button
                      onClick={() => setEditing(m)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#efede5] text-[#6b7c2a] transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2]"
                      title="Edit"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteMachine(m.id, m.name)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-xl border border-[#d7d4c9] bg-white shadow-sm sm:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#d7d4c9] bg-[#efede5]">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-[#202e12]">Image</th>
                    <th className="px-4 py-3 font-semibold text-[#202e12]">Name</th>
                    <th className="px-4 py-3 font-semibold text-[#202e12]">Category</th>
                    <th className="px-4 py-3 font-semibold text-[#202e12]">Price</th>
                    <th className="px-4 py-3 font-semibold text-[#202e12]">Featured</th>
                    <th className="px-4 py-3 text-right font-semibold text-[#202e12]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d7d4c9]">
                  {filtered.map((m) => (
                    <tr key={m.id} className="transition hover:bg-[#f9f7f2]">
                      <td className="px-4 py-3">
                        {m.image ? (
                          <Image
                            src={m.image}
                            alt={m.name}
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#efede5]">
                            <ImageIcon className="h-5 w-5 text-[#5c6b52]" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#202e12]">{m.name}</p>
                        <p className="text-xs text-[#5c6b52]">{m.make} · {m.year}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-[#efede5] px-2.5 py-1 text-xs font-semibold text-[#6b7c2a]">
                          {catOptions.find((c) => c.slug === m.category_slug)?.name ?? m.category_slug}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-display font-bold text-[#202e12]">{m.price}</span>
                        {m.vat && <span className="ml-1 text-xs text-[#5c6b52]">{m.vat}</span>}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleFeatured(m)}
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition ${
                            m.featured ? 'bg-yellow-100 text-yellow-600' : 'bg-[#efede5] text-[#5c6b52]'
                          }`}
                          title={m.featured ? 'Unfeature' : 'Feature'}
                        >
                          <Star className="h-4 w-4" fill={m.featured ? 'currentColor' : 'none'} />
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditing(m)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#efede5] text-[#6b7c2a] transition hover:bg-[#6b7c2a] hover:text-[#f9f7f2]"
                            title="Edit"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteMachine(m.id, m.name)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      {/* Edit / Create modal */}
      {editing && (
        <EditModal
          machine={editing}
          isNew={creating}
          cats={catOptions}
          uploading={uploading}
          loading={loading}
          onClose={() => {
            setEditing(null)
            setCreating(false)
          }}
          onSave={saveMachine}
          onUpload={uploadImage}
        />
      )}
    </div>
  )
}

// ---- Stat card ----
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-[#d7d4c9] bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-[#5c6b52]">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-[#6b7c2a]">{value}</p>
    </div>
  )
}

// ---- Edit modal ----
function EditModal({
  machine,
  isNew,
  cats,
  uploading,
  loading,
  onClose,
  onSave,
  onUpload,
}: {
  machine: MachineRow
  isNew: boolean
  cats: { slug: string; name: string }[]
  uploading: boolean
  loading: boolean
  onClose: () => void
  onSave: (m: MachineRow, isNew: boolean) => void
  onUpload: (file: File) => Promise<string | null>
}) {
  const [form, setForm] = useState<MachineRow>(machine)
  const [conditionText, setConditionText] = useState(machine.condition.join('\n'))

  function update<K extends keyof MachineRow>(key: K, value: MachineRow[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = await onUpload(file)
    if (url) update('image', url)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const condition = conditionText.split('\n').map((s) => s.trim()).filter(Boolean)
    onSave({ ...form, condition }, isNew)
  }

  function slugify(s: string) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-3 py-6 sm:p-4 sm:py-8">
      <div className="w-full max-w-2xl rounded-2xl bg-[#f9f7f2] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#d7d4c9] px-4 py-4 sm:px-6">
          <h2 className="font-display text-xl font-bold text-[#202e12]">
            {isNew ? 'Add Machine' : 'Edit Machine'}
          </h2>
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#efede5] text-[#5c6b52] transition hover:bg-[#d7d4c9]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-h-[calc(100vh-8rem)] overflow-y-auto px-4 py-4 sm:max-h-[70vh] sm:px-6 sm:py-5">
          {/* Image upload */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-[#202e12]">Machine Image</label>
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-[#d7d4c9] bg-white">
                {form.image ? (
                  <Image src={form.image} alt="Preview" fill className="object-cover" sizes="128px" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-[#5c6b52]/40" />
                  </div>
                )}
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#d7d4c9] bg-white px-4 py-2.5 text-sm font-semibold text-[#6b7c2a] transition hover:border-[#6b7c2a]">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploading ? 'Uploading...' : 'Upload Image'}
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
              </label>
            </div>
            <input
              type="text"
              value={form.image}
              onChange={(e) => update('image', e.target.value)}
              placeholder="Or paste image URL"
              className="mt-2 w-full rounded-lg border border-[#d7d4c9] bg-white px-3 py-2 text-sm text-[#202e12] outline-none focus:border-[#6b7c2a]"
            />
          </div>

          {/* Name + slug */}
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-[#202e12]">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => {
                  update('name', e.target.value)
                  if (isNew) update('slug', slugify(e.target.value))
                }}
                className="w-full rounded-lg border border-[#d7d4c9] bg-white px-3 py-2.5 text-sm text-[#202e12] outline-none focus:border-[#6b7c2a]"
                placeholder="e.g. Komatsu D41 Dozer"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-[#202e12]">Slug</label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => update('slug', slugify(e.target.value))}
                className="w-full rounded-lg border border-[#d7d4c9] bg-white px-3 py-2.5 text-sm text-[#202e12] outline-none focus:border-[#6b7c2a]"
                placeholder="komatsu-d41-dozer"
              />
            </div>
          </div>

          {/* Category + make */}
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-[#202e12]">Category</label>
              <select
                value={form.category_slug}
                onChange={(e) => update('category_slug', e.target.value)}
                className="w-full rounded-lg border border-[#d7d4c9] bg-white px-3 py-2.5 text-sm text-[#202e12] outline-none focus:border-[#6b7c2a]"
              >
                {cats.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-[#202e12]">Make</label>
              <input
                type="text"
                value={form.make}
                onChange={(e) => update('make', e.target.value)}
                className="w-full rounded-lg border border-[#d7d4c9] bg-white px-3 py-2.5 text-sm text-[#202e12] outline-none focus:border-[#6b7c2a]"
                placeholder="e.g. Komatsu"
              />
            </div>
          </div>

          {/* Price + vat */}
          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-[#202e12]">Price</label>
              <input
                type="text"
                required
                value={form.price}
                onChange={(e) => update('price', e.target.value)}
                className="w-full rounded-lg border border-[#d7d4c9] bg-white px-3 py-2.5 text-sm text-[#202e12] outline-none focus:border-[#6b7c2a]"
                placeholder="R270 000 or POA"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-[#202e12]">VAT</label>
              <input
                type="text"
                value={form.vat ?? ''}
                onChange={(e) => update('vat', e.target.value)}
                className="w-full rounded-lg border border-[#d7d4c9] bg-white px-3 py-2.5 text-sm text-[#202e12] outline-none focus:border-[#6b7c2a]"
                placeholder="ex VAT"
              />
            </div>
          </div>

          {/* Year + hours + location */}
          <div className="mb-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-semibold text-[#202e12]">Year</label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => update('year', e.target.value)}
                className="w-full rounded-lg border border-[#d7d4c9] bg-white px-3 py-2.5 text-sm text-[#202e12] outline-none focus:border-[#6b7c2a]"
                placeholder="2020"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-[#202e12]">Hours</label>
              <input
                type="text"
                value={form.hours}
                onChange={(e) => update('hours', e.target.value)}
                className="w-full rounded-lg border border-[#d7d4c9] bg-white px-3 py-2.5 text-sm text-[#202e12] outline-none focus:border-[#6b7c2a]"
                placeholder="5000"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-[#202e12]">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => update('location', e.target.value)}
                className="w-full rounded-lg border border-[#d7d4c9] bg-white px-3 py-2.5 text-sm text-[#202e12] outline-none focus:border-[#6b7c2a]"
                placeholder="KZN"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold text-[#202e12]">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-[#d7d4c9] bg-white px-3 py-2.5 text-sm text-[#202e12] outline-none focus:border-[#6b7c2a]"
              placeholder="Machine description..."
            />
          </div>

          {/* Condition (one per line) */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-semibold text-[#202e12]">
              Condition notes (one per line)
            </label>
            <textarea
              value={conditionText}
              onChange={(e) => setConditionText(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-[#d7d4c9] bg-white px-3 py-2.5 text-sm text-[#202e12] outline-none focus:border-[#6b7c2a]"
              placeholder={'Good condition\nRunning well\nNew tyres'}
            />
          </div>

          {/* Featured toggle */}
          <div className="mb-6">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update('featured', e.target.checked)}
                className="h-5 w-5 rounded border-[#d7d4c9] text-[#6b7c2a] focus:ring-[#6b7c2a]"
              />
              <span className="text-sm font-semibold text-[#202e12]">Featured on homepage</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-[#d7d4c9] pt-4 pb-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#d7d4c9] bg-white px-5 py-2.5 text-sm font-semibold text-[#5c6b52] transition hover:bg-[#efede5]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="inline-flex items-center gap-2 rounded-lg bg-[#6b7c2a] px-6 py-2.5 font-display text-sm font-semibold text-[#f9f7f2] transition hover:bg-[#5a6a22] disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
