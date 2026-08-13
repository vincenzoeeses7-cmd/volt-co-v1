"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResistanceConducteurPage() {
  const [resistivity, setResistivity] = useState("");
  const [length, setLength] = useState("");
  const [section, setSection] = useState("");

  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  function calculateResistance() {
    setResult(null);
    setError("");

    const rho = Number(resistivity);
    const l = Number(length);
    const a = Number(section);

    if (
      !resistivity ||
      !length ||
      !section ||
      !Number.isFinite(rho) ||
      !Number.isFinite(l) ||
      !Number.isFinite(a)
    ) {
      setError("Entre trois valeurs valides.");
      return;
    }

    if (rho <= 0 || l <= 0 || a <= 0) {
      setError("Les valeurs doivent être supérieures à 0.");
      return;
    }

    setResult((rho * l) / a);
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
            🔧 Résistance d&apos;un conducteur
          </h1>

          <p className="mt-3 text-volt-white/70">
            Calcule la résistance d&apos;un conducteur à partir de sa
            résistivité, de sa longueur et de sa section.
          </p>
        </div>

        <section className="mt-10 rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-volt-white">
                Résistivité (Ω·m)
              </span>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background focus-within:border-volt-blue/60">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={resistivity}
                  onChange={(event) => {
                    setResistivity(event.target.value);
                    setResult(null);
                    setError("");
                  }}
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                />

                <span className="flex items-center border-l border-volt-blue/20 px-4 text-sm text-volt-white/50">
                  Ω·m
                </span>
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-volt-white">
                Longueur (m)
              </span>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background focus-within:border-volt-blue/60">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={length}
                  onChange={(event) => {
                    setLength(event.target.value);
                    setResult(null);
                    setError("");
                  }}
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                />

                <span className="flex items-center border-l border-volt-blue/20 px-4 text-sm text-volt-white/50">
                  m
                </span>
              </div>
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-medium text-volt-white">
                Section (m²)
              </span>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background focus-within:border-volt-blue/60">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={section}
                  onChange={(event) => {
                    setSection(event.target.value);
                    setResult(null);
                    setError("");
                  }}
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                />

                <span className="flex items-center border-l border-volt-blue/20 px-4 text-sm text-volt-white/50">
                  m²
                </span>
              </div>
            </label>
          </div>

          <button
            type="button"
            onClick={calculateResistance}
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
                Résistance : {result} Ω
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}