import { redirect } from 'next/navigation';
import { validateAuthToken } from '@/lib/auth';
import ProjectDetail from '@/components/ProjectDetail';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const user = await validateAuthToken();
  
  if (!user) {
    redirect('/login');
  }

  return <ProjectDetail projectId={params.id} />;
}
