
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
            Des conversions simples et utiles pour l'électricité.
          </p>
        </div>

        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          {/* Longueur */}
          <Link
            href="/convertir/longueur"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              📏 Longueur
            </h2>

            <p className="mt-2 text-volt-white/70">
              mm, cm, dm, m, dam, hm et km.
            </p>
          </Link>

          {/* Surface */}
          <Link
            href="/convertir/surface"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              📐 Surface
            </h2>

            <p className="mt-2 text-volt-white/70">
              mm², cm², dm², m², dam², hm² et km².
            </p>
          </Link>

          {/* Tension */}
          <Link
            href="/convertir/tension"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              ⚡ Tension
            </h2>

            <p className="mt-2 text-volt-white/70">
              µV, mV, V, kV et MV.
            </p>
          </Link>

          {/* Intensité */}
          <Link
            href="/convertir/intensite"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              🔌 Intensité
            </h2>

            <p className="mt-2 text-volt-white/70">
              µA, mA, A et kA.
            </p>
          </Link>

          {/* Résistance */}
          <Link
            href="/convertir/resistance"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              Ω Résistance
            </h2>

            <p className="mt-2 text-volt-white/70">
              Ω, kΩ, MΩ et GΩ.
            </p>
          </Link>

          {/* Puissance */}
          <Link
            href="/convertir/puissance"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              💡 Puissance
            </h2>

            <p className="mt-2 text-volt-white/70">
              mW, W, kW, MW et GW.
            </p>
          </Link>

          {/* Énergie */}
          <Link
            href="/convertir/energie"
            className="rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 transition hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
          >
            <h2 className="text-xl font-semibold text-volt-white">
              🔋 Énergie
            </h2>

            <p className="mt-2 text-volt-white/70">
              Wh, kWh, MWh et GWh.
            </p>
          </Link>
        </section>
      </div>
    </main>
  );
}
