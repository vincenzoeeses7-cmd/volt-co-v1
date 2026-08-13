"use client";

import Link from "next/link";
import { useState } from "react";
import { calculateOhmsLaw } from "@/lib/calculations/electrical";

type OhmMode =
  | "voltage-resistance"
  | "voltage-current"
  | "resistance-current";

const ohmModes = {
  "voltage-resistance": {
    label: "Tension + Résistance",
    firstLabel: "Tension",
    firstUnit: "V",
    secondLabel: "Résistance",
    secondUnit: "Ω",
    resultLabel: "Intensité",
    resultUnit: "A",
  },
  "voltage-current": {
    label: "Tension + Intensité",
    firstLabel: "Tension",
    firstUnit: "V",
    secondLabel: "Intensité",
    secondUnit: "A",
    resultLabel: "Résistance",
    resultUnit: "Ω",
  },
  "resistance-current": {
    label: "Résistance + Intensité",
    firstLabel: "Résistance",
    firstUnit: "Ω",
    secondLabel: "Intensité",
    secondUnit: "A",
    resultLabel: "Tension",
    resultUnit: "V",
  },
};

export default function LoiOhmPage() {
  const [ohmMode, setOhmMode] =
    useState<OhmMode>("voltage-resistance");

  const [ohmFirst, setOhmFirst] = useState("");
  const [ohmSecond, setOhmSecond] = useState("");
  const [ohmResult, setOhmResult] =
    useState<number | null>(null);
  const [ohmError, setOhmError] = useState("");

  const currentOhmMode = ohmModes[ohmMode];

  function calculateOhm() {
    setOhmError("");
    setOhmResult(null);

    const first = Number(ohmFirst);
    const second = Number(ohmSecond);

    if (
      !ohmFirst ||
      !ohmSecond ||
      !Number.isFinite(first) ||
      !Number.isFinite(second)
    ) {
      setOhmError("Entre deux valeurs valides.");
      return;
    }

    try {
      if (ohmMode === "voltage-resistance") {
        const result = calculateOhmsLaw({
          voltage: first,
          resistance: second,
        });

        setOhmResult(result.current ?? null);
      }

      if (ohmMode === "voltage-current") {
        const result = calculateOhmsLaw({
          voltage: first,
          current: second,
        });

        setOhmResult(result.resistance ?? null);
      }

      if (ohmMode === "resistance-current") {
        const result = calculateOhmsLaw({
          resistance: first,
          current: second,
        });

        setOhmResult(result.voltage ?? null);
      }
    } catch (error) {
      setOhmError(
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
            ⚡ Loi d&apos;Ohm
          </h1>

          <p className="mt-3 text-volt-white/70">
            Calcule la tension, l&apos;intensité ou la résistance.
          </p>

          <Link
  href="/formules/electricite/loi-ohm"
  className="mt-4 inline-flex items-center text-sm font-medium text-volt-blue transition hover:text-volt-white"
>
  📖 Voir la formule →
</Link>
        </div>

        <section className="mt-10 rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-volt-white">
            Je connais :
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {Object.entries(ohmModes).map(([value, option]) => {
              const isActive = value === ohmMode;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setOhmMode(value as OhmMode);
                    setOhmResult(null);
                    setOhmError("");
                  }}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "border-volt-blue bg-volt-blue text-white"
                      : "border-volt-blue/20 bg-background text-volt-white/70 hover:border-volt-blue/50 hover:text-volt-white"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-volt-white">
                {currentOhmMode.firstLabel} (
                {currentOhmMode.firstUnit})
              </span>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background focus-within:border-volt-blue/60">
                <input
                  type="number"
                  value={ohmFirst}
                  onChange={(event) =>
                    setOhmFirst(event.target.value)
                  }
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                />

                <span className="flex items-center border-l border-volt-blue/20 px-4 text-sm text-volt-white/50">
                  {currentOhmMode.firstUnit}
                </span>
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-volt-white">
                {currentOhmMode.secondLabel} (
                {currentOhmMode.secondUnit})
              </span>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background focus-within:border-volt-blue/60">
                <input
                  type="number"
                  value={ohmSecond}
                  onChange={(event) =>
                    setOhmSecond(event.target.value)
                  }
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                />

                <span className="flex items-center border-l border-volt-blue/20 px-4 text-sm text-volt-white/50">
                  {currentOhmMode.secondUnit}
                </span>
              </div>
            </label>
          </div>

          <button
            type="button"
            onClick={calculateOhm}
            className="mt-8 w-full rounded-xl bg-volt-orange px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Calculer
          </button>

          {ohmError && (
            <div className="mt-5 rounded-xl border border-volt-orange/30 bg-volt-orange/10 p-4">
              <p className="text-sm text-volt-orange">
                {ohmError}
              </p>
            </div>
          )}

          {ohmResult !== null && (
            <div className="mt-5 rounded-xl border border-volt-blue/30 bg-background p-5">
              <p className="text-sm text-volt-white/50">
                Résultat
              </p>

              <p className="mt-2 text-2xl font-bold text-volt-blue">
                {currentOhmMode.resultLabel} :{" "}
                {ohmResult} {currentOhmMode.resultUnit}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}