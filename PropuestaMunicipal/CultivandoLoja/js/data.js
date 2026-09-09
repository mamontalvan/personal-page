/**
 * Cultivando Futuro Loja — catálogos y datos semilla.
 * Códigos de producto: CPC Ver. 2.1 (INEC / MAG Ecuador).
 * Persistencia: localStorage (sin backend).
 */
window.CF = window.CF || {};

CF.PARROQUIAS = [
  { id: "el-sagrario", nombre: "El Sagrario", tipo: "urbana", lat: -3.9931, lng: -79.2042 },
  { id: "san-sebastian", nombre: "San Sebastián", tipo: "urbana", lat: -3.9965, lng: -79.2108 },
  { id: "sucre", nombre: "Sucre", tipo: "urbana", lat: -3.9860, lng: -79.2015 },
  { id: "valle", nombre: "Valle", tipo: "urbana", lat: -4.0102, lng: -79.2010 },
  { id: "malacatos", nombre: "Malacatos", tipo: "rural", lat: -4.2150, lng: -79.2580 },
  { id: "vilcabamba", nombre: "Vilcabamba", tipo: "rural", lat: -4.2620, lng: -79.2230 },
  { id: "quinara", nombre: "Quinara", tipo: "rural", lat: -4.3100, lng: -79.2300 },
  { id: "yangana", nombre: "Yangana", tipo: "rural", lat: -4.3670, lng: -79.1830 },
  { id: "san-pedro-vilcabamba", nombre: "San Pedro de Vilcabamba", tipo: "rural", lat: -4.2400, lng: -79.2100 },
  { id: "taquil", nombre: "Taquil", tipo: "rural", lat: -3.9170, lng: -79.3000 },
  { id: "chantaco", nombre: "Chantaco", tipo: "rural", lat: -3.9300, lng: -79.3200 },
  { id: "chuquiribamba", nombre: "Chuquiribamba", tipo: "rural", lat: -3.8470, lng: -79.3470 },
  { id: "gualel", nombre: "Gualel", tipo: "rural", lat: -3.7670, lng: -79.3670 },
  { id: "jimbilla", nombre: "Jimbilla", tipo: "rural", lat: -3.9700, lng: -79.1500 },
  { id: "el-cisne", nombre: "El Cisne", tipo: "rural", lat: -3.8500, lng: -79.4270 },
  { id: "santiago", nombre: "Santiago", tipo: "rural", lat: -3.8000, lng: -79.3000 },
  { id: "san-lucas", nombre: "San Lucas", tipo: "rural", lat: -3.7330, lng: -79.2670 }
];

CF.TIPOS_SUELO = [
  "Franco",
  "Franco-arcilloso",
  "Franco-arenoso",
  "Arcilloso",
  "Limoso",
  "Humífero andino",
  "Franco-limoso"
];

CF.EQUIPOS = [
  { id: "smartphone", label: "Smartphone", grupo: "servicio" },
  { id: "television", label: "Televisión", grupo: "servicio" },
  { id: "sanitario", label: "Sanitario", grupo: "servicio" },
  { id: "agua_natural", label: "Fuente de agua", grupo: "servicio" },
  { id: "internet", label: "Internet en casa", grupo: "servicio" },
  { id: "whatsapp", label: "WhatsApp", grupo: "servicio" },
  { id: "luz", label: "Energía eléctrica", grupo: "servicio" },
  { id: "computadora", label: "Computadora", grupo: "servicio" },
  { id: "tanque", label: "Tanque / tambor", grupo: "equipo" },
  { id: "agua_potable", label: "Agua potable (grifo)", grupo: "servicio" },
  { id: "motoguadana", label: "Motoguadaña", grupo: "equipo" },
  { id: "fumigadora", label: "Fumigadora", grupo: "equipo" },
  { id: "correo", label: "Correo electrónico", grupo: "servicio" },
  { id: "gas", label: "Cilindro de gas", grupo: "equipo" },
  { id: "estanteria", label: "Estantería / bodega", grupo: "equipo" },
  { id: "cuenta_bancaria", label: "Cuenta bancaria", grupo: "servicio" },
  { id: "auto", label: "Camioneta / auto de trabajo", grupo: "equipo" },
  { id: "manguera", label: "Manguera de riego", grupo: "equipo" },
  { id: "generador", label: "Generador eléctrico", grupo: "equipo" },
  { id: "invernadero", label: "Invernadero", grupo: "equipo" },
  { id: "tractor", label: "Tractor", grupo: "equipo" },
  { id: "motosierra", label: "Motosierra", grupo: "equipo" },
  { id: "pozo", label: "Pozo de agua", grupo: "equipo" },
  { id: "panel_solar", label: "Panel solar", grupo: "equipo" }
];

