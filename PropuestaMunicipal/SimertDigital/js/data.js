/**
 * Datos ficticios del prototipo SIMERT Inteligente — Loja.
 * Sin backend. Coordenadas aproximadas del casco urbano para el mapa demo.
 */
window.SIM = window.SIM || {};

SIM.DEMO_START = "2026-09-09T10:35:00-05:00";

SIM.CIUDADANO = {
  nombre: "Andrés Cevallos",
  cedula: "1104782216",
  telefono: "099 812 4403",
  correo: "andres.cevallos@correo.ec",
  barrio: "Centro"
};

SIM.AGENTE = {
  nombre: "Cabo Luis Ramón",
  placa: "CT-184",
  unidad: "Control de Estacionamiento · DTT",
  usuario: "ct184",
  correo: "ct184@movilidad.loja.gob.ec",
  password: "loja2026"
};

SIM.ADMIN = {
  nombre: "Ing. Patricia Mora",
  cargo: "Dirección de Movilidad y Transporte",
  area: "Municipio de Loja",
  usuario: "pmora",
  correo: "pmora@movilidad.loja.gob.ec",
  password: "loja2026"
};

SIM.ZONAS = [
  {
    id: "centro",
    nombre: "Zona Centro",
    alias: "Casco histórico",
    color: "#003366",
    tipo: "Azul · rotación",
    tarifaHora: 0.5,
    maxHoras: 3,
    horario: "08:00 – 20:00",
    lat: -3.9968,
    lng: -79.2034,
    radio: 280
  },
  {
    id: "mercado",
    nombre: "Zona Mercado",
    alias: "Mercado Centro",
    color: "#8B0000",
    tipo: "Roja · alta demanda",
    tarifaHora: 0.6,
    maxHoras: 2,
    horario: "07:00 – 19:00",
    lat: -3.9939,
    lng: -79.2046,
    radio: 220
  },
  {
    id: "noviembre",
    nombre: "Zona 18 de Noviembre",
    alias: "Lourdes / 18 de Noviembre",
    color: "#DAA520",
    tipo: "Dorada · media estancia",
    tarifaHora: 0.4,
    maxHoras: 3,
    horario: "08:00 – 20:00",
    lat: -3.9986,
    lng: -79.2012,
    radio: 240
  },
  {
    id: "terminal",
    nombre: "Zona Terminal",
    alias: "Terminal Terrestre",
    color: "#0A192F",
    tipo: "Azul · rotación",
    tarifaHora: 0.35,
    maxHoras: 4,
    horario: "06:00 – 22:00",
    lat: -3.9888,
    lng: -79.2148,
    radio: 260
  },
  {
    id: "universitaria",
    nombre: "Zona Universitaria",
    alias: "Entorno UNL / centro sur",
    color: "#1A4A7A",
    tipo: "Azul · media estancia",
    tarifaHora: 0.3,
    maxHoras: 4,
    horario: "07:00 – 21:00",
    lat: -4.0012,
    lng: -79.2041,
    radio: 250
  }
];

SIM.VEHICULOS_USUARIO = [
  { placa: "LOJ-2048", alias: "Kia Sportage", color: "Blanco", anio: 2021, principal: true },
  { placa: "PBA-8812", alias: "Chevrolet Aveo", color: "Gris", anio: 2016, principal: false }
];

SIM.METODOS_PAGO = [
  { id: "visa", tipo: "Tarjeta", etiqueta: "Visa ···· 4412", principal: true },
  { id: "saldo", tipo: "Saldo SIMERT", etiqueta: "Billetera SIMERT", principal: false },
  { id: "deuna", tipo: "Transferencia", etiqueta: "Deuna / transferencia", principal: false }
];

function plaza(id, zonaId, lat, lng, ocupada, placa) {
  return { id: id, zonaId: zonaId, lat: lat, lng: lng, ocupada: !!ocupada, placa: placa || null, sensor: true };
}

