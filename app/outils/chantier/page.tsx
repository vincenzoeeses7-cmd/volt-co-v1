import Link from "next/link";

export default function ChantierPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/outils"
          className="inline-flex items-center text-sm font-medium text-volt-white/60 transition hover:text-volt-white"
        >
          ← Mode normal
        </Link>

        <div className="mt-8 text-center sm:mt-10">
          <div className="text-5xl">🚧</div>

          <h1 className="mt-4 text-3xl font-bold text-volt-white sm:text-4xl">
            Mode chantier
          </h1>

          <p className="mt-3 text-sm text-volt-white/50">
            L&apos;essentiel, rapidement.
          </p>
        </div>

        <section className="mt-10 grid gap-4">
          {/* LAMPE */}
          <Link
            href="/outils/lampe"
            className="flex min-h-28 items-center rounded-3xl border border-volt-blue/20 bg-volt-blue-dark px-6 py-6 transition active:scale-[0.98] hover:border-volt-blue/60 sm:min-h-32 sm:px-8"
          >
            <div className="text-4xl sm:text-5xl">🔦</div>

            <div className="ml-5">
              <h2 className="text-2xl font-bold text-volt-white">
                Lampe
              </h2>

              <p className="mt-1 text-sm text-volt-white/50">
                Éclairage rapide
              </p>
            </div>

            <span className="ml-auto text-2xl text-volt-white/30">
              →
            </span>
          </Link>

          {/* CALCULATRICE */}
          <Link
            href="/calculer?chantier=true"
            className="flex min-h-28 items-center rounded-3xl border border-volt-blue/20 bg-volt-blue-dark px-6 py-6 transition active:scale-[0.98] hover:border-volt-blue/60 sm:min-h-32 sm:px-8"
          >
            <div className="text-4xl sm:text-5xl">🧮</div>

            <div className="ml-5">
              <h2 className="text-2xl font-bold text-volt-white">
                Calculatrice
              </h2>

              <p className="mt-1 text-sm text-volt-white/50">
                Calculs rapides
              </p>
            </div>

            <span className="ml-auto text-2xl text-volt-white/30">
              →
            </span>
          </Link>

          {/* CONVERTIR */}
          <Link
            href="/convertir?chantier=true"
            className="flex min-h-28 items-center rounded-3xl border border-volt-blue/20 bg-volt-blue-dark px-6 py-6 transition active:scale-[0.98] hover:border-volt-blue/60 sm:min-h-32 sm:px-8"
          >
            <div className="text-4xl sm:text-5xl">🔄</div>

            <div className="ml-5">
              <h2 className="text-2xl font-bold text-volt-white">
                Convertir
              </h2>

              <p className="mt-1 text-sm text-volt-white/50">
                Convertir rapidement
              </p>
            </div>

            <span className="ml-auto text-2xl text-volt-white/30">
              →
            </span>
          </Link>
        </section>
      </div>
    </main>
  );
}