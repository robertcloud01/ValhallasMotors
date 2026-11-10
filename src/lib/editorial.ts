export type Photograph = {
  src: string;
  alt: string;
  credit?: { author: string; source: string; license: "BY-SA 4.0" | "BY 2.0" };
};

export type EditorialVehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: string;
  engine: string;
  power: string;
  chapter: string;
  description: string;
  photos: Photograph[];
  source?: string;
};

const commons = "https://commons.wikimedia.org/wiki/File:";

export const edition: EditorialVehicle[] = [
  {
    id: "porsche-911-gt3-touring",
    brand: "Porsche",
    model: "911 GT3 Touring",
    year: 2022,
    category: "Esportivo",
    engine: "Boxer 4.0 aspirado",
    power: "510 cv",
    chapter: "01 / Precisão",
    description: "O pacote Touring preserva o motor aspirado do GT3 e dá ao 911 um perfil mais contido. Sem a asa traseira fixa, o desenho remete ao 911 de rua.",
    photos: [
      {
        src: "/editorial/porsche-alt.webp",
        alt: "Porsche 911 GT3 Touring cinza, fotografado em Filderstadt",
        credit: { author: "Alexander Migl", source: commons + "Porsche_992_GT3_with_touring_package_1X7A6142.jpg", license: "BY-SA 4.0" },
      },
      {
        src: "/editorial/porsche.webp",
        alt: "Porsche 911 GT3 Touring em outro registro fotográfico",
        credit: { author: "Calreyn88", source: commons + "2022_Porsche_911_GT3_Touring_992.jpg", license: "BY-SA 4.0" },
      },
    ],
    source: "https://newsroom.porsche.com/en/2021/products/porsche-911-gt3-touring-package-premiere-24794.html",
  },
  {
    id: "lamborghini-revuelto",
    brand: "Lamborghini",
    model: "Revuelto",
    year: 2023,
    category: "Superesportivo",
    engine: "V12 híbrido plug-in",
    power: "1.015 cv",
    chapter: "02 / Potência",
    description: "Um V12 aspirado trabalha com três motores elétricos. Por fora, as linhas convergem para o centro da carroceria e deixam o motor exposto na traseira.",
    photos: [
      {
        src: "/editorial/revuelto.webp",
        alt: "Lamborghini Revuelto laranja no Festival de Goodwood de 2023",
        credit: { author: "MrWalkr", source: commons + "2023_Lamborghini_Revuelto_LB744_Orange_FOS23.jpg", license: "BY-SA 4.0" },
      },
      {
        src: "/editorial/revuelto-interior.webp",
        alt: "Volante, painel e console de um Lamborghini Revuelto",
        credit: { author: "Y.Leclercq", source: commons + "Lamborghini_Revuelto_int%C3%A9rieur_02.jpg", license: "BY-SA 4.0" },
      },
    ],
    source: "https://www.lamborghini.com/en-en/models/revuelto-models/revuelto",
  },
  {
    id: "bentley-continental-gt-mulliner",
    brand: "Bentley",
    model: "Continental GT Mulliner",
    year: 2024,
    category: "Gran Turismo",
    engine: "W12 6.0 biturbo",
    power: "659 cv",
    chapter: "03 / Viagem",
    description: "O Continental GT Mulliner reúne um W12 de seis litros e a proposta de um gran turismo de duas portas, pensado para longas distâncias.",
    photos: [
      {
        src: "/editorial/bentley.webp",
        alt: "Bentley Continental GT Mulliner W12 fotografado por Charles",
        credit: { author: "Charles (usf1fan2)", source: commons + "Bentley_Continental_GT_Mulliner_W12_(2024)_(54560204795).jpg", license: "BY 2.0" },
      },
      {
        src: "/editorial/bentley-alt.webp",
        alt: "Bentley Continental GT Mulliner de 2022, outro exemplar da mesma geração",
        credit: { author: "Calreyn88", source: commons + "2022_Bentley_Continental_GT_Mulliner.jpg", license: "BY-SA 4.0" },
      },
    ],
    source: "https://cdn.bentleymotors.com/downloads/en/brochure/global/continental/BNTLY_027_ContinentalGT24MYCustomerBookv21EN.pdf",
  },
];

export const vehicleName = (car: EditorialVehicle) => `${car.brand} ${car.model}`;

export type SearchValues = Record<string, string | string[] | undefined>;

export function firstValue(value: SearchValues[string]) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export function stockFilters(values: SearchValues) {
  return {
    q: firstValue(values.q).trim().slice(0, 100),
    marca: firstValue(values.marca).slice(0, 100),
    categoria: firstValue(values.categoria).slice(0, 100),
    ordem: firstValue(values.ordem).slice(0, 20),
  };
}

export function stockQuery(filters: ReturnType<typeof stockFilters>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) query.set(key, value);
  }
  return query.toString();
}

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/gu, "").toLocaleLowerCase("pt-BR");
}

export function selectVehicles(cars: EditorialVehicle[], filters: ReturnType<typeof stockFilters>) {
  const terms = normalize(filters.q).split(/\s+/).filter(Boolean);
  const selected = cars.filter((car) => {
    const label = normalize(vehicleName(car));
    return terms.every((term) => label.includes(term)) &&
      (!filters.marca || filters.marca === car.brand) &&
      (!filters.categoria || filters.categoria === car.category);
  });
  if (filters.ordem === "ano") return selected.sort((a, b) => b.year - a.year);
  if (filters.ordem === "nome") return selected.sort((a, b) => vehicleName(a).localeCompare(vehicleName(b), "pt-BR"));
  return selected;
}
