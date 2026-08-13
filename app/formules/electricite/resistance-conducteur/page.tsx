
import Link from "next/link";

export default function ResistanceConducteurFormulePage() {
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
            Résistance d&apos;un conducteur
          </h1>

          <p className="mt-3 text-volt-white/70">
            La résistance d&apos;un conducteur dépend de sa résistivité, de sa
            longueur et de sa section.
          </p>
        </div>

        <section className="mt-10 rounded-2xl border border-volt-orange/30 bg-volt-blue-dark p-6 sm:p-8">
          <p className="text-sm font-medium text-volt-white/50">
            Formule principale
          </p>

          <p className="mt-3 text-3xl font-bold text-volt-orange">
            R = ρ × L / A
          </p>

          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-volt-blue/20 bg-background p-4">
              <p className="font-semibold text-volt-white">
                R — Résistance
              </p>

              <p className="mt-1 text-sm text-volt-white/60">
                En ohms (Ω)
              </p>
            </div>

            <div className="rounded-xl border border-volt-blue/20 bg-background p-4">
              <p className="font-semibold text-volt-white">
                ρ — Résistivité
              </p>

              <p className="mt-1 text-sm text-volt-white/60">
                En ohm-mètre (Ω·m)
              </p>
            </div>

            <div className="rounded-xl border border-volt-blue/20 bg-background p-4">
              <p className="font-semibold text-volt-white">
                L — Longueur
              </p>

              <p className="mt-1 text-sm text-volt-white/60">
                En mètres (m)
              </p>
            </div>

            <div className="rounded-xl border border-volt-blue/20 bg-background p-4">
              <p className="font-semibold text-volt-white">
                A — Section
              </p>

              <p className="mt-1 text-sm text-volt-white/60">
                En mètres carrés (m²)
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6">
          <h2 className="text-lg font-semibold text-volt-white">
            À retenir
          </h2>

          <p className="mt-3 text-sm leading-6 text-volt-white/70">
            Plus un conducteur est long, plus sa résistance augmente.
            Plus sa section est grande, plus sa résistance diminue.
          </p>
        </section>

        <div className="mt-6">
          <Link
            href="/calculer/resistance-conducteur"
            className="inline-flex rounded-xl bg-volt-orange px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Calculer cette résistance →
          </Link>
        </div>
      </div>
    </main>
  );
}