SIM.PLAZAS_SEED = [
  plaza("C-01", "centro", -3.99655, -79.20485, true, "GAA-4410"),
  plaza("C-02", "centro", -3.99658, -79.20455, true, "MCH-3321"),
  plaza("C-03", "centro", -3.99662, -79.20425, false, null),
  plaza("C-04", "centro", -3.99666, -79.20395, true, "PXA-1107"),
  plaza("C-05", "centro", -3.99670, -79.20365, false, null),
  plaza("C-06", "centro", -3.99674, -79.20335, true, "ABC-9182"),
  plaza("C-07", "centro", -3.99678, -79.20305, false, null),
  plaza("C-08", "centro", -3.99682, -79.20275, true, "LBA-2201"),
  plaza("C-09", "centro", -3.99715, -79.20440, false, null),
  plaza("C-10", "centro", -3.99718, -79.20410, true, "GAI-5520"),
  plaza("C-11", "centro", -3.99722, -79.20380, false, null),
  plaza("C-12", "centro", -3.99726, -79.20350, true, null),
  plaza("C-13", "centro", -3.99620, -79.20420, false, null),
  plaza("C-14", "centro", -3.99622, -79.20390, true, "TBA-7730"),
  plaza("C-15", "centro", -3.99626, -79.20360, false, null),
  plaza("C-16", "centro", -3.99630, -79.20330, true, "RPA-1044"),
  plaza("C-17", "centro", -3.99690, -79.20240, false, null),
  plaza("C-18", "centro", -3.99740, -79.20320, true, "HCL-6098"),
  plaza("C-19", "centro", -3.99705, -79.20290, false, null),
  plaza("C-20", "centro", -3.99645, -79.20250, true, null),
  plaza("C-21", "centro", -3.99610, -79.20310, false, null),
  plaza("C-22", "centro", -3.99750, -79.20390, true, "VSA-4419"),
  plaza("C-23", "centro", -3.99600, -79.20450, false, null),
  plaza("C-24", "centro", -3.99760, -79.20420, true, "NMA-8123"),

  plaza("M-01", "mercado", -3.99370, -79.20520, true, "QWE-3301"),
  plaza("M-02", "mercado", -3.99375, -79.20490, true, "ZXC-2290"),
  plaza("M-03", "mercado", -3.99380, -79.20460, false, null),
  plaza("M-04", "mercado", -3.99385, -79.20430, true, null),
  plaza("M-05", "mercado", -3.99410, -79.20500, true, "PLM-1188"),
  plaza("M-06", "mercado", -3.99415, -79.20470, false, null),
  plaza("M-07", "mercado", -3.99420, -79.20440, true, "KJH-6671"),
  plaza("M-08", "mercado", -3.99350, -79.20480, false, null),
  plaza("M-09", "mercado", -3.99355, -79.20450, true, "BGT-4402"),
  plaza("M-10", "mercado", -3.99340, -79.20510, true, "YHN-9090"),
  plaza("M-11", "mercado", -3.99435, -79.20485, false, null),
  plaza("M-12", "mercado", -3.99395, -79.20535, true, null),

  plaza("N-01", "noviembre", -3.99840, -79.20180, false, null),
  plaza("N-02", "noviembre", -3.99845, -79.20150, true, "DFG-2218"),
  plaza("N-03", "noviembre", -3.99850, -79.20120, false, null),
  plaza("N-04", "noviembre", -3.99855, -79.20090, true, "ERT-7744"),
  plaza("N-05", "noviembre", -3.99880, -79.20160, false, null),
  plaza("N-06", "noviembre", -3.99885, -79.20130, false, null),
  plaza("N-07", "noviembre", -3.99890, -79.20100, true, "UIO-3355"),
  plaza("N-08", "noviembre", -3.99820, -79.20140, false, null),
  plaza("N-09", "noviembre", -3.99825, -79.20110, true, null),
  plaza("N-10", "noviembre", -3.99910, -79.20140, false, null),
  plaza("N-11", "noviembre", -3.99870, -79.20070, false, null),
  plaza("N-12", "noviembre", -3.99900, -79.20170, true, "WQA-1280"),

  plaza("T-01", "terminal", -3.98860, -79.21540, true, "BUS-1022"),
  plaza("T-02", "terminal", -3.98865, -79.21510, false, null),
  plaza("T-03", "terminal", -3.98870, -79.21480, true, "TAX-4401"),
  plaza("T-04", "terminal", -3.98875, -79.21450, false, null),
  plaza("T-05", "terminal", -3.98900, -79.21520, true, "VAN-8833"),
  plaza("T-06", "terminal", -3.98905, -79.21490, false, null),
  plaza("T-07", "terminal", -3.98910, -79.21460, true, null),
  plaza("T-08", "terminal", -3.98840, -79.21490, false, null),
  plaza("T-09", "terminal", -3.98890, -79.21420, true, "RUT-5500"),
  plaza("T-10", "terminal", -3.98850, -79.21550, false, null),

  plaza("U-01", "universitaria", -4.00100, -79.20460, false, null),
  plaza("U-02", "universitaria", -4.00105, -79.20430, true, "UNL-2016"),
  plaza("U-03", "universitaria", -4.00110, -79.20400, false, null),
  plaza("U-04", "universitaria", -4.00115, -79.20370, true, "EST-4412"),
  plaza("U-05", "universitaria", -4.00140, -79.20440, false, null),
  plaza("U-06", "universitaria", -4.00145, -79.20410, false, null),
  plaza("U-07", "universitaria", -4.00080, -79.20420, true, "DOC-1190"),
  plaza("U-08", "universitaria", -4.00085, -79.20390, false, null),
  plaza("U-09", "universitaria", -4.00160, -79.20420, true, null),
  plaza("U-10", "universitaria", -4.00070, -79.20450, false, null)
];

SIM.HISTORIAL_SEED = [
  { id: "h1", placa: "LOJ-2048", zonaId: "centro", inicio: "2026-09-08T09:12:00-05:00", fin: "2026-09-08T09:48:00-05:00", costo: 0.3, metodo: "visa" },
  { id: "h2", placa: "LOJ-2048", zonaId: "noviembre", inicio: "2026-09-06T16:05:00-05:00", fin: "2026-09-06T17:20:00-05:00", costo: 0.5, metodo: "saldo" },
  { id: "h3", placa: "PBA-8812", zonaId: "mercado", inicio: "2026-09-05T11:40:00-05:00", fin: "2026-09-05T12:10:00-05:00", costo: 0.3, metodo: "visa" }
];

SIM.GPS_DEMO = { lat: -3.99672, lng: -79.20348, precision: 12 };
