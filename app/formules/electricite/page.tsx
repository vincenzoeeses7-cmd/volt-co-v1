"use client";

import Link from "next/link";
import { useState } from "react";

type Formula = {
  title: string;
  formula: string;
  href: string;
  variables: string[];
  result: QuantityKey;
};

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

type SearchFormula = Formula & {
  rearranged: string;
};

const formulas: Formula[] = [
  {
    title: "Loi d'Ohm",
    formula: "U = R × I",
    href: "/formules/electricite/loi-ohm",
    variables: ["U", "R", "I"],
    result: "U",
  },
  {
    title: "Puissance électrique",
    formula: "P = U × I",
    href: "/formules/electricite/puissance",
    variables: ["P", "U", "I"],
    result: "P",
  },
  {
    title: "Énergie électrique",
    formula: "E = P × t",
    href: "/formules/electricite/energie",
    variables: ["E", "P", "t"],
    result: "E",
  },
  {
    title: "Chute de tension",
    formula: "ΔU = R × I",
    href: "/formules/electricite/chute-de-tension",
    variables: ["ΔU", "R", "I"],
    result: "ΔU",
  },
  {
    title: "Résistance d'un conducteur",
    formula: "R = ρ × L / A",
    href: "/formules/electricite/resistance-conducteur",
    variables: ["R", "ρ", "L", "A"],
    result: "R",
  },
];

const rearrangedFormulas: Partial<
  Record<QuantityKey, Record<string, string>>