CF.PRODUCTOS = [
  { id: "p-cafe", tipo: "agricola", codigo: "CPC-01411", nombre: "Café arábigo", categoria: "Cultivos permanentes", color: "#6B3F2A" },
  { id: "p-cacao", tipo: "agricola", codigo: "CPC-01412", nombre: "Cacao fino de aroma", categoria: "Cultivos permanentes", color: "#4A2C1A" },
  { id: "p-maiz", tipo: "agricola", codigo: "CPC-01120", nombre: "Maíz suave", categoria: "Cereales", color: "#E8C547" },
  { id: "p-arroz", tipo: "agricola", codigo: "CPC-01140", nombre: "Arroz cáscara", categoria: "Cereales", color: "#F4E8C1" },
  { id: "p-frejol", tipo: "agricola", codigo: "CPC-01251", nombre: "Fréjol", categoria: "Legumbres", color: "#8B4513" },
  { id: "p-papa", tipo: "agricola", codigo: "CPC-01610", nombre: "Papa", categoria: "Tubérculos", color: "#C4A574" },
  { id: "p-yuca", tipo: "agricola", codigo: "CPC-01620", nombre: "Yuca", categoria: "Tubérculos", color: "#D4B896" },
  { id: "p-platano", tipo: "agricola", codigo: "CPC-01351", nombre: "Plátano", categoria: "Frutas tropicales", color: "#9ACD32" },
  { id: "p-aguacate", tipo: "agricola", codigo: "CPC-01356", nombre: "Aguacate Hass", categoria: "Frutas tropicales", color: "#3D6B3D" },
  { id: "p-mango", tipo: "agricola", codigo: "CPC-01355", nombre: "Mango Tommy", categoria: "Frutas tropicales", color: "#F4A300" },
  { id: "p-limon", tipo: "agricola", codigo: "CPC-01322", nombre: "Limón sutil", categoria: "Cítricos", color: "#C6D94E" },
  { id: "p-naranja", tipo: "agricola", codigo: "CPC-01321", nombre: "Naranja", categoria: "Cítricos", color: "#F08A24" },
  { id: "p-mandarina", tipo: "agricola", codigo: "CPC-01323", nombre: "Mandarina", categoria: "Cítricos", color: "#E07A3D" },
  { id: "p-mora", tipo: "agricola", codigo: "CPC-01361", nombre: "Mora de Castilla", categoria: "Frutas de clima frío", color: "#5B1A4A" },
  { id: "p-tomate-arbol", tipo: "agricola", codigo: "CPC-01362", nombre: "Tomate de árbol", categoria: "Frutas de clima frío", color: "#D4532A" },
  { id: "p-granadilla", tipo: "agricola", codigo: "CPC-01363", nombre: "Granadilla", categoria: "Frutas de clima frío", color: "#E8B84A" },
  { id: "p-tomate", tipo: "agricola", codigo: "CPC-01231", nombre: "Tomate riñón", categoria: "Hortalizas", color: "#C0392B" },
  { id: "p-cebolla", tipo: "agricola", codigo: "CPC-01232", nombre: "Cebolla colorada", categoria: "Hortalizas", color: "#A0522D" },
  { id: "p-pimiento", tipo: "agricola", codigo: "CPC-01234", nombre: "Pimiento", categoria: "Hortalizas", color: "#2E8B57" },
  { id: "p-cana", tipo: "agricola", codigo: "CPC-01801", nombre: "Caña de azúcar", categoria: "Cultivos industriales", color: "#7A9E4E" },
  { id: "p-hortensia", tipo: "agricola", codigo: "CPC-01911", nombre: "Hortensia", categoria: "Flores y ornamentales", color: "#4A7C59" },
  { id: "p-bovino", tipo: "pecuario", codigo: "CPC-02111", nombre: "Ganado bovino", categoria: "Pecuario", color: "#3A2A1A" },
  { id: "p-porcino", tipo: "pecuario", codigo: "CPC-02141", nombre: "Porcinos", categoria: "Pecuario", color: "#8B5A4A" },
  { id: "p-aves", tipo: "pecuario", codigo: "CPC-02151", nombre: "Aves de corral", categoria: "Pecuario", color: "#D4A017" },
  { id: "p-cuy", tipo: "pecuario", codigo: "CPC-02911", nombre: "Cuyes", categoria: "Pecuario", color: "#A67C52" },
  { id: "p-caprino", tipo: "pecuario", codigo: "CPC-02131", nombre: "Caprinos", categoria: "Pecuario", color: "#6B5344" },
  { id: "p-tilapia", tipo: "pecuario", codigo: "CPC-04111", nombre: "Tilapia", categoria: "Acuicultura", color: "#2A6F8F" }
];

CF.MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

function pickEquipos(ids) {
  return ids.slice();
}

