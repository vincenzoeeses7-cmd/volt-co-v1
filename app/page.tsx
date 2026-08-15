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

        <section className="mt-16 grid gap-6 sm:grid-cols-2">
          <Link
            href="/calculer"
            className="group rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-8 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <div className="text-3xl">🧮</div>

            <h2 className="mt-5 text-2xl font-semibold text-volt-white">
              Calculatrice
            </h2>

            <p className="mt-3 text-volt-white/70">
              Calculer rapidement, simplement et sans prise de tête.
            </p>

            <span className="mt-6 inline-block text-volt-blue transition group-hover:text-volt-orange">
              Calculer →
            </span>
          </Link>

          <Link
            href="/outils"
            className="group rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-8 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <div className="text-3xl">🧰</div>

            <h2 className="mt-5 text-2xl font-semibold text-volt-white">
              Outils
            </h2>

            <p className="mt-3 text-volt-white/70">
              Des outils pratiques pour le terrain et le quotidien.
            </p>

            <span className="mt-6 inline-block text-volt-blue transition group-hover:text-volt-orange">
              Ouvrir →
            </span>
          </Link>

          <Link
            href="/formules"
            className="group rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-8 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <div className="text-3xl">📚</div>

            <h2 className="mt-5 text-2xl font-semibold text-volt-white">
              Bibliothèque
            </h2>

            <p className="mt-3 text-volt-white/70">
              Retrouver les principales grandeurs et formules électriques.
            </p>

            <span className="mt-6 inline-block text-volt-blue transition group-hover:text-volt-orange">
              Explorer →
            </span>
          </Link>

          <Link
            href="/convertir"
            className="group rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-8 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <div className="text-3xl">🔄</div>

            <h2 className="mt-5 text-2xl font-semibold text-volt-white">
              Convertir
            </h2>

            <p className="mt-3 text-volt-white/70">
              Convertir rapidement les unités électriques.
            </p>

            <span className="mt-6 inline-block text-volt-blue transition group-hover:text-volt-orange">
              Convertir →
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}