> = {
  U: {
    "Loi d'Ohm": "U = R × I",
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

const availableCombinations: Partial<
  Record<string, { formula: string; result: QuantityKey }>
> = {
  "U+R": {
    formula: "I = U / R",
    result: "I",
  },

  "R+U": {
    formula: "I = U / R",
    result: "I",
  },

  "U+I": {
    formula: "R = U / I",
    result: "R",
  },

  "I+U": {
    formula: "R = U / I",
    result: "R",
  },

  "R+I": {
    formula: "U = R × I",
    result: "U",
  },

  "I+R": {
    formula: "U = R × I",
    result: "U",
  },

  "P+U": {
    formula: "I = P / U",
    result: "I",
  },

  "U+P": {
    formula: "I = P / U",
    result: "I",
  },

  "P+I": {
    formula: "U = P / I",
    result: "U",
  },

  "I+P": {
    formula: "U = P / I",
    result: "U",
  },

  "P+t": {
    formula: "E = P × t",
    result: "E",
  },

  "t+P": {
    formula: "E = P × t",
    result: "E",
  },

  "E+P": {
    formula: "t = E / P",
    result: "t",
  },

  "P+E": {
    formula: "t = E / P",
    result: "t",
  },

  "E+t": {
    formula: "P = E / t",
    result: "P",
  },

  "t+E": {
    formula: "P = E / t",
    result: "P",
  },

  "ΔU+R": {
    formula: "I = ΔU / R",
    result: "I",
  },

  "R+ΔU": {
    formula: "I = ΔU / R",
    result: "I",
  },

  "ΔU+I": {
    formula: "R = ΔU / I",
    result: "R",
  },

  "I+ΔU": {
    formula: "R = ΔU / I",
    result: "R",
  },

  "R+ρ+L": {
    formula: "A = ρ × L / R",
    result: "A",
  },

  "R+ρ+A": {
    formula: "L = R × A / ρ",
    result: "L",
  },

  "R+L+A": {
    formula: "ρ = R × A / L",
    result: "ρ",
  },

  "ρ+L+A": {
    formula: "R = ρ × L / A",
    result: "R",
  },
};

export default function ElectriciteFormulesPage() {
  const [mode, setMode] = useState<"search" | "have">("search");

  const [selectedQuantity, setSelectedQuantity] =
    useState<QuantityKey>("U");

  const [selectedQuantities, setSelectedQuantities] = useState<
    QuantityKey[]
  >(["U", "R"]);

  const current = quantities[selectedQuantity];

  const relatedFormulas = formulas.filter((formula) =>
    formula.variables.includes(selectedQuantity)
  );

  function toggleQuantity(quantity: QuantityKey) {
    setSelectedQuantities((current) => {
      if (current.includes(quantity)) {
        return current.filter((item) => item !== quantity);
      }

      return [...current, quantity];
    });
  }

  function getAvailableFormula(
    formula: Formula
  ): SearchFormula | null {
    const target = formula.result;

    if (selectedQuantities.includes(target)) {
      return null;
    }

    const requiredVariables = formula.variables.filter(
      (variable) => variable !== target
    );

    const hasEverything = requiredVariables.every((variable) =>
      selectedQuantities.includes(variable as QuantityKey)
    );

    if (!hasEverything) {
      return null;
    }

    const rearranged =
      rearrangedFormulas[target]?.[formula.title];

    if (!rearranged) {
      return null;
    }

    return {
      ...formula,
      rearranged,
    };
  }

  const availableFormulas = formulas
    .map(getAvailableFormula)
    .filter((formula): formula is SearchFormula => formula !== null);

  const selectedLabels = selectedQuantities.map(
    (quantity) => quantities[quantity].name
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
            Trouve rapidement la formule dont tu as besoin.
          </p>
        </div>

        {/* SWITCH */}
        <section className="mt-8">
          <div className="inline-flex w-full rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-1 sm:w-auto">
            <button
              type="button"
              onClick={() => setMode("search")}
              className={`flex-1 rounded-xl px-6 py-3 text-sm font-semibold transition sm:min-w-36 ${
                mode === "search"
                  ? "bg-volt-orange text-white"
                  : "text-volt-white/60 hover:text-volt-white"
              }`}
            >
              🔎 Je cherche
            </button>

            <button
              type="button"
              onClick={() => setMode("have")}
              className={`flex-1 rounded-xl px-6 py-3 text-sm font-semibold transition sm:min-w-36 ${
                mode === "have"
                  ? "bg-volt-orange text-white"
                  : "text-volt-white/60 hover:text-volt-white"
              }`}
            >
              🧩 J'ai
            </button>
          </div>
        </section>

        {mode === "search" ? (
          <>
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-volt-white">
                Quelle grandeur cherches-tu ?
              </h2>

              <p className="mt-2 text-sm text-volt-white/50">
                Choisis ce que tu veux calculer.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {(Object.keys(quantities) as QuantityKey[]).map(
                  (symbol) => {
                    const quantity = quantities[symbol];
                    const isActive =
                      symbol === selectedQuantity;

                    return (
                      <button
                        key={symbol}
                        type="button"
                        onClick={() =>
                          setSelectedQuantity(symbol)
                        }
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
                  }
                )}
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
                    rearrangedFormulas[selectedQuantity]?.[
                      formula.title
                    ];

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
                              : targetFormula ??
                                formula.formula}
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
          </>
        ) : (
          <>
            <section className="mt-10">
              <h2 className="text-xl font-semibold text-volt-white">
                Quelles grandeurs as-tu ?
              </h2>

              <p className="mt-2 text-sm text-volt-white/50">
                Sélectionne les valeurs que tu connais.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {(Object.keys(quantities) as QuantityKey[]).map(
                  (symbol) => {
                    const quantity = quantities[symbol];
                    const isActive =
                      selectedQuantities.includes(symbol);

                    return (
                      <button
                        key={symbol}
                        type="button"
                        onClick={() => toggleQuantity(symbol)}
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

                        {isActive && (
                          <p className="mt-3 text-xs font-medium text-volt-orange">
                            ✓ Disponible
                          </p>
                        )}
                      </button>
                    );
                  }
                )}
              </div>
            </section>

            <section className="mt-10 rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-6 sm:p-8">
              <p className="text-sm text-volt-white/50">
                Tu as sélectionné
              </p>

              <p className="mt-2 text-lg font-semibold text-volt-white">
                {selectedQuantities.length === 0
                  ? "Aucune grandeur"
                  : selectedLabels.join(" + ")}
              </p>

              {availableFormulas.length > 0 ? (
                <>
                  <h2 className="mt-10 text-xl font-semibold text-volt-white">
                    Tu peux calculer :
                  </h2>

                  <div className="mt-5 space-y-4">
                    {availableFormulas.map((formula) => (
                      <Link
                        key={formula.title}
                        href={formula.href}
                        className="group block rounded-2xl border border-volt-orange/40 bg-background p-5 transition hover:-translate-y-1 hover:border-volt-orange/70"
                      >
                        <p className="text-sm font-medium text-volt-orange">
                          {formula.title}
                        </p>

                        <p className="mt-3 text-2xl font-bold text-volt-orange">
                          {formula.rearranged}
                        </p>

                        <p className="mt-3 text-sm text-volt-white/40 transition group-hover:text-volt-orange">
                          Voir la formule →
                        </p>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="mt-8 rounded-2xl border border-volt-blue/20 bg-background p-6 text-center">
                  <p className="text-lg font-semibold text-volt-white">
                    Pas encore de formule disponible
                  </p>

                  <p className="mt-2 text-sm text-volt-white/50">
                    Sélectionne davantage de grandeurs pour voir ce
                    que tu peux calculer.
                  </p>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}