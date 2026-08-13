import Link from "next/link";

export default function FormulesPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-volt-white/60 transition hover:text-volt-blue"
        >
          ← Retour
        </Link>

        <h1 className="mt-8 text-4xl font-bold text-volt-white">
          Bibliothèque
        </h1>

        <p className="mt-3 text-volt-white/70">
          Retrouve les grandeurs, symboles et formules de VOLT & CO.
        </p>

        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link
            href="/formules/electricite"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              ⚡ Électricité
            </h2>

            <p className="mt-2 text-volt-white/70">
              Retrouver les principales grandeurs, symboles et formules
              utilisées en électricité.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}