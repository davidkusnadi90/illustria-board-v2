import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

type PageProps = {
  params: {
    id: string
  }
}

export const revalidate = 60

export default async function PostDetailPage({ params }: PageProps) {
  const { data: post, error } = await supabase
    .from('newsletters')
    .select('id, title, content, published_at, cover_image_url')
    .eq('id', params.id)
    .single()

  if (error || !post) {
    return notFound()
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Back */}
      <Link
        href="/updates"
        className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline"
      >
        ← Kembali
      </Link>

      {/* Cover Image */}
      <section className="relative aspect-[2/1] overflow-hidden rounded-xl bg-gray-100">
        {post.cover_image_url ? (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
            No Image
          </div>
        )}
      </section>

      {/* Title & Meta */}
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold leading-tight">
          {post.title}
        </h1>

        <p className="text-sm text-gray-500">
          Dipublikasikan pada{' '}
          {post.published_at
            ? new Date(post.published_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : ''}
        </p>
      </header>

      {/* Content */}
      <article
        className="prose prose-gray max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

    </main>
  )
}
