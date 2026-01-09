import { notFound } from 'next/navigation'
import { getProductBySlug, getProductSlugs } from '@/lib/api'
import ArClientPage from '@/components/ar/ArClientPage'

export async function generateStaticParams() {
  const slugs = await getProductSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function ArPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug)

  if (!product) {
    notFound()
  }

  return <ArClientPage product={product} />
}
