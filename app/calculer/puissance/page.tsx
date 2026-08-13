"use client";

import Link from "next/link";
import { useState } from "react";
import {
  calculatePower,
  calculateVoltageFromPower,
  calculateCurrentFromPower,
} from "@/lib/calculations/electrical";

type PowerMode =
  | "voltage-current"
  | "power-current"
  | "power-voltage";

const powerModes = {
  "voltage-current": {
    label: "Tension + Intensité",
    firstLabel: "Tension",
    firstUnit: "V",
    secondLabel: "Intensité",
    secondUnit: "A",
    resultLabel: "Puissance",
    resultUnit: "W",
  },
  "power-current": {
    label: "Puissance + Intensité",
    firstLabel: "Puissance",
    firstUnit: "W",
    secondLabel: "Intensité",
    secondUnit: "A",
    resultLabel: "Tension",
    resultUnit: "V",
  },
  "power-voltage": {
    label: "Puissance + Tension",
    firstLabel: "Puissance",
    firstUnit: "W",
    secondLabel: "Tension",
    secondUnit: "V",
    resultLabel: "Intensité",
    resultUnit: "A",
  },
};

export default function PuissancePage() {
  const [powerMode, setPowerMode] =
    useState<PowerMode>("voltage-current");

  const [powerFirst, setPowerFirst] = useState("");
  const [powerSecond, setPowerSecond] = useState("");
  const [powerResult, setPowerResult] =
    useState<number | null>(null);
  const [powerError, setPowerError] = useState("");

  const currentPowerMode = powerModes[powerMode];

  function calculatePowerResult() {
    setPowerError("");
    setPowerResult(null);

    const first = Number(powerFirst);
    const second = Number(powerSecond);

    if (
      !powerFirst ||
      !powerSecond ||
      !Number.isFinite(first) ||
      !Number.isFinite(second)
    ) {
      setPowerError("Entre deux valeurs valides.");
      return;
    }

    try {
      if (powerMode === "voltage-current") {
        setPowerResult(calculatePower(first, second));
      }

      if (powerMode === "power-current") {
        setPowerResult(
          calculateVoltageFromPower(first, second)
        );
      }

      if (powerMode === "power-voltage") {
        setPowerResult(
          calculateCurrentFromPower(first, second)
        );
      }
    } catch (error) {
      setPowerError(
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
            💡 Puissance électrique
          </h1>

          <p className="mt-3 text-volt-white/70">
            Calcule la puissance, la tension ou l&apos;intensité.
          </p>
        </div>

        <section className="mt-10 rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-volt-white">
            Je connais :
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {Object.entries(powerModes).map(([value, option]) => {
              const isActive = value === powerMode;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setPowerMode(value as PowerMode);
                    setPowerResult(null);
                    setPowerError("");
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
                {currentPowerMode.firstLabel} (
                {currentPowerMode.firstUnit})
              </span>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background focus-within:border-volt-blue/60">
                <input
                  type="number"
                  value={powerFirst}
                  onChange={(event) =>
                    setPowerFirst(event.target.value)
                  }
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                />

                <span className="flex items-center border-l border-volt-blue/20 px-4 text-sm text-volt-white/50">
                  {currentPowerMode.firstUnit}
                </span>
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-medium text-volt-white">
                {currentPowerMode.secondLabel} (
                {currentPowerMode.secondUnit})
              </span>

              <div className="mt-2 flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background focus-within:border-volt-blue/60">
                <input
                  type="number"
                  value={powerSecond}
                  onChange={(event) =>
                    setPowerSecond(event.target.value)
                  }
                  className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                />

                <span className="flex items-center border-l border-volt-blue/20 px-4 text-sm text-volt-white/50">
                  {currentPowerMode.secondUnit}
                </span>
              </div>
            </label>
          </div>

          <button
            type="button"
            onClick={calculatePowerResult}
            className="mt-8 w-full rounded-xl bg-volt-orange px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Calculer
          </button>

          {powerError && (
            <div className="mt-5 rounded-xl border border-volt-orange/30 bg-volt-orange/10 p-4">
              <p className="text-sm text-volt-orange">
                {powerError}
              </p>
            </div>
          )}

          {powerResult !== null && (
            <div className="mt-5 rounded-xl border border-volt-blue/30 bg-background p-5">
              <p className="text-sm text-volt-white/50">
                Résultat
              </p>

              <p className="mt-2 text-2xl font-bold text-volt-blue">
                {currentPowerMode.resultLabel} :{" "}
                {powerResult} {currentPowerMode.resultUnit}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}