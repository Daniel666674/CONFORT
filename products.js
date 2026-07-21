/**
 * Shared product catalog for Colchones Real Confort MD.
 * Read by admin.html (inventory management) and, eventually, by the
 * public storefront pages. Plain data + one lookup table — no per-product
 * special-casing, so adding a new size- or color-driven category is a
 * one-line change to CATEGORY_CONFIG below.
 */

// Which variant shape each category uses, and the label to show for it.
// variantType: 'sizes' | 'colors' | 'units'
window.CATEGORY_CONFIG = {
  colchones: { label: "Colchones",        variantType: "sizes",  variantLabel: "Talla", options: ["Sencillo (100×190)", "Doble (140×190)", "Queen (160×190)", "King (200×200)"] },
  camas:     { label: "Camas Tapizadas",  variantType: "colors", variantLabel: "Color", options: ["Crema", "Gris", "Negro", "Azul Navy"] },
  bases:     { label: "Bases",            variantType: "units",  variantLabel: null,    options: [] },
  combos:    { label: "Combos",           variantType: "units",  variantLabel: null,    options: [] }
};

const LOW_STOCK_THRESHOLD = 5;

// Seed catalog. Stock is intentionally varied (healthy / low / out / draft)
// to exercise every filter and KPI in the admin panel.
window.PRODUCTS = [
  {
    id: "p1",
    slug: "colchon-pillow-top-confort",
    name: "Colchón Pillow Top Confort",
    brand: "Real Confort MD",
    category: "colchones",
    spec: "Espuma de alta densidad con acabado pillow top. Ideal para uso diario en toda la familia.",
    price: 350000,
    sku: "COL-PT-001",
    published: true,
    images: [
      "images/colchones/colchon-sencillo.jpg",
      "images/colchones/colchon-doble-lifestyle.jpg"
    ],
    sizes: [
      { label: "Sencillo (100×190)", units: 14 },
      { label: "Doble (140×190)", units: 9 },
      { label: "Queen (160×190)", units: 4 },
      { label: "King (200×200)", units: 0 }
    ],
    rev: 1,
    _snapshot: ""
  },
  {
    id: "p2",
    slug: "colchon-queen-premium-memory-foam",
    name: "Colchón Queen Premium Memory Foam",
    brand: "Real Confort MD",
    category: "colchones",
    spec: "Memory foam premium con zonas de presión diferencial. Nuestro modelo más vendido en Queen.",
    price: 680000,
    sku: "COL-QP-002",
    published: true,
    images: [
      "images/colchones/colchon-queen-pillowtop.jpg",
      "images/colchones/colchon-king-lifestyle.jpg"
    ],
    sizes: [
      { label: "Sencillo (100×190)", units: 6 },
      { label: "Doble (140×190)", units: 5 },
      { label: "Queen (160×190)", units: 11 },
      { label: "King (200×200)", units: 2 }
    ],
    rev: 1,
    _snapshot: ""
  },
  {
    id: "p3",
    slug: "colchon-medidas-especiales",
    name: "Colchón Medidas Especiales",
    brand: "Real Confort MD",
    category: "combos",
    spec: "Fabricación a medida para colchones fuera de estándar. Precio a consultar según medida.",
    price: 0,
    sku: "COL-ME-003",
    published: false,
    images: [
      "images/colchones/colchon-medidas.jpg"
    ],
    units: 0,
    rev: 1,
    _snapshot: ""
  },
  {
    id: "p4",
    slug: "cama-tapizada-capitone",
    name: "Cama Tapizada Capitoné",
    brand: "Real Confort MD",
    category: "camas",
    spec: "Cabecero capitoné, estructura reforzada y patas en madera maciza. Disponible en 4 colores.",
    price: 620000,
    sku: "CAM-CAP-004",
    published: true,
    images: [
      "images/camas/cama-tapizada-crema.jpg",
      "images/camas/cama-tapizada-negra.jpg",
      "images/camas/cama-tapizada-negra-cristales.jpg"
    ],
    colors: [
      { label: "Crema", units: 3 },
      { label: "Gris", units: 0 },
      { label: "Negro", units: 5 },
      { label: "Azul Navy", units: 2 }
    ],
    rev: 1,
    _snapshot: ""
  },
  {
    id: "p5",
    slug: "cama-tapizada-gris-premium",
    name: "Cama Tapizada Gris Premium con Banca",
    brand: "Real Confort MD",
    category: "camas",
    spec: "Cabecero acolchado con base para almacenamiento. Incluye banca a juego.",
    price: 780000,
    sku: "CAM-GP-005",
    published: true,
    images: [
      "images/camas/cama-tapizada-gris-premium.jpg"
    ],
    colors: [
      { label: "Crema", units: 0 },
      { label: "Gris", units: 7 },
      { label: "Negro", units: 0 },
      { label: "Azul Navy", units: 0 }
    ],
    rev: 1,
    _snapshot: ""
  },
  {
    id: "p6",
    slug: "base-clasica-gris",
    name: "Base Clásica Gris",
    brand: "Real Confort MD",
    category: "bases",
    spec: "Base tapizada gris, sencilla y resistente. La opción más económica.",
    price: 320000,
    sku: "BAS-CL-006",
    published: true,
    images: [
      "images/camas/base-cama-gris.jpg"
    ],
    units: 22,
    rev: 1,
    _snapshot: ""
  },
  {
    id: "p7",
    slug: "base-almacenamiento-elevable",
    name: "Base con Almacenamiento Elevable",
    brand: "Real Confort MD",
    category: "bases",
    spec: "Base elevable a gas para guardar cobijas y maletas debajo del colchón.",
    price: 580000,
    sku: "BAS-AE-007",
    published: true,
    images: [
      "images/camas/base-almacenamiento-elevable.jpg"
    ],
    units: 3,
    rev: 1,
    _snapshot: ""
  },
  {
    id: "p8",
    slug: "conjunto-base-colchon",
    name: "Conjunto Base + Colchón Real Confort",
    brand: "Real Confort MD",
    category: "combos",
    spec: "Base cajón o dividida + colchón a elegir. La solución completa en un solo precio.",
    price: 750000,
    sku: "CMB-BC-008",
    published: true,
    images: [
      "images/colchones/showroom-real-bogota.jpg"
    ],
    units: 0,
    rev: 1,
    _snapshot: ""
  }
];

window.SALES_LOG = [];
