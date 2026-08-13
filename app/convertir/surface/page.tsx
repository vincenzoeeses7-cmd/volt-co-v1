"use client";

import Link from "next/link";
import { useState } from "react";

const units = {
  "mm²": 0,
  "cm²": 1,
  "dm²": 2,
  "m²": 3,
  "dam²": 4,
  "hm²": 5,
  "km²": 6,
} as const;

type Unit = keyof typeof units;

export default function SurfacePage() {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState<Unit>("m²");
  const [targetUnit, setTargetUnit] = useState<Unit>("cm²");
  const [result, setResult] = useState<number | null>(null);

  function convertSurface(
    value: number,
    from: Unit,
    to: Unit
  ) {
    if (from === to) {
      return value;
    }

    const difference = units[from] - units[to];

    return value * Math.pow(10, difference * 2);
  }

  function handleConvert() {
    if (value === "") {
      setResult(null);
      return;
    }

    const numericValue = Number(value);

    if (Number.isNaN(numericValue)) {
      setResult(null);
      return;
    }

    const converted = convertSurface(
      numericValue,
      unit,
      targetUnit
    );

    setResult(converted);
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/convertir"
          className="inline-flex items-center text-sm text-volt-white/60 transition hover:text-volt-blue"
        >
          ← Retour
        </Link>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-volt-white">
            📐 Surface
          </h1>

          <p className="mt-3 text-volt-white/70">
            Convertis rapidement une surface.
          </p>
        </div>

        <section className="mx-auto mt-10 max-w-2xl rounded-3xl border border-volt-blue/20 bg-volt-blue-dark p-6 sm:p-10">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
            <div className="flex w-full overflow-hidden rounded-xl border border-volt-blue/20 bg-background focus-within:border-volt-blue/60 sm:w-auto">
              <input
                type="number"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                  setResult(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleConvert();
                  }
                }}
                placeholder="250"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-center text-lg text-volt-white outline-none sm:w-32"
              />

              <select
                value={unit}
                onChange={(event) => {
                  setUnit(event.target.value as Unit);
                  setResult(null);
                }}
                className="appearance-none border-l border-volt-blue/20 bg-background px-3 py-3 text-sm text-volt-white outline-none"
              >
                {Object.keys(units).map((unitOption) => (
                  <option key={unitOption} value={unitOption}>
                    {unitOption}
                  </option>
                ))}
              </select>
            </div>

            <span className="text-2xl font-semibold text-volt-blue">
              →
            </span>

            <select
              value={targetUnit}
              onChange={(event) => {
                setTargetUnit(event.target.value as Unit);
                setResult(null);
              }}
              className="w-full appearance-none rounded-xl border border-volt-blue/20 bg-background px-4 py-3 text-center text-sm text-volt-white outline-none transition focus:border-volt-blue/60 sm:w-auto"
            >
              {Object.keys(units).map((unitOption) => (
                <option key={unitOption} value={unitOption}>
                  {unitOption}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleConvert}
            className="mt-8 w-full rounded-xl bg-volt-orange px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"
          >
            Convertir
          </button>

          {result !== null && (
            <div className="mt-6 rounded-xl border border-volt-blue/30 bg-background p-5 text-center">
              <p className="text-sm text-volt-white/50">
                Résultat
              </p>

              <p className="mt-2 text-2xl font-bold text-volt-blue">
                {result.toLocaleString("fr-FR")} {targetUnit}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}