CF.SEED = function () {
  const agricultores = [
    {
      id: "ag-1", role: "agricultor", nombre: "María Elena", apellido: "Cevallos",
      cedula: "1103456789", telefono: "0998123401", correo: "maria.cevallos@loja.ec",
      password: "loja2026", genero: "F", fechaNacimiento: "1978-04-12",
      parroquia: "vilcabamba", direccion: "Barrio Solanda, vía a Yamburara",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: true,
      tieneAuto: false, organizacionIds: ["org-1"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "computadora", "agua_potable", "correo", "cuenta_bancaria", "motoguadana", "fumigadora", "tanque"])
    },
    {
      id: "ag-2", role: "agricultor", nombre: "José Antonio", apellido: "Quito",
      cedula: "1104567890", telefono: "0987654321", correo: "jose.quito@loja.ec",
      password: "loja2026", genero: "M", fechaNacimiento: "1971-09-03",
      parroquia: "malacatos", direccion: "Sector Llano Lindo, km 18",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: true,
      tieneAuto: true, organizacionIds: ["org-2"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "agua_potable", "auto", "cuenta_bancaria", "fumigadora", "motoguadana", "manguera", "invernadero", "estanteria"])
    },
    {
      id: "ag-3", role: "agricultor", nombre: "Rosa Isabel", apellido: "Armijos",
      cedula: "1105678901", telefono: "0976543210", correo: "rosa.armijos@loja.ec",
      password: "loja2026", genero: "F", fechaNacimiento: "1985-01-22",
      parroquia: "san-lucas", direccion: "Comunidad El Tablón",
      tieneAguaPotable: false, tieneLuz: true, tieneInternet: false, tieneCuentaBancaria: false,
      tieneAuto: false, organizacionIds: ["org-4"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "whatsapp", "luz", "motoguadana", "gas"])
    },
    {
      id: "ag-4", role: "agricultor", nombre: "Pedro Pablo", apellido: "Jiménez",
      cedula: "1106789012", telefono: "0965432109", correo: "pedro.jimenez@loja.ec",
      password: "loja2026", genero: "M", fechaNacimiento: "1968-06-18",
      parroquia: "taquil", direccion: "Hacienda San Pedro, vía a Chantaco",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: true,
      tieneAuto: true, organizacionIds: ["org-3"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "computadora", "agua_potable", "auto", "cuenta_bancaria", "correo", "tanque", "estanteria", "generador"])
    },
    {
      id: "ag-5", role: "agricultor", nombre: "Carmen Lucía", apellido: "Paladines",
      cedula: "1107890123", telefono: "0954321098", correo: "carmen.paladines@loja.ec",
      password: "loja2026", genero: "F", fechaNacimiento: "1982-11-07",
      parroquia: "yangana", direccion: "Barrio La Vega",
      tieneAguaPotable: false, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: false,
      tieneAuto: false, organizacionIds: ["org-4"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "motoguadana", "fumigadora", "tanque"])
    },
    {
      id: "ag-6", role: "agricultor", nombre: "Luis Fernando", apellido: "Ochoa",
      cedula: "1108901234", telefono: "0943210987", correo: "luis.ochoa@loja.ec",
      password: "loja2026", genero: "M", fechaNacimiento: "1975-03-29",
      parroquia: "quinara", direccion: "Vía Quinara–Yangana, km 3",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: false, tieneCuentaBancaria: true,
      tieneAuto: true, organizacionIds: ["org-2"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "whatsapp", "luz", "agua_potable", "auto", "cuenta_bancaria", "motoguadana", "fumigadora"])
    },
    {
      id: "ag-7", role: "agricultor", nombre: "Ana Mercedes", apellido: "Castillo",
      cedula: "1109012345", telefono: "0932109876", correo: "ana.castillo@loja.ec",
      password: "loja2026", genero: "F", fechaNacimiento: "1990-08-14",
      parroquia: "valle", direccion: "Capulí, sector huertas periurbanas",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: true,
      tieneAuto: false, organizacionIds: ["org-4"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "computadora", "agua_potable", "correo", "cuenta_bancaria", "invernadero", "manguera", "fumigadora"])
    },
    {
      id: "ag-8", role: "agricultor", nombre: "Miguel Ángel", apellido: "Sarango",
      cedula: "1110123456", telefono: "0921098765", correo: "miguel.sarango@loja.ec",
      password: "loja2026", genero: "M", fechaNacimiento: "1979-12-01",
      parroquia: "jimbilla", direccion: "Comunidad San José de Jimbilla",
      tieneAguaPotable: false, tieneLuz: true, tieneInternet: false, tieneCuentaBancaria: false,
      tieneAuto: false, organizacionIds: [],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "whatsapp", "luz", "motoguadana", "gas"])
    },
    {
      id: "ag-9", role: "agricultor", nombre: "Gloria Esperanza", apellido: "Burneo",
      cedula: "1111234567", telefono: "0910987654", correo: "gloria.burneo@loja.ec",
      password: "loja2026", genero: "F", fechaNacimiento: "1965-05-20",
      parroquia: "chuquiribamba", direccion: "Centro parroquial, calle principal",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: true,
      tieneAuto: false, organizacionIds: ["org-3"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "agua_potable", "cuenta_bancaria", "tanque", "estanteria"])
    },
    {
      id: "ag-10", role: "agricultor", nombre: "Carlos Alberto", apellido: "Torres",
      cedula: "1112345678", telefono: "0991011121", correo: "carlos.torres@loja.ec",
      password: "loja2026", genero: "M", fechaNacimiento: "1988-02-11",
      parroquia: "malacatos", direccion: "Barrio El Tambo",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: false,
      tieneAuto: true, organizacionIds: ["org-2"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "agua_potable", "auto", "fumigadora", "invernadero", "manguera", "motoguadana"])
    },
    {
      id: "ag-11", role: "agricultor", nombre: "Patricia", apellido: "Guamán",
      cedula: "1113456789", telefono: "0982022232", correo: "patricia.guaman@loja.ec",
      password: "loja2026", genero: "F", fechaNacimiento: "1993-07-30",
      parroquia: "vilcabamba", direccion: "Yamburara bajo",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: true,
      tieneAuto: false, organizacionIds: ["org-1"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "computadora", "agua_potable", "correo", "cuenta_bancaria", "motoguadana"])
    },
    {
      id: "ag-12", role: "agricultor", nombre: "Héctor Manuel", apellido: "Ordóñez",
      cedula: "1114567890", telefono: "0973033343", correo: "hector.ordonez@loja.ec",
      password: "loja2026", genero: "M", fechaNacimiento: "1960-10-09",
      parroquia: "el-cisne", direccion: "Vía al santuario, km 2",
      tieneAguaPotable: false, tieneLuz: true, tieneInternet: false, tieneCuentaBancaria: false,
      tieneAuto: false, organizacionIds: [],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "luz", "whatsapp", "gas", "pozo"])
    },
    {
      id: "ag-13", role: "agricultor", nombre: "Diana Carolina", apellido: "Morocho",
      cedula: "1115678901", telefono: "0964044454", correo: "diana.morocho@loja.ec",
      password: "loja2026", genero: "F", fechaNacimiento: "1996-03-05",
      parroquia: "gualel", direccion: "Comunidad San Antonio de Gualel",
      tieneAguaPotable: false, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: false,
      tieneAuto: false, organizacionIds: ["org-4"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "motoguadana", "panel_solar"])
    },
    {
      id: "ag-14", role: "agricultor", nombre: "Roberto", apellido: "Cueva",
      cedula: "1116789012", telefono: "0955055565", correo: "roberto.cueva@loja.ec",
      password: "loja2026", genero: "M", fechaNacimiento: "1973-08-21",
      parroquia: "santiago", direccion: "Hacienda El Rosal",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: true,
      tieneAuto: true, organizacionIds: ["org-3"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "computadora", "agua_potable", "auto", "cuenta_bancaria", "correo", "tractor", "generador", "estanteria", "tanque"])
    },
    {
      id: "ag-15", role: "agricultor", nombre: "Lucía Fernanda", apellido: "Pineda",
      cedula: "1117890123", telefono: "0946066676", correo: "lucia.pineda@loja.ec",
      password: "loja2026", genero: "F", fechaNacimiento: "1987-12-16",
      parroquia: "chantaco", direccion: "Barrio La Esperanza",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: false, tieneCuentaBancaria: true,
      tieneAuto: false, organizacionIds: ["org-3"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "whatsapp", "luz", "agua_potable", "cuenta_bancaria", "fumigadora", "tanque"])
    },
    {
      id: "ag-16", role: "agricultor", nombre: "Jorge Luis", apellido: "Vivanco",
      cedula: "1118901234", telefono: "0937077787", correo: "jorge.vivanco@loja.ec",
      password: "loja2026", genero: "M", fechaNacimiento: "1981-04-02",
      parroquia: "san-pedro-vilcabamba", direccion: "Sector Rumishitana",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: false,
      tieneAuto: true, organizacionIds: ["org-1"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "agua_potable", "auto", "motoguadana", "motosierra", "fumigadora"])
    },
    {
      id: "ag-17", role: "agricultor", nombre: "Elena", apellido: "Zhagñay",
      cedula: "1119012345", telefono: "0928088898", correo: "elena.zhagnay@loja.ec",
      password: "loja2026", genero: "F", fechaNacimiento: "1991-09-25",
      parroquia: "sucre", direccion: "Zona periurbana, vía a Jipiro",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: true,
      tieneAuto: false, organizacionIds: ["org-4"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "computadora", "agua_potable", "correo", "cuenta_bancaria", "invernadero", "manguera"])
    },
    {
      id: "ag-18", role: "agricultor", nombre: "Manuel", apellido: "Ramón",
      cedula: "1120123456", telefono: "0919099909", correo: "manuel.ramon@loja.ec",
      password: "loja2026", genero: "M", fechaNacimiento: "1958-01-08",
      parroquia: "san-lucas", direccion: "Comunidad Loma de Oro",
      tieneAguaPotable: false, tieneLuz: false, tieneInternet: false, tieneCuentaBancaria: false,
      tieneAuto: false, organizacionIds: [],
      equipos: pickEquipos(["smartphone", "agua_natural", "whatsapp", "gas", "pozo"])
    },
    {
      id: "ag-19", role: "agricultor", nombre: "Silvia", apellido: "Aguilar",
      cedula: "1121234567", telefono: "0991112233", correo: "silvia.aguilar@loja.ec",
      password: "loja2026", genero: "F", fechaNacimiento: "1984-06-13",
      parroquia: "vilcabamba", direccion: "Barrio Cucanamá",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: true,
      tieneAuto: false, organizacionIds: ["org-1"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "agua_potable", "correo", "cuenta_bancaria", "motoguadana", "estanteria"])
    },
    {
      id: "ag-20", role: "agricultor", nombre: "Andrés", apellido: "Celi",
      cedula: "1122345678", telefono: "0982223344", correo: "andres.celi@loja.ec",
      password: "loja2026", genero: "M", fechaNacimiento: "1994-11-19",
      parroquia: "malacatos", direccion: "Sector La Era",
      tieneAguaPotable: true, tieneLuz: true, tieneInternet: true, tieneCuentaBancaria: true,
      tieneAuto: true, organizacionIds: ["org-2"],
      equipos: pickEquipos(["smartphone", "television", "sanitario", "agua_natural", "internet", "whatsapp", "luz", "computadora", "agua_potable", "auto", "cuenta_bancaria", "correo", "invernadero", "fumigadora", "manguera", "tanque"])
    }
  ];

  const compradores = [
    {
      id: "co-1", role: "comprador", nombre: "Alejandra", apellido: "Mora",
      cedula: "1101112233", telefono: "072570101", correo: "compras@mercado-loja.ec",
      password: "loja2026", empresa: "Mercado Centro Comercial Loja", ruc: "1100123456001",
      direccion: "Av. Isidro Ayora y Salvador Bustamante", tipo: "Mayorista", parroquia: "sucre"
    },
    {
      id: "co-2", role: "comprador", nombre: "Diego", apellido: "Valdivieso",
      cedula: "1102223344", telefono: "072580202", correo: "abastecimiento@hospital-loja.ec",
      password: "loja2026", empresa: "Hospital UTPL — Abastecimiento", ruc: "1100234567001",
      direccion: "San Cayetano Alto", tipo: "Institucional", parroquia: "san-sebastian"
    },
    {
      id: "co-3", role: "comprador", nombre: "Karina", apellido: "Benítez",
      cedula: "1103334455", telefono: "0993344556", correo: "karina@tierraviva.ec",
      password: "loja2026", empresa: "Tierra Viva Alimentos", ruc: "1100345678001",
      direccion: "Calle Bolívar 12-40", tipo: "Retail", parroquia: "el-sagrario"
    },
    {
      id: "co-4", role: "comprador", nombre: "Felipe", apellido: "Reyes",
      cedula: "1104445566", telefono: "072590303", correo: "felipe.reyes@exportacafe.ec",
      password: "loja2026", empresa: "ExportaCafé Loja", ruc: "1100456789001",
      direccion: "Parque industrial, vía a Catamayo", tipo: "Exportador", parroquia: "valle"
    },
    {
      id: "co-5", role: "comprador", nombre: "Mónica", apellido: "Salinas",
      cedula: "1105556677", telefono: "0984455667", correo: "monica@canasta-loja.ec",
      password: "loja2026", empresa: "Canasta Campesina Loja", ruc: "1100567890001",
      direccion: "Mercado Mayorista, Av. 8 de Diciembre", tipo: "Mayorista", parroquia: "valle"
    }
  ];

  const organizaciones = [
    {
      id: "org-1", role: "organizacion", nombre: "Asociación de Caficultores de Vilcabamba",
      ruc: "1190123456001", telefono: "072580111", correo: "contacto@cafivilcabamba.ec",
      password: "loja2026", parroquia: "vilcabamba",
      direccion: "Centro parroquial de Vilcabamba",
      descripcion: "Productores de café arábigo de altura de Vilcabamba y San Pedro de Vilcabamba."
    },
    {
      id: "org-2", role: "organizacion", nombre: "Cooperativa Agropecuaria Malacatos",
      ruc: "1190234567001", telefono: "072580222", correo: "info@coopmalacatos.ec",
      password: "loja2026", parroquia: "malacatos",
      direccion: "Parque central de Malacatos",
      descripcion: "Aguacate Hass, hortalizas y caña de las parroquias del valle sur."
    },
    {
      id: "org-3", role: "organizacion", nombre: "Asociación de Ganaderos del Norte de Loja",
      ruc: "1190345678001", telefono: "072580333", correo: "ganaderos@norte-loja.ec",
      password: "loja2026", parroquia: "taquil",
      direccion: "Casa comunal de Taquil",
      descripcion: "Ganadería de leche y carne en Taquil, Chantaco, Chuquiribamba y Santiago."
    },
    {
      id: "org-4", role: "organizacion", nombre: "Red de Productores Agroecológicos de Loja",
      ruc: "1190456789001", telefono: "072580444", correo: "red@agroecologica-loja.ec",
      password: "loja2026", parroquia: "valle",
      direccion: "Casa de la Agricultura, Av. Orillas del Zamora",
      descripcion: "Hortalizas, frutales andinos y mercados de circuito corto."
    }
  ];

  const fincas = [
    {
      id: "fi-1", agricultorId: "ag-1", nombre: "Finca El Cafetal",
      parroquia: "vilcabamba", direccion: "Yamburara, 1.200 m s.n.m.",
      lat: -4.2582, lng: -79.2185, hectareas: 6.5,
      espacios: [
        { id: "es-1a", nombre: "Lote alto", hectareas: 4.0, tipoSuelo: "Franco-arenoso", productoId: "p-cafe" },
        { id: "es-1b", nombre: "Lote de sombra", hectareas: 2.5, tipoSuelo: "Humífero andino", productoId: "p-platano" }
      ]
    },
    {
      id: "fi-2", agricultorId: "ag-2", nombre: "Finca Llano Lindo",
      parroquia: "malacatos", direccion: "Llano Lindo, km 18 vía Vilcabamba",
      lat: -4.1980, lng: -79.2510, hectareas: 4.0,
      espacios: [
        { id: "es-2a", nombre: "Huerta principal", hectareas: 3.2, tipoSuelo: "Franco", productoId: "p-aguacate" },
        { id: "es-2b", nombre: "Borde de quebrada", hectareas: 0.8, tipoSuelo: "Franco-limoso", productoId: "p-limon" }
      ]
    },
    {
      id: "fi-3", agricultorId: "ag-2", nombre: "Huerta El Tambo",
      parroquia: "malacatos", direccion: "Barrio El Tambo",
      lat: -4.2210, lng: -79.2620, hectareas: 1.2,
      espacios: [
        { id: "es-3a", nombre: "Invernadero 1", hectareas: 1.2, tipoSuelo: "Franco-arcilloso", productoId: "p-tomate" }
      ]
    },
    {
      id: "fi-4", agricultorId: "ag-3", nombre: "Chacra El Tablón",
      parroquia: "san-lucas", direccion: "Comunidad El Tablón",
      lat: -3.7400, lng: -79.2600, hectareas: 3.8,
      espacios: [
        { id: "es-4a", nombre: "Maizal", hectareas: 2.5, tipoSuelo: "Franco-arcilloso", productoId: "p-maiz" },
        { id: "es-4b", nombre: "Fréjol intercalado", hectareas: 1.3, tipoSuelo: "Franco", productoId: "p-frejol" }
      ]
    },
    {
      id: "fi-5", agricultorId: "ag-4", nombre: "Hacienda San Pedro",
      parroquia: "taquil", direccion: "Vía a Chantaco",
      lat: -3.9120, lng: -79.3050, hectareas: 28.0,
      espacios: [
        { id: "es-5a", nombre: "Potrero norte", hectareas: 18.0, tipoSuelo: "Franco-arcilloso", productoId: "p-bovino" },
        { id: "es-5b", nombre: "Potrero sur", hectareas: 10.0, tipoSuelo: "Franco", productoId: "p-bovino" }
      ]
    },
    {
      id: "fi-6", agricultorId: "ag-5", nombre: "Finca La Vega",
      parroquia: "yangana", direccion: "Barrio La Vega",
      lat: -4.3600, lng: -79.1780, hectareas: 2.4,
      espacios: [
        { id: "es-6a", nombre: "Matorral de mora", hectareas: 1.6, tipoSuelo: "Humífero andino", productoId: "p-mora" },
        { id: "es-6b", nombre: "Tomate de árbol", hectareas: 0.8, tipoSuelo: "Franco-arenoso", productoId: "p-tomate-arbol" }
      ]
    },
    {
      id: "fi-7", agricultorId: "ag-6", nombre: "Cañaveral Quinara",
      parroquia: "quinara", direccion: "Vía Quinara–Yangana",
      lat: -4.3050, lng: -79.2260, hectareas: 8.0,
      espacios: [
        { id: "es-7a", nombre: "Cañaveral", hectareas: 8.0, tipoSuelo: "Franco-limoso", productoId: "p-cana" }
      ]
    },
    {
      id: "fi-8", agricultorId: "ag-7", nombre: "Huertas de Capulí",
      parroquia: "valle", direccion: "Capulí periurbano",
      lat: -4.0180, lng: -79.1980, hectareas: 0.6,
      espacios: [
        { id: "es-8a", nombre: "Invernadero A", hectareas: 0.4, tipoSuelo: "Franco", productoId: "p-pimiento" },
        { id: "es-8b", nombre: "Cama de hortalizas", hectareas: 0.2, tipoSuelo: "Franco", productoId: "p-cebolla" }
      ]
    },
    {
      id: "fi-9", agricultorId: "ag-8", nombre: "Finca San José",
      parroquia: "jimbilla", direccion: "Comunidad San José",
      lat: -3.9680, lng: -79.1450, hectareas: 5.0,
      espacios: [
        { id: "es-9a", nombre: "Platanal", hectareas: 3.5, tipoSuelo: "Franco-arcilloso", productoId: "p-platano" },
        { id: "es-9b", nombre: "Yuca", hectareas: 1.5, tipoSuelo: "Franco-arenoso", productoId: "p-yuca" }
      ]
    },
    {
      id: "fi-10", agricultorId: "ag-9", nombre: "Crianza Chuquiribamba",
      parroquia: "chuquiribamba", direccion: "Centro parroquial",
      lat: -3.8490, lng: -79.3440, hectareas: 1.8,
      espacios: [
        { id: "es-10a", nombre: "Galpón de cuyes", hectareas: 0.4, tipoSuelo: "Franco", productoId: "p-cuy" },
        { id: "es-10b", nombre: "Alfalfa y maíz forrajero", hectareas: 1.4, tipoSuelo: "Franco-arcilloso", productoId: "p-maiz" }
      ]
    },
    {
      id: "fi-11", agricultorId: "ag-10", nombre: "Invernaderos El Tambo",
      parroquia: "malacatos", direccion: "Barrio El Tambo",
      lat: -4.2240, lng: -79.2590, hectareas: 1.5,
      espacios: [
        { id: "es-11a", nombre: "Tomate riñón", hectareas: 1.5, tipoSuelo: "Franco", productoId: "p-tomate" }
      ]
    },
    {
      id: "fi-12", agricultorId: "ag-11", nombre: "Cafetal Yamburara",
      parroquia: "vilcabamba", direccion: "Yamburara bajo",
      lat: -4.2550, lng: -79.2140, hectareas: 3.2,
      espacios: [
        { id: "es-12a", nombre: "Café de sombra", hectareas: 3.2, tipoSuelo: "Humífero andino", productoId: "p-cafe" }
      ]
    },
    {
      id: "fi-13", agricultorId: "ag-12", nombre: "Finca El Santuario",
      parroquia: "el-cisne", direccion: "Vía al santuario",
      lat: -3.8520, lng: -79.4200, hectareas: 4.5,
      espacios: [
        { id: "es-13a", nombre: "Papa de altura", hectareas: 2.5, tipoSuelo: "Humífero andino", productoId: "p-papa" },
        { id: "es-13b", nombre: "Hortensia", hectareas: 2.0, tipoSuelo: "Franco-arenoso", productoId: "p-hortensia" }
      ]
    },
    {
      id: "fi-14", agricultorId: "ag-13", nombre: "Chacra San Antonio",
      parroquia: "gualel", direccion: "San Antonio de Gualel",
      lat: -3.7700, lng: -79.3620, hectareas: 2.0,
      espacios: [
        { id: "es-14a", nombre: "Maíz y fréjol", hectareas: 2.0, tipoSuelo: "Franco-arcilloso", productoId: "p-maiz" }
      ]
    },
    {
      id: "fi-15", agricultorId: "ag-14", nombre: "Hacienda El Rosal",
      parroquia: "santiago", direccion: "Hacienda El Rosal",
      lat: -3.8050, lng: -79.2980, hectareas: 42.0,
      espacios: [
        { id: "es-15a", nombre: "Ganadería", hectareas: 36.0, tipoSuelo: "Franco", productoId: "p-bovino" },
        { id: "es-15b", nombre: "Porcinos", hectareas: 6.0, tipoSuelo: "Franco-arcilloso", productoId: "p-porcino" }
      ]
    },
    {
      id: "fi-16", agricultorId: "ag-15", nombre: "Finca La Esperanza",
      parroquia: "chantaco", direccion: "Barrio La Esperanza",
      lat: -3.9280, lng: -79.3180, hectareas: 7.0,
      espacios: [
        { id: "es-16a", nombre: "Caprinos", hectareas: 7.0, tipoSuelo: "Franco-arenoso", productoId: "p-caprino" }
      ]
    },
    {
      id: "fi-17", agricultorId: "ag-16", nombre: "Finca Rumishitana",
      parroquia: "san-pedro-vilcabamba", direccion: "Sector Rumishitana",
      lat: -4.2380, lng: -79.2080, hectareas: 5.5,
      espacios: [
        { id: "es-17a", nombre: "Cacao", hectareas: 3.0, tipoSuelo: "Franco", productoId: "p-cacao" },
        { id: "es-17b", nombre: "Mango", hectareas: 2.5, tipoSuelo: "Franco-arenoso", productoId: "p-mango" }
      ]
    },
    {
      id: "fi-18", agricultorId: "ag-17", nombre: "Huerta Jipiro",
      parroquia: "sucre", direccion: "Vía a Jipiro",
      lat: -3.9800, lng: -79.1980, hectareas: 0.4,
      espacios: [
        { id: "es-18a", nombre: "Hortalizas periurbanas", hectareas: 0.4, tipoSuelo: "Franco", productoId: "p-pimiento" }
      ]
    },
    {
      id: "fi-19", agricultorId: "ag-18", nombre: "Chacra Loma de Oro",
      parroquia: "san-lucas", direccion: "Loma de Oro",
      lat: -3.7280, lng: -79.2720, hectareas: 2.8,
      espacios: [
        { id: "es-19a", nombre: "Papa", hectareas: 1.5, tipoSuelo: "Humífero andino", productoId: "p-papa" },
        { id: "es-19b", nombre: "Aves de patio", hectareas: 1.3, tipoSuelo: "Franco", productoId: "p-aves" }
      ]
    },
    {
      id: "fi-20", agricultorId: "ag-19", nombre: "Finca Cucanamá",
      parroquia: "vilcabamba", direccion: "Barrio Cucanamá",
      lat: -4.2680, lng: -79.2290, hectareas: 4.8,
      espacios: [
        { id: "es-20a", nombre: "Café", hectareas: 3.0, tipoSuelo: "Franco-arenoso", productoId: "p-cafe" },
        { id: "es-20b", nombre: "Naranja", hectareas: 1.8, tipoSuelo: "Franco", productoId: "p-naranja" }
      ]
    },
    {
      id: "fi-21", agricultorId: "ag-20", nombre: "Finca La Era",
      parroquia: "malacatos", direccion: "Sector La Era",
      lat: -4.2080, lng: -79.2480, hectareas: 2.2,
      espacios: [
        { id: "es-21a", nombre: "Aguacate Hass", hectareas: 1.4, tipoSuelo: "Franco", productoId: "p-aguacate" },
        { id: "es-21b", nombre: "Limón", hectareas: 0.8, tipoSuelo: "Franco-arenoso", productoId: "p-limon" }
      ]
    },
    {
      id: "fi-22", agricultorId: "ag-4", nombre: "Potrero Chantaco",
      parroquia: "chantaco", direccion: "Límite Taquil–Chantaco",
      lat: -3.9220, lng: -79.3120, hectareas: 12.0,
      espacios: [
        { id: "es-22a", nombre: "Ganado de engorde", hectareas: 12.0, tipoSuelo: "Franco-arcilloso", productoId: "p-bovino" }
      ]
    }
  ];

  const producciones = [
    {
      id: "pr-1", fincaId: "fi-2", agricultorId: "ag-2", productoId: "p-aguacate",
      terrenoProduccion: 3.2, unidadTerreno: "hectáreas", cantidadPlantulas: 40,
      ciclo: "Convencional", entrega: "Diario", visibilidad: "Pública",
      fechaSiembraInicio: "2017-01-04", fechaSiembraFin: "2017-01-20",
      fechaInicioProduccion: "2018-04-03", fechaFinProduccion: "2028-07-25",
      mesesCosecha: ["Octubre", "Noviembre", "Diciembre"],
      eventos: [{ fecha: "2026-10-25", titulo: "Cosecha Hass" }]
    },
    {
      id: "pr-2", fincaId: "fi-1", agricultorId: "ag-1", productoId: "p-cafe",
      terrenoProduccion: 4.0, unidadTerreno: "hectáreas", cantidadPlantulas: 3200,
      ciclo: "Orgánico", entrega: "Por cosecha", visibilidad: "Pública",
      fechaSiembraInicio: "2019-03-10", fechaSiembraFin: "2019-04-15",
      fechaInicioProduccion: "2021-06-01", fechaFinProduccion: "2031-06-01",
      mesesCosecha: ["Junio", "Julio", "Agosto", "Septiembre"],
      eventos: [{ fecha: "2026-06-15", titulo: "Inicio cosecha" }]
    },
    {
      id: "pr-3", fincaId: "fi-4", agricultorId: "ag-3", productoId: "p-maiz",
      terrenoProduccion: 2.5, unidadTerreno: "hectáreas", cantidadPlantulas: 0,
      ciclo: "Agroecológico", entrega: "Por cosecha", visibilidad: "Pública",
      fechaSiembraInicio: "2026-09-01", fechaSiembraFin: "2026-09-20",
      fechaInicioProduccion: "2026-12-10", fechaFinProduccion: "2027-01-15",
      mesesCosecha: ["Diciembre", "Enero"],
      eventos: [{ fecha: "2026-09-05", titulo: "Siembra" }]
    },
    {
      id: "pr-4", fincaId: "fi-5", agricultorId: "ag-4", productoId: "p-bovino",
      terrenoProduccion: 28.0, unidadTerreno: "hectáreas", cantidadPlantulas: 0,
      ciclo: "Convencional", entrega: "Semanal", visibilidad: "Pública",
      fechaSiembraInicio: "2015-01-01", fechaSiembraFin: "2015-01-01",
      fechaInicioProduccion: "2015-06-01", fechaFinProduccion: "2035-12-31",
      mesesCosecha: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      eventos: []
    },
    {
      id: "pr-5", fincaId: "fi-6", agricultorId: "ag-5", productoId: "p-mora",
      terrenoProduccion: 1.6, unidadTerreno: "hectáreas", cantidadPlantulas: 800,
      ciclo: "Orgánico", entrega: "Semanal", visibilidad: "Pública",
      fechaSiembraInicio: "2023-02-01", fechaSiembraFin: "2023-02-28",
      fechaInicioProduccion: "2024-01-15", fechaFinProduccion: "2029-12-31",
      mesesCosecha: ["Enero", "Febrero", "Marzo", "Abril", "Noviembre", "Diciembre"],
      eventos: [{ fecha: "2026-11-10", titulo: "Pico de cosecha" }]
    },
    {
      id: "pr-6", fincaId: "fi-7", agricultorId: "ag-6", productoId: "p-cana",
      terrenoProduccion: 8.0, unidadTerreno: "hectáreas", cantidadPlantulas: 0,
      ciclo: "Convencional", entrega: "Por cosecha", visibilidad: "Pública",
      fechaSiembraInicio: "2022-05-01", fechaSiembraFin: "2022-06-15",
      fechaInicioProduccion: "2023-08-01", fechaFinProduccion: "2027-08-01",
      mesesCosecha: ["Julio", "Agosto", "Septiembre"],
      eventos: []
    },
    {
      id: "pr-7", fincaId: "fi-11", agricultorId: "ag-10", productoId: "p-tomate",
      terrenoProduccion: 1.5, unidadTerreno: "hectáreas", cantidadPlantulas: 4500,
      ciclo: "Convencional", entrega: "Diario", visibilidad: "Pública",
      fechaSiembraInicio: "2026-08-01", fechaSiembraFin: "2026-08-20",
      fechaInicioProduccion: "2026-10-15", fechaFinProduccion: "2027-02-28",
      mesesCosecha: ["Octubre", "Noviembre", "Diciembre", "Enero", "Febrero"],
      eventos: [{ fecha: "2026-10-15", titulo: "Primera cosecha" }]
    },
    {
      id: "pr-8", fincaId: "fi-12", agricultorId: "ag-11", productoId: "p-cafe",
      terrenoProduccion: 3.2, unidadTerreno: "hectáreas", cantidadPlantulas: 2500,
      ciclo: "Orgánico", entrega: "Por cosecha", visibilidad: "Pública",
      fechaSiembraInicio: "2020-04-01", fechaSiembraFin: "2020-05-10",
      fechaInicioProduccion: "2022-06-01", fechaFinProduccion: "2032-06-01",
      mesesCosecha: ["Junio", "Julio", "Agosto"],
      eventos: []
    },
    {
      id: "pr-9", fincaId: "fi-13", agricultorId: "ag-12", productoId: "p-papa",
      terrenoProduccion: 2.5, unidadTerreno: "hectáreas", cantidadPlantulas: 0,
      ciclo: "Convencional", entrega: "Por cosecha", visibilidad: "Pública",
      fechaSiembraInicio: "2026-09-15", fechaSiembraFin: "2026-10-05",
      fechaInicioProduccion: "2027-01-20", fechaFinProduccion: "2027-03-15",
      mesesCosecha: ["Enero", "Febrero", "Marzo"],
      eventos: []
    },
    {
      id: "pr-10", fincaId: "fi-15", agricultorId: "ag-14", productoId: "p-bovino",
      terrenoProduccion: 36.0, unidadTerreno: "hectáreas", cantidadPlantulas: 0,
      ciclo: "Convencional", entrega: "Semanal", visibilidad: "Pública",
      fechaSiembraInicio: "2010-01-01", fechaSiembraFin: "2010-01-01",
      fechaInicioProduccion: "2010-06-01", fechaFinProduccion: "2040-12-31",
      mesesCosecha: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      eventos: []
    },
    {
      id: "pr-11", fincaId: "fi-17", agricultorId: "ag-16", productoId: "p-cacao",
      terrenoProduccion: 3.0, unidadTerreno: "hectáreas", cantidadPlantulas: 1800,
      ciclo: "Orgánico", entrega: "Por cosecha", visibilidad: "Pública",
      fechaSiembraInicio: "2018-11-01", fechaSiembraFin: "2018-12-15",
      fechaInicioProduccion: "2022-04-01", fechaFinProduccion: "2038-04-01",
      mesesCosecha: ["Abril", "Mayo", "Octubre", "Noviembre"],
      eventos: []
    },
    {
      id: "pr-12", fincaId: "fi-9", agricultorId: "ag-8", productoId: "p-platano",
      terrenoProduccion: 3.5, unidadTerreno: "hectáreas", cantidadPlantulas: 700,
      ciclo: "Convencional", entrega: "Semanal", visibilidad: "Pública",
      fechaSiembraInicio: "2021-03-01", fechaSiembraFin: "2021-04-01",
      fechaInicioProduccion: "2022-03-01", fechaFinProduccion: "2028-03-01",
      mesesCosecha: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      eventos: []
    },
    {
      id: "pr-13", fincaId: "fi-10", agricultorId: "ag-9", productoId: "p-cuy",
      terrenoProduccion: 0.4, unidadTerreno: "hectáreas", cantidadPlantulas: 0,
      ciclo: "Convencional", entrega: "Semanal", visibilidad: "Pública",
      fechaSiembraInicio: "2024-01-10", fechaSiembraFin: "2024-01-10",
      fechaInicioProduccion: "2024-04-01", fechaFinProduccion: "2030-12-31",
      mesesCosecha: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      eventos: []
    },
    {
      id: "pr-14", fincaId: "fi-8", agricultorId: "ag-7", productoId: "p-pimiento",
      terrenoProduccion: 0.4, unidadTerreno: "hectáreas", cantidadPlantulas: 1200,
      ciclo: "Agroecológico", entrega: "Diario", visibilidad: "Pública",
      fechaSiembraInicio: "2026-08-10", fechaSiembraFin: "2026-08-25",
      fechaInicioProduccion: "2026-10-20", fechaFinProduccion: "2027-01-31",
      mesesCosecha: ["Octubre", "Noviembre", "Diciembre", "Enero"],
      eventos: []
    },
    {
      id: "pr-15", fincaId: "fi-21", agricultorId: "ag-20", productoId: "p-aguacate",
      terrenoProduccion: 1.4, unidadTerreno: "hectáreas", cantidadPlantulas: 22,
      ciclo: "Convencional", entrega: "Semanal", visibilidad: "Pública",
      fechaSiembraInicio: "2020-02-01", fechaSiembraFin: "2020-02-20",
      fechaInicioProduccion: "2022-05-01", fechaFinProduccion: "2032-05-01",
      mesesCosecha: ["Octubre", "Noviembre", "Diciembre"],
      eventos: []
    },
    {
      id: "pr-16", fincaId: "fi-20", agricultorId: "ag-19", productoId: "p-cafe",
      terrenoProduccion: 3.0, unidadTerreno: "hectáreas", cantidadPlantulas: 2100,
      ciclo: "Orgánico", entrega: "Por cosecha", visibilidad: "Pública",
      fechaSiembraInicio: "2018-03-01", fechaSiembraFin: "2018-04-10",
      fechaInicioProduccion: "2020-06-01", fechaFinProduccion: "2030-06-01",
      mesesCosecha: ["Junio", "Julio", "Agosto", "Septiembre"],
      eventos: []
    }
  ];

  const demandas = [
    { id: "de-1", compradorId: "co-1", productoId: "p-tomate", cantidad: 800, unidad: "kg/semana", fechaNecesidad: "2026-10-01", notas: "Tomate riñón de primera para plaza mayorista.", estado: "Abierta" },
    { id: "de-2", compradorId: "co-4", productoId: "p-cafe", cantidad: 12000, unidad: "kg/cosecha", fechaNecesidad: "2026-08-15", notas: "Café pergamino seco, taza 84+, Vilcabamba.", estado: "Abierta" },
    { id: "de-3", compradorId: "co-2", productoId: "p-pimiento", cantidad: 200, unidad: "kg/semana", fechaNecesidad: "2026-09-20", notas: "Abastecimiento de cocina institucional.", estado: "Abierta" },
    { id: "de-4", compradorId: "co-5", productoId: "p-mora", cantidad: 150, unidad: "kg/semana", fechaNecesidad: "2026-11-01", notas: "Mora de Castilla para canastas campesinas.", estado: "Abierta" },
    { id: "de-5", compradorId: "co-3", productoId: "p-aguacate", cantidad: 400, unidad: "kg/semana", fechaNecesidad: "2026-10-10", notas: "Hass calibre 14–16.", estado: "Abierta" }
  ];

  return { agricultores, compradores, organizaciones, fincas, producciones, demandas };
};
