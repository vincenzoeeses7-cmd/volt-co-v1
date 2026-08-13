"use client";

import Link from "next/link";
import { useState } from "react";

type Formula = {
  title: string;
  formula: string;
  href: string;
  variables: string[];
};

const formulas: Formula[] = [
  {
    title: "Loi d'Ohm",
    formula: "U = R × I",
    href: "/formules/electricite/loi-ohm",
    variables: ["U", "R", "I"],
  },
  {
    title: "Puissance électrique",
    formula: "P = U × I",
    href: "/formules/electricite/puissance",
    variables: ["P", "U", "I"],
  },
  {
    title: "Énergie électrique",
    formula: "E = P × t",
    href: "/formules/electricite/energie",
    variables: ["E", "P", "t"],
  },
  {
    title: "Chute de tension",
    formula: "ΔU = R × I",
    href: "/formules/electricite/chute-de-tension",
    variables: ["ΔU", "R", "I"],
  },
  {
    title: "Résistance d'un conducteur",
    formula: "R = ρ × L / A",
    href: "/formules/electricite/resistance-conducteur",
    variables: ["R", "ρ", "L", "A"],
  },
];

const quantities = {
  U: {
    name: "Tension",
    unit: "volt (V)",
  },
  I: {
    name: "Intensité",
    unit: "ampère (A)",
  },
  R: {
    name: "Résistance",
    unit: "ohm (Ω)",
  },
  P: {
    name: "Puissance",
    unit: "watt (W)",
  },
  E: {
    name: "Énergie",
    unit: "joule (J)",
  },
  t: {
    name: "Temps",
    unit: "seconde (s)",
  },
  "ΔU": {
    name: "Chute de tension",
    unit: "volt (V)",
  },
  ρ: {
    name: "Résistivité",
    unit: "ohm-mètre (Ω·m)",
  },
  L: {
    name: "Longueur",
    unit: "mètre (m)",
  },
  A: {
    name: "Section",
    unit: "mètre carré (m²)",
  },
};

type QuantityKey = keyof typeof quantities;

const rearrangedFormulas: Partial<
  Record<QuantityKey, Record<string, string>>
> = {
  U: {
    "Loi d'Ohm": "U = R × I",
    "Puissance électrique": "U = P / I",
    "Chute de tension": "ΔU = R × I",
  },

  I: {
    "Loi d'Ohm": "I = U / R",
    "Puissance électrique": "I = P / U",
    "Chute de tension": "I = ΔU / R",
  },

  R: {
    "Loi d'Ohm": "R = U / I",
    "Chute de tension": "R = ΔU / I",
    "Résistance d'un conducteur": "R = ρ × L / A",
  },

  P: {
    "Puissance électrique": "P = U × I",
    "Énergie électrique": "P = E / t",
  },

  E: {
    "Énergie électrique": "E = P × t",
  },

  t: {
    "Énergie électrique": "t = E / P",
  },

  "ΔU": {
    "Chute de tension": "ΔU = R × I",
  },

  ρ: {
    "Résistance d'un conducteur": "ρ = R × A / L",
  },

  L: {
    "Résistance d'un conducteur": "L = R × A / ρ",
  },

  A: {
    "Résistance d'un conducteur": "A = ρ × L / R",
  },
};

