import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export const revalidate = 60 // ISR: refresh every 60 seconds

export default async function DashboardPage() {
  const { data: posts, error } = await supabase
  .from('newsletters')
  .select('id, title, content, published_at, cover_image_url')
  .order('published_at', { ascending: false })
  .limit(5)


  console.log('NEWSLETTERS:', posts)

  if (error) {
    console.error(error)
  }

  return (
    <main className="min-h-screen flex flex-col pb-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Selamat Datang di Portal Warga Illustria
          </h1>

          <p className="text-white/90 max-w-xl mb-8">
            Pusat informasi resmi warga Illustria.  
            Pantau pengumuman, laporan iuran, dan update terbaru komunitas.
          </p>

          {/* Shortcut Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/laporan/iuran-2026"
              className="inline-flex items-center justify-center rounded-lg bg-white text-emerald-700 px-6 py-3 font-medium shadow hover:bg-emerald-50 transition"
            >
              📄 Laporan Iuran 2026
            </a>

            <a
              href="/laporan/thr-2026"
              className="inline-flex items-center justify-center rounded-lg bg-white text-emerald-700 px-6 py-3 font-medium shadow hover:bg-emerald-50 transition"
            >
              🎁 Laporan THR 2026
            </a>

            <a
              href="/laporan/penggunaan-anggaran"
              className="inline-flex items-center justify-center rounded-lg bg-white text-emerald-700 px-6 py-3 font-medium shadow hover:bg-emerald-50 transition"
            >
              💸 Laporan Anggaran 
            </a>
          </div>
        </div>
      </section>

      {/* Bulletin Board */}
      <section className="max-w-5xl mx-auto w-full px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            📢 Pengumuman Terbaru
          </h2>
          <Link
            href="/updates"
            className="text-sm text-emerald-600 hover:underline"
          >
            Lihat semua
          </Link>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 gap-4 space-y-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/updates/${post.id}`}
                className="block break-inside-avoid rounded-xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-gray-100">
                  {post.cover_image_url ? (
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </div>


                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 leading-snug mb-1">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-500 mb-2">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : ''}
                  </p>

                  <p className="text-sm text-gray-700 line-clamp-3">
                    {post.content?.slice(0, 100)}…
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">
              Belum ada pengumuman.
            </p>
          )}
        </div>
      </section>


      {/* Floating Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-50">
        <nav className="max-w-5xl mx-auto mb-4 px-4">
          <div className="flex justify-around items-center rounded-2xl bg-white shadow-lg border py-3 text-sm">
            <a href="/" className="text-emerald-600 font-medium">
              Home
            </a>
            <a
              href="/updates"
              className="text-gray-600 hover:text-emerald-600"
            >
              Updates
            </a>
            <a
              href="/laporan/iuran-2026"
              className="text-gray-600 hover:text-emerald-600"
            >
              Iuran 2026
            </a>
            <a
              href="/laporan/thr-2026"
              className="text-gray-600 hover:text-emerald-600"
            >
              THR 2026
            </a>
            <a
              href="/laporan/about"
              className="text-gray-600 hover:text-emerald-600"
            >
              About
            </a>
          </div>
        </nav>
      </footer>

    </main>
  )
}
