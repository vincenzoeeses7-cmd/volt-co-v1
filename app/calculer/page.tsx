"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Mode = "normal" | "electricite" | "pro";
type Quantity = "U" | "I" | "R";

export default function CalculerPage() {
  const searchParams = useSearchParams();
  const isChantier = searchParams.get("chantier") === "true";

  const [mode, setMode] = useState<Mode>("normal");

  // CALCULATRICE NORMALE
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [hasCalculated, setHasCalculated] = useState(false);

  function addToCalculator(value: string) {
    const isOperator = ["+", "-", "×", "÷"].includes(value);
    const isNumberOrDecimal = /^[0-9.]$/.test(value);

    // Après un résultat :
    // - un chiffre / "." démarre un nouveau calcul
    // - un opérateur continue avec le résultat
    if (hasCalculated) {
      if (isNumberOrDecimal) {
        setDisplay(value === "." ? "0." : value);
        setExpression("");
        setHasCalculated(false);
        return;
      }

      if (isOperator) {
        setDisplay((current) => current + value);
        setExpression("");
        setHasCalculated(false);
        return;
      }

      if (value === "(") {
        setDisplay(value);
        setExpression("");
        setHasCalculated(false);
        return;
      }

      if (value === ")") {
        return;
      }
    }

    setDisplay((current) => {
      if (current === "Erreur") {
        return isOperator ? "0" + value : value;
      }

      if (current === "0" && value !== ".") {
        return value;
      }

      // Évite deux opérateurs à la suite
      if (
        isOperator &&
        ["+", "-", "×", "÷"].includes(current.slice(-1))
      ) {
        return current.slice(0, -1) + value;
      }

      // Évite plusieurs points dans le même nombre
      if (value === ".") {
        const lastNumber = current.split(/[+\-×÷()]/).pop() ?? "";

        if (lastNumber.includes(".")) {
          return current;
        }
      }

      return current + value;
    });
  }

  function clearCalculator() {
    setDisplay("0");
    setExpression("");
    setHasCalculated(false);
  }

  function deleteLastCharacter() {
    if (hasCalculated) {
      setDisplay("0");
      setExpression("");
      setHasCalculated(false);
      return;
    }

    setDisplay((current) => {
      if (current === "Erreur" || current.length <= 1) {
        return "0";
      }

      return current.slice(0, -1);
    });
  }

  function calculateResult() {
    try {
      const safeExpression = display
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/,/g, ".");

      if (!/^[0-9+\-*/().\s]+$/.test(safeExpression)) {
        setDisplay("Erreur");
        setExpression("");
        setHasCalculated(true);
        return;
      }

      const result = Function(
        `"use strict"; return (${safeExpression})`
      )();

      if (typeof result === "number" && Number.isFinite(result)) {
        setExpression(display);
        setDisplay(String(result));
        setHasCalculated(true);
      } else {
        setDisplay("Erreur");
        setExpression("");
        setHasCalculated(true);
      }
    } catch {
      setDisplay("Erreur");
      setExpression("");
      setHasCalculated(true);
    }
  }

  // CLAVIER PHYSIQUE
  useEffect(() => {
    if (mode !== "normal") {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key;

      if (/^[0-9]$/.test(key)) {
        event.preventDefault();
        addToCalculator(key);
        return;
      }

      if (key === "." || key === ",") {
        event.preventDefault();
        addToCalculator(".");
        return;
      }

      if (["+", "-", "*", "/", "(", ")"].includes(key)) {
        event.preventDefault();

        const value =
          key === "*"
            ? "×"
            : key === "/"
            ? "÷"
            : key;

        addToCalculator(value);
        return;
      }

      if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculateResult();
        return;
      }

      if (key === "Escape") {
        event.preventDefault();
        clearCalculator();
        return;
      }

      if (key === "Backspace") {
        event.preventDefault();
        deleteLastCharacter();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mode, display, hasCalculated]);

  // CALCUL ÉLECTRIQUE
  const [selectedQuantity, setSelectedQuantity] =
    useState<Quantity>("R");

  const [u, setU] = useState("");
  const [i, setI] = useState("");
  const [r, setR] = useState("");
  const [electricResult, setElectricResult] = useState<number | null>(
    null
  );

  function calculateElectricity() {
    const voltage = Number(u);
    const current = Number(i);
    const resistance = Number(r);

    if (selectedQuantity === "U") {
      if (u === "" || i === "") {
        return;
      }

      if (Number.isFinite(current) && Number.isFinite(resistance)) {
        setElectricResult(current * resistance);
      }

      return;
    }

    if (selectedQuantity === "I") {
      if (u === "" || r === "" || resistance === 0) {
        return;
      }

      if (Number.isFinite(voltage) && Number.isFinite(resistance)) {
        setElectricResult(voltage / resistance);
      }

      return;
    }

    if (u === "" || i === "" || current === 0) {
      return;
    }

    if (Number.isFinite(voltage) && Number.isFinite(current)) {
      setElectricResult(voltage / current);
    }
  }

  function resetElectricity() {
    setU("");
    setI("");
    setR("");
    setElectricResult(null);
  }

  return (
    <main className="min-h-screen px-5 py-5 sm:px-6 sm:py-6">
      <div className="mx-auto max-w-5xl">
        <Link
  href={isChantier ? "/outils/chantier" : "/"}
  className="inline-flex items-center text-sm text-volt-white/60 transition hover:text-volt-blue"
>
  ← {isChantier ? "Chantier" : "Retour"}
</Link>

        <div className="mt-4">
          <h1 className="text-3xl font-bold text-volt-white sm:text-4xl">
            🧮 Calculatrice
          </h1>

          <p className="mt-2 text-sm text-volt-white/60">
            Une calculatrice simple, rapide et efficace.
          </p>
        </div>

        {/* ZONE CENTRALE */}
        <div className="mx-auto mt-5 max-w-md">
          {/* MODES */}
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-volt-blue/20 bg-volt-blue-dark p-2">
            <button
              type="button"
              onClick={() => setMode("normal")}
              className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                mode === "normal"
                  ? "bg-volt-orange text-white"
                  : "text-volt-white/60 hover:bg-background hover:text-volt-white"
              }`}
            >
              Normal
            </button>

            <button
              type="button"
              onClick={() => setMode("electricite")}
              className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                mode === "electricite"
                  ? "bg-volt-orange text-white"
                  : "text-volt-white/60 hover:bg-background hover:text-volt-white"
              }`}
            >
              ⚡ Élec.
            </button>

            <button
              type="button"
              onClick={() => setMode("pro")}
              className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${
                mode === "pro"
                  ? "bg-volt-orange text-white"
                  : "text-volt-white/60 hover:bg-background hover:text-volt-white"
              }`}
            >
              Pro
            </button>
          </div>

          {/* NORMAL */}
          {mode === "normal" && (
            <section className="mt-3 rounded-3xl border border-volt-blue/20 bg-volt-blue-dark p-4 sm:p-5">
              <div className="mb-4 rounded-2xl border border-volt-blue/20 bg-background p-4 text-right">
                {expression && (
                  <p className="mb-1 text-sm text-volt-white/30">
                    {expression}
                  </p>
                )}

                <p className="overflow-x-auto text-4xl font-semibold text-volt-white">
                  {display}
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={clearCalculator}
                  className="rounded-xl bg-background p-3.5 text-lg font-semibold text-volt-orange transition hover:brightness-125"
                >
                  C
                </button>

                <button
                  type="button"
                  onClick={() => addToCalculator("(")}
                  className="rounded-xl bg-background p-3.5 text-lg font-semibold text-volt-white transition hover:brightness-125"
                >
                  (
                </button>

                <button
                  type="button"
                  onClick={() => addToCalculator(")")}
                  className="rounded-xl bg-background p-3.5 text-lg font-semibold text-volt-white transition hover:brightness-125"
                >
                  )
                </button>

                <button
                  type="button"
                  onClick={() => addToCalculator("÷")}
                  className="rounded-xl bg-background p-3.5 text-lg font-semibold text-volt-blue transition hover:brightness-125"
                >
                  ÷
                </button>

                {["7", "8", "9"].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => addToCalculator(number)}
                    className="rounded-xl bg-background p-3.5 text-lg font-semibold text-volt-white transition hover:brightness-125"
                  >
                    {number}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => addToCalculator("×")}
                  className="rounded-xl bg-background p-3.5 text-lg font-semibold text-volt-blue transition hover:brightness-125"
                >
                  ×
                </button>

                {["4", "5", "6"].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => addToCalculator(number)}
                    className="rounded-xl bg-background p-3.5 text-lg font-semibold text-volt-white transition hover:brightness-125"
                  >
                    {number}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => addToCalculator("-")}
                  className="rounded-xl bg-background p-3.5 text-lg font-semibold text-volt-blue transition hover:brightness-125"
                >
                  −
                </button>

                {["1", "2", "3"].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => addToCalculator(number)}
                    className="rounded-xl bg-background p-3.5 text-lg font-semibold text-volt-white transition hover:brightness-125"
                  >
                    {number}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => addToCalculator("+")}
                  className="rounded-xl bg-background p-3.5 text-lg font-semibold text-volt-blue transition hover:brightness-125"
                >
                  +
                </button>

                <button
                  type="button"
                  onClick={() => addToCalculator("0")}
                  className="rounded-xl bg-background p-3.5 text-lg font-semibold text-volt-white transition hover:brightness-125"
                >
                  0
                </button>

                <button
                  type="button"
                  onClick={() => addToCalculator(".")}
                  className="rounded-xl bg-background p-3.5 text-lg font-semibold text-volt-white transition hover:brightness-125"
                >
                  ,
                </button>

                <button
                  type="button"
                  onClick={calculateResult}
                  className="col-span-2 rounded-xl bg-volt-orange p-3.5 text-lg font-semibold text-white transition hover:brightness-110"
                >
                  =
                </button>
              </div>
            </section>
          )}

          {/* ÉLECTRICITÉ */}
          {mode === "electricite" && (
            <section className="mt-3 rounded-3xl border border-volt-blue/20 bg-volt-blue-dark p-5 sm:p-6">
              <div className="text-center">
                <p className="text-sm text-volt-white/50">
                  Que veux-tu trouver ?
                </p>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {(["U", "I", "R"] as Quantity[]).map((quantity) => (
                    <button
                      key={quantity}
                      type="button"
                      onClick={() => {
                        setSelectedQuantity(quantity);
                        setElectricResult(null);
                      }}
                      className={`rounded-xl border p-4 text-xl font-bold transition ${
                        selectedQuantity === quantity
                          ? "border-volt-orange bg-volt-orange/10 text-volt-orange"
                          : "border-volt-blue/20 bg-background text-volt-white hover:border-volt-blue/60"
                      }`}
                    >
                      {quantity}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {selectedQuantity !== "U" && (
                  <div>
                    <label className="mb-2 block text-sm text-volt-white/60">
                      Tension
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background">
                      <input
                        type="number"
                        value={u}
                        onChange={(event) => {
                          setU(event.target.value);
                          setElectricResult(null);
                        }}
                        placeholder="230"
                        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                      />

                      <span className="flex items-center px-4 text-sm text-volt-white/40">
                        V
                      </span>
                    </div>
                  </div>
                )}

                {selectedQuantity !== "I" && (
                  <div>
                    <label className="mb-2 block text-sm text-volt-white/60">
                      Intensité
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background">
                      <input
                        type="number"
                        value={i}
                        onChange={(event) => {
                          setI(event.target.value);
                          setElectricResult(null);
                        }}
                        placeholder="10"
                        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                      />

                      <span className="flex items-center px-4 text-sm text-volt-white/40">
                        A
                      </span>
                    </div>
                  </div>
                )}

                {selectedQuantity !== "R" && (
                  <div>
                    <label className="mb-2 block text-sm text-volt-white/60">
                      Résistance
                    </label>

                    <div className="flex overflow-hidden rounded-xl border border-volt-blue/20 bg-background">
                      <input
                        type="number"
                        value={r}
                        onChange={(event) => {
                          setR(event.target.value);
                          setElectricResult(null);
                        }}
                        placeholder="23"
                        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-volt-white outline-none"
                      />

                      <span className="flex items-center px-4 text-sm text-volt-white/40">
                        Ω
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={calculateElectricity}
                className="mt-6 w-full rounded-xl bg-volt-orange px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:brightness-110"
              >
                Calculer
              </button>

              {electricResult !== null && (
                <div className="mt-5 rounded-2xl border border-volt-blue/30 bg-background p-5 text-center">
                  <p className="text-sm text-volt-white/50">
                    Résultat
                  </p>

                  <p className="mt-2 text-3xl font-bold text-volt-blue">
                    {electricResult.toLocaleString("fr-FR")}{" "}
                    {selectedQuantity === "U"
                      ? "V"
                      : selectedQuantity === "I"
                      ? "A"
                      : "Ω"}
                  </p>
                </div>
              )}

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/formules"
                  className="flex-1 rounded-xl border border-volt-blue/20 bg-background px-4 py-3 text-center text-sm text-volt-white/60 transition hover:border-volt-blue/60 hover:text-volt-blue"
                >
                  📚 Voir la formule
                </Link>

                <button
                  type="button"
                  onClick={resetElectricity}
                  className="rounded-xl border border-volt-blue/20 bg-background px-4 py-3 text-sm text-volt-white/40 transition hover:border-volt-blue/60 hover:text-volt-white"
                >
                  Réinitialiser
                </button>
              </div>

              <Link
                href="/calculer/electrique"
                className="mt-5 block text-center text-sm text-volt-white/40 transition hover:text-volt-blue"
              >
                Voir tous les calculs électriques →
              </Link>
            </section>
          )}

          {/* PRO */}
          {mode === "pro" && (
            <section className="mt-3 rounded-3xl border border-volt-blue/20 bg-volt-blue-dark p-8 text-center">
              <div className="text-5xl">🧠</div>

              <h2 className="mt-5 text-2xl font-semibold text-volt-white">
                Calculatrice Pro
              </h2>

              <p className="mt-3 text-volt-white/60">
                Cet espace sera ajouté quand nous saurons exactement ce
                qu&apos;il doit apporter.
              </p>

              <p className="mt-4 text-sm text-volt-white/40">
                Pas de fonctionnalité ajoutée juste pour remplir.
              </p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}