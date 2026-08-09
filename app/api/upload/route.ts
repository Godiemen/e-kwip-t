import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`

  const supabaseAdmin = getSupabaseAdmin()
  const { error } = await supabaseAdmin.storage.from('machines').upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data } = supabaseAdmin.storage.from('machines').getPublicUrl(fileName)
  return NextResponse.json({ url: data.publicUrl })
}
