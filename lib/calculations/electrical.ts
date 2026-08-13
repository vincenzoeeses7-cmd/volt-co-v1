export type OhmInput =
  | { voltage: number; resistance: number }
  | { voltage: number; current: number }
  | { resistance: number; current: number };

export type OhmResult = {
  voltage?: number;
  resistance?: number;
  current?: number;
};

/**
 * Loi d'Ohm
 *
 * U = R × I
 * R = U ÷ I
 * I = U ÷ R
 */
export function calculateOhmsLaw(input: OhmInput): OhmResult {
  if ("voltage" in input && "resistance" in input) {
    if (input.resistance === 0) {
      throw new Error("La résistance ne peut pas être égale à zéro.");
    }

    return {
      voltage: input.voltage,
      resistance: input.resistance,
      current: input.voltage / input.resistance,
    };
  }

  if ("voltage" in input && "current" in input) {
    if (input.current === 0) {
      throw new Error("L'intensité ne peut pas être égale à zéro.");
    }

    return {
      voltage: input.voltage,
      current: input.current,
      resistance: input.voltage / input.current,
    };
  }

  if ("resistance" in input && "current" in input) {
    return {
      resistance: input.resistance,
      current: input.current,
      voltage: input.resistance * input.current,
    };
  }

  throw new Error("Données insuffisantes pour calculer la loi d'Ohm.");
}

/**
 * Puissance électrique
 *
 * P = U × I
 */
export function calculatePower(voltage: number, current: number): number {
  return voltage * current;
}
export function calculateVoltageFromPower(
  power: number,
  current: number
): number {
  if (current === 0) {
    throw new Error("L'intensité ne peut pas être égale à zéro.");
  }

  return power / current;
}

export function calculateCurrentFromPower(
  power: number,
  voltage: number
): number {
  if (voltage === 0) {
    throw new Error("La tension ne peut pas être égale à zéro.");
  }

  return power / voltage;
}

export function calculateEnergy(
  power: number,
  time: number
): number {
  return power * time;
}

export function calculateVoltageDrop(
  resistance: number,
  current: number
): number {
  return resistance * current;
}
/**
 * Résistances en série
 *
 * Rtotal = R1 + R2 + ... + Rn
 */
export function calculateSeriesResistance(
  resistances: number[]
): number {
  if (resistances.length === 0) {
    throw new Error("Ajoute au moins une résistance.");
  }

  if (resistances.some((resistance) => resistance < 0)) {
    throw new Error("Une résistance ne peut pas être négative.");
  }

  return resistances.reduce(
    (total, resistance) => total + resistance,
    0
  );
}

/**
 * Résistances en parallèle
 *
 * 1 / Rtotal = 1/R1 + 1/R2 + ... + 1/Rn
 */
export function calculateParallelResistance(
  resistances: number[]
): number {
  if (resistances.length === 0) {
    throw new Error("Ajoute au moins une résistance.");
  }

  if (
    resistances.some(
      (resistance) => resistance <= 0
    )
  ) {
    throw new Error(
      "Les résistances doivent être supérieures à zéro."
    );
  }

  const inverseTotal = resistances.reduce(
    (total, resistance) => total + 1 / resistance,
    0
  );

  return 1 / inverseTotal;
}

