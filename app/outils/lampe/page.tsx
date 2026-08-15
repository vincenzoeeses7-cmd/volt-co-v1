"use client";

import Link from "next/link";
import { useState } from "react";

export default function LampePage() {
  const [isOn, setIsOn] = useState(false);

  return (
    <main
      className={`min-h-screen px-5 py-6 transition-colors duration-300 ${
        isOn ? "bg-white" : "bg-background"
      }`}
    >
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-2xl flex-col">
        <Link
          href="/outils/chantier"
          className={`inline-flex items-center text-sm font-medium transition ${
            isOn
              ? "text-black/60 hover:text-black"
              : "text-volt-white/60 hover:text-volt-white"
          }`}
        >
          ← Chantier
        </Link>

        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="text-center">
            <div className="text-6xl">🔦</div>

            <h1
              className={`mt-5 text-3xl font-bold ${
                isOn ? "text-black" : "text-volt-white"
              }`}
            >
              Lampe
            </h1>

            <p
              className={`mt-2 text-sm ${
                isOn ? "text-black/50" : "text-volt-white/50"
              }`}
            >
              {isOn ? "Lampe allumée" : "Lampe éteinte"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOn((current) => !current)}
            className={`mt-10 min-h-36 w-full max-w-sm rounded-3xl text-2xl font-bold transition active:scale-[0.98] ${
              isOn
                ? "bg-black text-white"
                : "bg-volt-orange text-white hover:brightness-110"
            }`}
          >
            {isOn ? "ÉTEINDRE" : "ALLUMER"}
          </button>
        </div>
      </div>
    </main>
  );
}