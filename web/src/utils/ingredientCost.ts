interface IngredientCostInput {
  purchase_unit_price: number;
  purchase_quantity: number;
  purchase_unity: string;
  used_quantity: number;
  used_unity: string;
}

type UnitDefinition = {
  dimension: "mass" | "volume" | "count";
  factor: number;
};

const unitDefinitions: Record<string, UnitDefinition> = {
  kg: { dimension: "mass", factor: 1000 },
  g: { dimension: "mass", factor: 1 },
  mg: { dimension: "mass", factor: 0.001 },
  t: { dimension: "mass", factor: 1_000_000 },
  l: { dimension: "volume", factor: 1000 },
  ml: { dimension: "volume", factor: 1 },
  cl: { dimension: "volume", factor: 10 },
  dl: { dimension: "volume", factor: 100 },
  unidade: { dimension: "count", factor: 1 },
};

const unitAliases: Record<string, string> = {
  quilograma: "kg",
  quilogramas: "kg",
  quilo: "kg",
  quilos: "kg",
  kilo: "kg",
  kilos: "kg",
  grama: "g",
  gramas: "g",
  miligrama: "mg",
  miligramas: "mg",
  tonelada: "t",
  toneladas: "t",
  litro: "l",
  litros: "l",
  mililitro: "ml",
  mililitros: "ml",
  centilitro: "cl",
  centilitros: "cl",
  decilitro: "dl",
  decilitros: "dl",
  un: "unidade",
  und: "unidade",
  unid: "unidade",
  unidades: "unidade",
  peca: "unidade",
  pecas: "unidade",
  pacote: "pacote",
  pacotes: "pacote",
  caixa: "caixa",
  caixas: "caixa",
  saco: "saco",
  sacos: "saco",
  lata: "lata",
  latas: "lata",
  frasco: "frasco",
  frascos: "frasco",
};

function normalizeUnit(unit: string) {
  const normalized = unit
    .trim()
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, " ");

  return unitAliases[normalized] ?? normalized;
}

function toBaseQuantity(quantity: number, unit: string) {
  const normalizedUnit = normalizeUnit(unit);
  const definition = unitDefinitions[normalizedUnit];

  return definition
    ? { quantity: quantity * definition.factor, dimension: definition.dimension }
    : { quantity, dimension: `custom:${normalizedUnit}` };
}

export function calculateIngredientCost({
  purchase_unit_price,
  purchase_quantity,
  purchase_unity,
  used_quantity,
  used_unity,
}: IngredientCostInput): number | undefined {
  if (
    !Number.isFinite(purchase_unit_price) ||
    !Number.isFinite(purchase_quantity) ||
    !Number.isFinite(used_quantity) ||
    purchase_quantity <= 0 ||
    used_quantity < 0
  ) {
    return undefined;
  }

  const purchaseUnit = toBaseQuantity(1, purchase_unity);
  const used = toBaseQuantity(used_quantity, used_unity);
  if (purchaseUnit.dimension !== used.dimension) {
    return undefined;
  }

  return (purchase_unit_price * used.quantity) / purchaseUnit.quantity;
}
