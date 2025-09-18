import { supabase } from './supabase-client'

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  return { user: data.user, error }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { user: data.user, error }
}

export async function signOut() {
  await supabase.auth.signOut()
}