import { signup } from '@/app/(Onboarding)/register/actions'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  await signup(formData)
  return NextResponse.redirect('/')
}
