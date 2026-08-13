import Link from "next/link";

export default function ElectriciteFormulesPage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/formules"
          className="inline-flex items-center text-sm text-volt-white/60 transition hover:text-volt-blue"
        >
          ← Retour
        </Link>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-volt-white">
            ⚡ Formules électriques
          </h1>

          <p className="mt-3 text-volt-white/70">
            Choisis une formule pour commencer.
          </p>
        </div>

        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link
            href="/formules/electricite/loi-ohm"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/50"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              ⚡ Loi d&apos;Ohm
            </h2>

            <p className="mt-3 text-lg font-medium text-volt-blue">
              U = R × I
            </p>
          </Link>

          <Link
            href="/formules/electricite/puissance"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/50"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              💡 Puissance électrique
            </h2>

            <p className="mt-3 text-lg font-medium text-volt-blue">
              P = U × I
            </p>
          </Link>

          <Link
            href="/formules/electricite/energie"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/50"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              🔋 Énergie électrique
            </h2>

            <p className="mt-3 text-lg font-medium text-volt-blue">
              E = P × t
            </p>
          </Link>

          <Link
            href="/formules/electricite/chute-de-tension"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/50"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              📉 Chute de tension
            </h2>

            <p className="mt-3 text-lg font-medium text-volt-blue">
              ΔU = R × I
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}