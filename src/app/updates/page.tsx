import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const revalidate = 60

export default async function UpdatesPage() {
  const { data: posts, error } = await supabase
    .from('newsletters')
    .select('id, title, content, published_at, cover_image_url')
    .order('published_at', { ascending: false })

  if (error) {
    console.error(error)
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <header className="space-y-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:underline"
        >
          ← Kembali
        </Link>

        <h1 className="text-2xl font-bold">
          Illustria Updates
        </h1>

        <p className="text-sm text-gray-600">
          Pengumuman dan informasi terbaru untuk warga Illustria.
        </p>
      </header>

      {/* Masonry Grid */}
      <section className="columns-1 sm:columns-2 gap-4 space-y-4">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/updates/${post.id}`}
              className="block break-inside-avoid rounded-xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Cover Image */}
              <div className="relative aspect-[2/1] bg-gray-100">
                {post.cover_image_url ? (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-gray-900 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-gray-500">
                  {post.published_at
                    ? new Date(post.published_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : ''}
                </p>

                <p className="text-sm text-gray-700 line-clamp-3">
                  {post.content}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">
            Belum ada update.
          </p>
        )}
      </section>
    </main>
  )
}
