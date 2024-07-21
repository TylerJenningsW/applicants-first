import { NextRequest } from 'next/server';
import { getServerClient } from '../../../../utils/supabase/supabaseClient';
import { redirect } from 'next/navigation';
import { EmailOtpType } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    const supabase = getServerClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token: token_hash,
    });

    console.log('Verification Data:', data);
    console.log('Verification Error:', error);

    if (!error) {
      // redirect user to specified redirect URL or root of app
      return redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  return redirect('/error');
}
