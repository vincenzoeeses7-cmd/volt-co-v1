"use client";

import Link from "next/link";
import { useState } from "react";
import { calculateVoltageDrop } from "@/lib/calculations/electrical";

export default function ChuteDeTensionPage() {
  const [resistance, setResistance] = useState("");
  const [current, setCurrent] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function calculateResult() {
    setError("");
    setResult(null);

    const resistanceValue = Number(resistance);
    const currentValue = Number(current);

    if (
      !resistance ||
      !current ||
      !Number.isFinite(resistanceValue) ||
      !Number.isFinite(currentValue)
    ) {
      setError("Entre deux valeurs valides.");
      return;
    }

    try {
      const voltageDrop = calculateVoltageDrop(
        resistanceValue,
        currentValue
      );

      setResult(voltageDrop);
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
            📉 Chute de tension
          </h1>

          <p className="mt-3 text-volt-white/70">
            Calcule la chute de tension dans un conducteur.
          </p>
        </div>

        <section className="mt-10 rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-volt-white">
                Résistance (Ω)
              </span>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background focus-within:border-volt-blue/60">
                <input
                  type="number"
                  min="0"
                  value={resistance}
                  onChange={(event) =>
                    setResistance(event.target.value)
                  }
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                />

                <span className="flex items-center border-l border-volt-blue/20 px-4 text-sm text-volt-white/50">
                  Ω
                </span>
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-volt-white">
                Intensité (A)
              </span>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background focus-within:border-volt-blue/60">
                <input
                  type="number"
                  min="0"
                  value={current}
                  onChange={(event) =>
                    setCurrent(event.target.value)
                  }
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                />

                <span className="flex items-center border-l border-volt-blue/20 px-4 text-sm text-volt-white/50">
                  A
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
                Chute de tension : {result} V
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}