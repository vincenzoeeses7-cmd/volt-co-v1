import Link from "next/link";

export default function OutilsPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-volt-white/60 transition hover:text-volt-blue"
        >
          ← Retour
        </Link>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-volt-white">
            🧰 Outils
          </h1>

          <p className="mt-3 text-volt-white/70">
            Des outils pratiques pour le terrain et le quotidien.
          </p>
        </div>

        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link
            href="/outils/lampe"
            className="group rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <div className="text-3xl">🔦</div>

            <h2 className="mt-4 text-2xl font-semibold text-volt-white">
              Lampe
            </h2>

            <p className="mt-2 text-sm text-volt-white/60">
              Un éclairage rapide quand tu en as besoin.
            </p>

            <span className="mt-5 inline-block text-sm text-volt-blue transition group-hover:text-volt-orange">
              Ouvrir →
            </span>
          </Link>

          <Link
            href="/outils/chantier"
            className="group rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <div className="text-3xl">🏗️</div>

            <h2 className="mt-4 text-2xl font-semibold text-volt-white">
              Mode chantier
            </h2>

            <p className="mt-2 text-sm text-volt-white/60">
              Les fonctions essentielles sur chantier.
            </p>

            <span className="mt-5 inline-block text-sm text-volt-blue transition group-hover:text-volt-orange">
              Ouvrir →
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}