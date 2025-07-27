import { redirect } from 'next/navigation';
import { validateAuthToken } from '@/lib/auth';
import LoginPageClient from '@/components/LoginPageClient';

export default async function LoginPage() {
  const user = await validateAuthToken();
  
  if (user) {
    redirect('/');
  }

  return <LoginPageClient />;
}
