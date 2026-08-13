import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <section className="text-center">
          <div className="mb-5 text-4xl">⚡</div>

          <h1 className="text-5xl font-bold tracking-tight text-volt-white sm:text-6xl">
            VOLT & CO.
          </h1>

          <p className="mt-4 text-lg text-volt-white/70">
            Ton outil électrique personnel.
          </p>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          <Link
            href="/calculer"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-8 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <div className="text-3xl">🧮</div>

            <h2 className="mt-5 text-2xl font-semibold text-volt-white">
              Calculer
            </h2>

            <p className="mt-3 text-volt-white/70">
              Effectuer des calculs électriques.
            </p>

            <span className="mt-6 inline-block text-volt-blue">
              Ouvrir →
            </span>
          </Link>

          <Link
            href="/formules"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-8 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <div className="text-3xl">🧠</div>

            <h2 className="mt-5 text-2xl font-semibold text-volt-white">
              Formules
            </h2>

            <p className="mt-3 text-volt-white/70">
              Retrouver les principales formules électriques.
            </p>

            <span className="mt-6 inline-block text-volt-blue">
              Explorer →
            </span>
          </Link>

          <Link
            href="/convertir"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-8 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <div className="text-3xl">🔄</div>

            <h2 className="mt-5 text-2xl font-semibold text-volt-white">
              Convertir
            </h2>

            <p className="mt-3 text-volt-white/70">
              Convertir les unités électriques.
            </p>

            <span className="mt-6 inline-block text-volt-blue">
              Convertir →
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}