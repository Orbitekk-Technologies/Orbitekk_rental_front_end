export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="h-16 border-b border-[color:var(--border)] flex items-center px-6 bg-black text-white">
        <div className="font-semibold">ProNest</div>
        <nav className="ml-auto flex gap-5 text-sm text-white/70">
          <a href="/dashboard" className="hover:text-white">Dashboard</a>
          <a href="/listings" className="hover:text-white">Listings</a>
          <a href="/messages" className="hover:text-white">Messages</a>
          <a href="/favourites" className="hover:text-white">Favourites</a>
        </nav>
      </header>

      <main className="px-6 py-6">{children}</main>
    </div>
  );
}
