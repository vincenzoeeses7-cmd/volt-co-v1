"use client";

import Link from "next/link";
import { useState } from "react";

export default function ResistancePage() {
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("Ω");
  const [targetUnit, setTargetUnit] = useState("kΩ");
  const [result, setResult] = useState<number | null>(null);

  const factors: Record<string, number> = {
    Ω: 1,
    kΩ: 1_000,
    MΩ: 1_000_000,
    GΩ: 1_000_000_000,
  };

  function convertResistance(value: number, from: string, to: string) {
    return (value * factors[from]) / factors[to];
  }

  function handleConvert() {
    if (value === "") {
      setResult(null);
      return;
    }

    const converted = convertResistance(
      Number(value),
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
            Ω Résistance
          </h1>

          <p className="mt-3 text-volt-white/70">
            Convertis rapidement une résistance électrique.
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
                  setUnit(event.target.value);
                  setResult(null);
                }}
                className="appearance-none border-l border-volt-blue/20 bg-background px-3 py-3 text-sm text-volt-white outline-none"
              >
                <option value="Ω">Ω</option>
                <option value="kΩ">kΩ</option>
                <option value="MΩ">MΩ</option>
                <option value="GΩ">GΩ</option>
              </select>
            </div>

            <span className="text-2xl font-semibold text-volt-blue">
              →
            </span>

            <select
              value={targetUnit}
              onChange={(event) => {
                setTargetUnit(event.target.value);
                setResult(null);
              }}
              className="w-full appearance-none rounded-xl border border-volt-blue/20 bg-background px-4 py-3 text-center text-sm text-volt-white outline-none transition focus:border-volt-blue/60 sm:w-auto"
            >
              <option value="Ω">Ω</option>
              <option value="kΩ">kΩ</option>
              <option value="MΩ">MΩ</option>
              <option value="GΩ">GΩ</option>
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
                {result} {targetUnit}
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}