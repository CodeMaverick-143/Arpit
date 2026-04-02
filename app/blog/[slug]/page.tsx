import BlogContent from './BlogContent';

export const runtime = 'edge';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  return <BlogContent slug={slug} />;
}
