import Link from 'next/link'

export function Header() {
  return (
    <Link
      href={'/'}
      className="sticky pt-[72px] top-0 transition-colors duration-500 bg-white pb-9 supports-backdrop-blur:bg-white/95 backdrop-blur"
    >
      <h1 className="text-center text-5xl font-extrabold tracking-tight text-transparent scroll-m-20 lg:text-5xl bg-gradient-to-r from-[#0B3FF8] to-[#E43AA0] bg-clip-text">
        Convo AI
      </h1>
    </Link>
  )
}