export default function ElectriciteFormulesPage() {
  const [selectedQuantity, setSelectedQuantity] =
    useState<QuantityKey>("U");

  const current = quantities[selectedQuantity];

  const relatedFormulas = formulas.filter((formula) =>
    formula.variables.includes(selectedQuantity)
  );

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/formules"
          className="inline-flex items-center text-sm text-volt-white/60 transition hover:text-volt-blue"
        >
          ← Retour
        </Link>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-volt-white">
            ⚡ Électricité
          </h1>

          <p className="mt-3 text-volt-white/70">
            Explore les grandeurs et retrouve rapidement les formules qui
            leur sont associées.
          </p>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-volt-white">
            Quelle grandeur cherches-tu ?
          </h2>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {(Object.keys(quantities) as QuantityKey[]).map((symbol) => {
              const quantity = quantities[symbol];
              const isActive = symbol === selectedQuantity;

              return (
                <button
                  key={symbol}
                  type="button"
                  onClick={() => setSelectedQuantity(symbol)}
                  className={`rounded-2xl border p-5 text-left transition ${
                    isActive
                      ? "border-volt-orange bg-volt-orange/10"
                      : "border-volt-blue/20 bg-volt-blue-dark hover:-translate-y-1 hover:border-volt-blue/60 hover:bg-volt-blue-dark/80"
                  }`}
                >
                  <div
                    className={`text-2xl font-bold ${
                      isActive
                        ? "text-volt-orange"
                        : "text-volt-blue"
                    }`}
                  >
                    {symbol}
                  </div>

                  <p
                    className={`mt-2 text-sm ${
                      isActive
                        ? "text-volt-white/80"
                        : "text-volt-white/60"
                    }`}
                  >
                    {quantity.name}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 sm:p-8">
          <div>
            <p className="text-3xl font-bold text-volt-orange">
              {selectedQuantity}
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-volt-white">
              {current.name}
            </h2>

            <p className="mt-1 text-sm text-volt-white/50">
              Unité : {current.unit}
            </p>
          </div>

          <div className="mt-10 space-y-8">
            {relatedFormulas.map((formula) => {
              const targetFormula =
                rearrangedFormulas[selectedQuantity]?.[formula.title];

              const hasRearrangement =
                targetFormula &&
                targetFormula !== formula.formula;

              return (
                <div key={formula.title}>
                  <div className="mb-4 text-center">
                    <h3 className="text-lg font-semibold text-volt-white">
                      {formula.title}
                    </h3>
                  </div>

                  <div
                    className={`grid gap-4 ${
                      hasRearrangement
                        ? "sm:grid-cols-2"
                        : "sm:grid-cols-1"
                    }`}
                  >
                    {hasRearrangement && (
                      <Link
                        href={formula.href}
                        className="group rounded-2xl border border-volt-orange/40 bg-background p-5 transition hover:-translate-y-1 hover:border-volt-orange/70"
                      >
                        <p className="text-sm font-medium text-volt-orange">
                          Comment trouver {selectedQuantity} ?
                        </p>

                        <p className="mt-3 text-2xl font-bold text-volt-orange">
                          {targetFormula}
                        </p>

                        <p className="mt-3 text-sm text-volt-white/40 transition group-hover:text-volt-orange">
                          Voir la formule →
                        </p>
                      </Link>
                    )}

                    <Link
                      href={formula.href}
                      className={`group rounded-2xl border bg-background p-5 transition hover:-translate-y-1 ${
                        hasRearrangement
                          ? "border-volt-blue/20 hover:border-volt-blue/60"
                          : "border-volt-orange/40 hover:border-volt-orange/70"
                      } ${
                        !hasRearrangement
                          ? "sm:mx-auto sm:w-full"
                          : ""
                      }`}
                    >
                      <p
                        className={`text-sm font-medium ${
                          hasRearrangement
                            ? "text-volt-white/60"
                            : "text-volt-orange"
                        }`}
                      >
                        {hasRearrangement
                          ? "Formule de base"
                          : `Comment trouver ${selectedQuantity} ?`}
                      </p>

                      <p
                        className={`mt-3 text-2xl font-bold ${
                          hasRearrangement
                            ? "text-volt-blue"
                            : "text-volt-orange"
                        }`}
                      >
                        {hasRearrangement
                          ? formula.formula
                          : targetFormula ?? formula.formula}
                      </p>

                      <p
                        className={`mt-3 text-sm text-volt-white/40 transition ${
                          hasRearrangement
                            ? "group-hover:text-volt-blue"
                            : "group-hover:text-volt-orange"
                        }`}
                      >
                        Voir la formule →
                      </p>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}