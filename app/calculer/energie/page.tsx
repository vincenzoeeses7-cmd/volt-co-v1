"use client";

import Link from "next/link";
import { useState } from "react";
import { calculateEnergy } from "@/lib/calculations/electrical";

export default function EnergiePage() {
  const [power, setPower] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function calculateResult() {
    setError("");
    setResult(null);

    const powerValue = Number(power);
    const timeValue = Number(time);

    if (
      !power ||
      !time ||
      !Number.isFinite(powerValue) ||
      !Number.isFinite(timeValue)
    ) {
      setError("Entre deux valeurs valides.");
      return;
    }

    try {
      const energy = calculateEnergy(
        powerValue,
        timeValue
      );

      setResult(energy);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue."
      );
    }
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/calculer"
          className="inline-flex items-center text-sm text-volt-white/60 transition hover:text-volt-blue"
        >
          ← Retour
        </Link>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-volt-white">
            🔋 Énergie électrique
          </h1>

          <p className="mt-3 text-volt-white/70">
            Calcule l&apos;énergie électrique consommée par un appareil.
          </p>
        </div>

        <section className="mt-10 rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-volt-white">
                Puissance (W)
              </span>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background focus-within:border-volt-blue/60">
                <input
                  type="number"
                  min="0"
                  value={power}
                  onChange={(event) =>
                    setPower(event.target.value)
                  }
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                />

                <span className="flex items-center border-l border-volt-blue/20 px-4 text-sm text-volt-white/50">
                  W
                </span>
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-volt-white">
                Durée (h)
              </span>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background focus-within:border-volt-blue/60">
                <input
                  type="number"
                  min="0"
                  value={time}
                  onChange={(event) =>
                    setTime(event.target.value)
                  }
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                />

                <span className="flex items-center border-l border-volt-blue/20 px-4 text-sm text-volt-white/50">
                  h
                </span>
              </div>
            </label>
          </div>

          <button
            type="button"
            onClick={calculateResult}
            className="mt-8 w-full rounded-xl bg-volt-orange px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Calculer
          </button>

          {error && (
            <div className="mt-5 rounded-xl border border-volt-orange/30 bg-volt-orange/10 p-4">
              <p className="text-sm text-volt-orange">
                {error}
              </p>
            </div>
          )}

          {result !== null && (
            <div className="mt-5 rounded-xl border border-volt-blue/30 bg-background p-5">
              <p className="text-sm text-volt-white/50">
                Résultat
              </p>

              <p className="mt-2 text-2xl font-bold text-volt-blue">
                Énergie : {result} Wh
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}