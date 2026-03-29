import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 50%, #16213E 100%)", backgroundAttachment: "fixed" }}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {children}
      </main>
    </div>
  );
}
