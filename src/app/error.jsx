"use client";

export default function Error({ error, reset }) {
  return (
    <main className="pink-system-page" role="alert">
      <section>
        <h1>Something went wrong</h1>
        <p>{error?.message || "Please try loading the page again."}</p>
        <button type="button" onClick={reset}>
          Try again
        </button>
      </section>
    </main>
  );
}
