import Link from "next/link";

export default function ConvertirPage() {
  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-volt-white/60 transition hover:text-volt-blue"
        >
          ← Retour
        </Link>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-volt-white">
            Convertir
          </h1>

          <p className="mt-3 text-volt-white/70">
            Choisis une conversion pour commencer.
          </p>
        </div>

        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          <Link
            href="/convertir/longueur"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              📏 Longueur
            </h2>

            <p className="mt-2 text-volt-white/70">
              Convertir les mètres, centimètres et millimètres.
            </p>
          </Link>

          <Link
            href="/convertir/tension"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              ⚡ Tension
            </h2>

            <p className="mt-2 text-volt-white/70">
              Convertir les volts, millivolts et kilovolts.
            </p>
          </Link>

          <Link
            href="/convertir/intensite"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              🔌 Intensité
            </h2>

            <p className="mt-2 text-volt-white/70">
              Convertir les ampères, milliampères et kiloampères.
            </p>
          </Link>

          <Link
            href="/convertir/resistance"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              Ω Résistance
            </h2>

            <p className="mt-2 text-volt-white/70">
              Convertir les ohms, kiloohms et mégaohms.
            </p>
          </Link>

          <Link
            href="/convertir/puissance"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              💡 Puissance
            </h2>

            <p className="mt-2 text-volt-white/70">
              Convertir les watts, kilowatts et mégawatts.
            </p>
          </Link>

          <Link
            href="/convertir/energie"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              🔋 Énergie
            </h2>

            <p className="mt-2 text-volt-white/70">
              Convertir les watt-heures, kilowatt-heures et mégawatt-heures.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}