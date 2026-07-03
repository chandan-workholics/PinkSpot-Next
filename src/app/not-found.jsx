import Link from "next/link";

export default function NotFound() {
  return (
    <main className="pink-system-page">
      <section>
        <h1>Page not found</h1>
        <p>The page you are looking for is unavailable or has moved.</p>
        <Link href="/">Back to homepage</Link>
      </section>
    </main>
  );
}
