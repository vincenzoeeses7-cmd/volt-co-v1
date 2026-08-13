import Link from "next/link";

export default function EnergieFormulePage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/formules/electricite"
          className="inline-flex items-center text-sm text-volt-white/60 transition hover:text-volt-blue"
        >
          ← Retour
        </Link>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-volt-white">
            🔋 Énergie électrique
          </h1>

          <p className="mt-3 text-volt-white/70">
            La relation entre énergie, puissance et temps.
          </p>
        </div>

        <section className="mt-10 rounded-2xl border border-volt-orange/30 bg-volt-blue-dark p-8 text-center">
          <p className="text-sm font-medium text-volt-white/50">
            Formule principale
          </p>

          <p className="mt-4 text-4xl font-bold text-volt-orange">
            E = P × t
          </p>
        </section>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <section className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6">
            <h2 className="text-lg font-semibold text-volt-white">
              Avec :
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-volt-white/70">
              <li><strong className="text-volt-white">E</strong> = énergie en joules (J)</li>
              <li><strong className="text-volt-white">P</strong> = puissance en watts (W)</li>
              <li><strong className="text-volt-white">t</strong> = temps en secondes (s)</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6">
            <h2 className="text-lg font-semibold text-volt-white">
              Formules dérivées
            </h2>

            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-volt-blue/10 bg-background p-4 text-center">
                <p className="font-semibold text-volt-blue">P = E ÷ t</p>
              </div>

              <div className="rounded-xl border border-volt-blue/10 bg-background p-4 text-center">
                <p className="font-semibold text-volt-blue">t = E ÷ P</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}