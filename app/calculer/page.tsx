import Link from "next/link";

export default function CalculerPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl">
 <Link
          href="/"
          className="inline-flex items-center text-sm text-volt-white/60 transition hover:text-volt-blue"
        >
          ← Retour
        </Link>

        <h1 className="text-4xl font-bold text-volt-white">
          Calculer
        </h1>

        <p className="mt-3 text-volt-white/70">
          Choisis un outil pour commencer.
        </p>

        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link
            href="/calculer/loi-ohm"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              ⚡ Loi d&apos;Ohm
            </h2>

            <p className="mt-2 text-volt-white/70">
              Calculer la tension, l&apos;intensité ou la résistance.
            </p>
          </Link>

          <Link
            href="/calculer/puissance"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              💡 Puissance électrique
            </h2>

            <p className="mt-2 text-volt-white/70">
              Calculer la puissance, la tension ou l&apos;intensité.
            </p>
          </Link>

          <Link
            href="/calculer/resistances"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              🔌 Résistances
            </h2>

            <p className="mt-2 text-volt-white/70">
              Calculer la résistance équivalente en série et en parallèle.
            </p>
          </Link>

          <Link
            href="/calculer/energie"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              🔋 Énergie électrique
            </h2>

            <p className="mt-2 text-volt-white/70">
              Calculer l&apos;énergie consommée sur une période donnée.
            </p>
          </Link>

          <Link
            href="/calculer/chute-de-tension"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              📉 Chute de tension
            </h2>

            <p className="mt-2 text-volt-white/70">
              Calculer la chute de tension dans un conducteur.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}