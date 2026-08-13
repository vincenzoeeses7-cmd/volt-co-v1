"use client";

import Link from "next/link";
import { useState } from "react";
import { calculateSeriesResistance } from "@/lib/calculations/electrical";

export default function SeriePage() {
  const [resistanceCount, setResistanceCount] = useState(2);

  const [resistances, setResistances] = useState<string[]>(
    Array(2).fill("")
  );

  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function handleCountChange(count: number) {
    setResistanceCount(count);
    setResult(null);
    setError("");

    setResistances((current) => {
      const updated = Array(count).fill("");

      current.forEach((value, index) => {
        if (index < count) {
          updated[index] = value;
        }
      });

      return updated;
    });
  }

  function handleResistanceChange(index: number, value: string) {
    setResult(null);
    setError("");

    setResistances((current) => {
      const updated = [...current];
      updated[index] = value;
      return updated;
    });
  }

  function calculateResult() {
    setResult(null);
    setError("");

    const values = resistances.map(Number);

    if (
      resistances.some(
        (value) =>
          value === "" || !Number.isFinite(Number(value))
      )
    ) {
      setError("Entre une valeur valide pour chaque résistance.");
      return;
    }

    try {
      const total = calculateSeriesResistance(values);
      setResult(total);
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
            ⚡ Résistances
          </h1>

          <p className="mt-3 text-volt-white/70">
            Calcule la résistance équivalente d&apos;un montage.
          </p>
        </div>

        <div className="mt-6 inline-flex rounded-xl border border-volt-blue/20 bg-volt-blue-dark p-1">
          <span className="rounded-lg bg-volt-orange px-4 py-2 text-sm font-semibold text-white">
            Série
          </span>

          <Link
            href="/calculer/resistances/parallele"
            className="rounded-lg px-4 py-2 text-sm font-medium text-volt-white/60 transition hover:text-volt-white"
          >
            Parallèle
          </Link>
        </div>

        <section className="mt-6 rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 sm:p-8">
          <label className="block">
            <span className="text-sm font-medium text-volt-white">
              Nombre de résistances
            </span>

            <select
              value={resistanceCount}
              onChange={(event) =>
                handleCountChange(Number(event.target.value))
              }
              className="mt-2 w-full rounded-xl border border-volt-blue/20 bg-background px-4 py-3 text-volt-white outline-none focus:border-volt-blue/60"
            >
              {Array.from(
                { length: 9 },
                (_, index) => index + 2
              ).map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {resistances.map((value, index) => (
              <label key={index} className="block">
                <span className="text-sm font-medium text-volt-white">
                  R{index + 1} (Ω)
                </span>

                <div className="mt-2 flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background focus-within:border-volt-blue/60">
                  <input
                    type="number"
                    min="0"
                    value={value}
                    onChange={(event) =>
                      handleResistanceChange(
                        index,
                        event.target.value
                      )
                    }
                    className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                  />

                  <span className="flex items-center border-l border-volt-blue/20 px-4 text-sm text-volt-white/50">
                    Ω
                  </span>
                </div>
              </label>
            ))}
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
                Résistance équivalente : {result} Ω
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}