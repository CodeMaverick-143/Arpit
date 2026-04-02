import ProjectContent from './ProjectContent';

export const runtime = 'edge';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  
  return <ProjectContent slug={slug} />;
}
