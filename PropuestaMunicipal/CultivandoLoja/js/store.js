/**
 * Almacén local (localStorage). Sin backend ni base de datos.
 */
window.CF = window.CF || {};

CF.KEYS = {
  DB: "cf_loja_db_v1",
  SESSION: "cf_loja_session_v1"
};

CF.uid = function (prefix) {
  return prefix + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
};

CF.loadDB = function () {
  try {
    const raw = localStorage.getItem(CF.KEYS.DB);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* seed */ }
  const seed = CF.SEED();
  CF.saveDB(seed);
  return seed;
};

CF.saveDB = function (db) {
  localStorage.setItem(CF.KEYS.DB, JSON.stringify(db));
};

CF.resetDB = function () {
  localStorage.removeItem(CF.KEYS.DB);
  return CF.loadDB();
};

CF.getSession = function () {
  try {
    return JSON.parse(localStorage.getItem(CF.KEYS.SESSION) || "null");
  } catch (e) {
    return null;
  }
};

CF.setSession = function (user) {
  if (!user) {
    localStorage.removeItem(CF.KEYS.SESSION);
    return;
  }
  localStorage.setItem(CF.KEYS.SESSION, JSON.stringify({
    id: user.id,
    role: user.role,
    correo: user.correo,
    nombre: user.nombre,
    apellido: user.apellido || ""
  }));
};

CF.currentUser = function () {
  const session = CF.getSession();
  if (!session) return null;
  const db = CF.loadDB();
  const pools = {
    agricultor: db.agricultores,
    comprador: db.compradores,
    organizacion: db.organizaciones
  };
  const list = pools[session.role] || [];
  return list.find((u) => u.id === session.id) || null;
};

CF.login = function (correo, password) {
  const db = CF.loadDB();
  const all = db.agricultores.concat(db.compradores, db.organizaciones);
  const user = all.find((u) => u.correo.toLowerCase() === correo.toLowerCase() && u.password === password);
  if (!user) return null;
  CF.setSession(user);
  return user;
};

CF.logout = function () {
  CF.setSession(null);
};

CF.parroquia = function (id) {
  return CF.PARROQUIAS.find((p) => p.id === id) || { id: id, nombre: id || "—", tipo: "" };
};

CF.producto = function (id) {
  return CF.PRODUCTOS.find((p) => p.id === id) || { id: id, nombre: "Producto", codigo: "—", tipo: "agricola", color: "#888" };
};

CF.nombreCompleto = function (persona) {
  if (!persona) return "—";
  if (persona.role === "organizacion") return persona.nombre;
  return ((persona.nombre || "") + " " + (persona.apellido || "")).trim();
};

CF.iniciales = function (persona) {
  if (!persona) return "?";
  if (persona.role === "organizacion") return persona.nombre.slice(0, 2).toUpperCase();
  return ((persona.nombre || " ").charAt(0) + (persona.apellido || " ").charAt(0)).toUpperCase();
};

CF.fincasDe = function (agricultorId) {
  return CF.loadDB().fincas.filter((f) => f.agricultorId === agricultorId);
};

CF.produccionesDe = function (agricultorId) {
  return CF.loadDB().producciones.filter((p) => p.agricultorId === agricultorId);
};

CF.miembrosDe = function (orgId) {
  return CF.loadDB().agricultores.filter((a) => (a.organizacionIds || []).indexOf(orgId) !== -1);
};

CF.hectareasTotales = function () {
  return CF.loadDB().fincas.reduce((s, f) => s + Number(f.hectareas || 0), 0);
};

CF.hectareasPorTipo = function () {
  const db = CF.loadDB();
  let agricola = 0;
  let pecuario = 0;
  db.fincas.forEach((f) => {
    (f.espacios || []).forEach((e) => {
      const p = CF.producto(e.productoId);
      if (p.tipo === "pecuario") pecuario += Number(e.hectareas || 0);
      else agricola += Number(e.hectareas || 0);
    });
  });
  return { agricola, pecuario };
};

CF.productosEnProduccion = function () {
  const db = CF.loadDB();
  const map = {};
  db.producciones.forEach((pr) => {
    const prod = CF.producto(pr.productoId);
    if (!map[prod.id]) {
      map[prod.id] = { id: prod.id, nombre: prod.nombre, tipo: prod.tipo, codigo: prod.codigo, color: prod.color, value: 0 };
    }
    map[prod.id].value += Number(pr.terrenoProduccion || 0);
  });
  return Object.keys(map).map((k) => map[k]).sort((a, b) => b.value - a.value);
};

CF.itemsProductores = function () {
  const ags = CF.loadDB().agricultores;
  const n = ags.length || 1;
  const flags = {
    smartphone: (a) => a.equipos.indexOf("smartphone") !== -1,
    television: (a) => a.equipos.indexOf("television") !== -1,
    sanitario: (a) => a.equipos.indexOf("sanitario") !== -1,
    agua_natural: (a) => a.equipos.indexOf("agua_natural") !== -1,
    internet: (a) => a.tieneInternet || a.equipos.indexOf("internet") !== -1,
    whatsapp: (a) => a.equipos.indexOf("whatsapp") !== -1,
    luz: (a) => a.tieneLuz || a.equipos.indexOf("luz") !== -1,
    computadora: (a) => a.equipos.indexOf("computadora") !== -1,
    tanque: (a) => a.equipos.indexOf("tanque") !== -1,
    agua_potable: (a) => a.tieneAguaPotable || a.equipos.indexOf("agua_potable") !== -1,
    motoguadana: (a) => a.equipos.indexOf("motoguadana") !== -1,
    fumigadora: (a) => a.equipos.indexOf("fumigadora") !== -1,
    correo: (a) => a.equipos.indexOf("correo") !== -1,
    gas: (a) => a.equipos.indexOf("gas") !== -1,
    estanteria: (a) => a.equipos.indexOf("estanteria") !== -1,
    cuenta_bancaria: (a) => a.tieneCuentaBancaria || a.equipos.indexOf("cuenta_bancaria") !== -1,
    auto: (a) => a.tieneAuto || a.equipos.indexOf("auto") !== -1,
    manguera: (a) => a.equipos.indexOf("manguera") !== -1,
    generador: (a) => a.equipos.indexOf("generador") !== -1,
    invernadero: (a) => a.equipos.indexOf("invernadero") !== -1,
    tractor: (a) => a.equipos.indexOf("tractor") !== -1,
    motosierra: (a) => a.equipos.indexOf("motosierra") !== -1,
    pozo: (a) => a.equipos.indexOf("pozo") !== -1,
    panel_solar: (a) => a.equipos.indexOf("panel_solar") !== -1
  };
  return CF.EQUIPOS.map((eq) => {
    const fn = flags[eq.id];
    const count = fn ? ags.filter(fn).length : 0;
    return { id: eq.id, label: eq.label, grupo: eq.grupo, pct: (count / n) * 100, count: count };
  }).sort((a, b) => b.pct - a.pct);
};

CF.generoStats = function () {
  const ags = CF.loadDB().agricultores;
  const f = ags.filter((a) => a.genero === "F").length;
  const m = ags.filter((a) => a.genero === "M").length;
  const o = ags.length - f - m;
  return { f, m, o, total: ags.length };
};

CF.potencialImpacto = function () {
  return CF.loadDB().agricultores.length * 3 + CF.loadDB().organizaciones.length * 12;
};

CF.fmtHa = function (n) {
  return Number(n || 0).toLocaleString("es-EC", { maximumFractionDigits: 1 });
};

CF.fmtPct = function (n) {
  return Number(n || 0).toLocaleString("es-EC", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + "%";
};

CF.fmtFecha = function (iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d.getTime())) return iso;
  return d.getDate() + " " + CF.MESES[d.getMonth()] + " " + d.getFullYear();
};

CF.escape = function (str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

/* Treemap binario (split by area) */
CF.layoutTreemap = function (items, x, y, w, h) {
  if (!items.length) return [];
  if (items.length === 1) {
    return [{ x: x, y: y, w: w, h: h, item: items[0] }];
  }
  const total = items.reduce((s, i) => s + i.value, 0);
  let acc = 0;
  let split = 1;
  for (let i = 0; i < items.length; i++) {
    acc += items[i].value;
    if (acc >= total / 2) {
      split = Math.max(1, Math.min(items.length - 1, i + 1));
      break;
    }
  }
  const a = items.slice(0, split);
  const b = items.slice(split);
  const aSum = a.reduce((s, i) => s + i.value, 0);
  if (w >= h) {
    const w1 = w * (aSum / total);
    return CF.layoutTreemap(a, x, y, w1, h).concat(CF.layoutTreemap(b, x + w1, y, w - w1, h));
  }
  const h1 = h * (aSum / total);
  return CF.layoutTreemap(a, x, y, w, h1).concat(CF.layoutTreemap(b, x, y + h1, w, h - h1));
};

CF.renderTreemap = function (container, items, opts) {
  opts = opts || {};
  const rect = container.getBoundingClientRect();
  const width = Math.max(320, rect.width || container.clientWidth || 600);
  const height = Math.max(280, opts.height || rect.height || 420);
  container.style.height = height + "px";
  const layout = CF.layoutTreemap(items.filter((i) => i.value > 0), 0, 0, width, height);
  container.innerHTML = layout.map((n) => {
    const showLabel = n.w > 72 && n.h > 28;
    const showCode = n.w > 110 && n.h > 48;
    const slug = n.item.nombre.toLowerCase().replace(/\s+/g, "-");
    return (
      '<div class="tm-cell" style="left:' + n.x + "px;top:" + n.y + "px;width:" + n.w + "px;height:" + n.h + "px;background:" + n.item.color + ';" title="' +
      CF.escape(n.item.nombre) + " · " + CF.fmtHa(n.item.value) + ' ha">' +
      (showLabel ? '<span class="tm-label">' + CF.escape(slug) + (showCode ? "<small>" + CF.fmtHa(n.item.value) + " ha</small>" : "") + "</span>" : "") +
      "</div>"
    );
  }).join("");
};

CF.dashboardHTML = function () {
  const db = CF.loadDB();
  const gen = CF.generoStats();
  const land = CF.hectareasPorTipo();
  const totalHa = land.agricola + land.pecuario;
  const fPct = gen.total ? (gen.f / gen.total) * 100 : 0;
  const products = CF.productosEnProduccion();
  const items = CF.itemsProductores().slice(0, 16);
  function kpi(label, value) {
    return '<div class="kpi"><div class="lbl">' + label + '</div><div class="val">' + value + "</div></div>";
  }
  return (
    '<div class="kpi-row">' +
      kpi("Total productores", db.agricultores.length) +
      kpi("Potencial de impacto", CF.potencialImpacto()) +
      kpi("Organizaciones", db.organizaciones.length) +
      '<div class="kpi"><div class="lbl">Género</div>' +
        '<div style="display:flex;align-items:center;gap:0.8rem;margin-top:0.4rem">' +
          '<div style="width:64px;height:64px;border-radius:50%;background:conic-gradient(#a5d6a7 0 ' + fPct + '%, #90caf9 0)"></div>' +
          '<div style="font-size:0.82rem">Mujeres ' + gen.f + '<br>Hombres ' + gen.m + "</div>" +
        "</div></div>" +
    "</div>" +
    '<div class="dash-grid">' +
      '<div class="panel"><h3>' + products.length + " productos agropecuarios en producción</h3>" +
        '<div class="tm" id="dash-treemap" style="min-height:280px;height:280px"></div></div>' +
      '<div class="panel"><h3>Mapa de fincas</h3><div id="dash-map" style="height:280px;border-radius:8px"></div></div>' +
    "</div>" +
    '<div class="panel"><h3>Terreno disponible vs producción agropecuaria</h3>' +
      '<div class="land-row">' +
        '<div><div class="bar-track">' +
          '<div class="bar-ag" style="width:' + (totalHa ? (land.agricola / totalHa) * 100 : 0) + '%"></div>' +
          '<div class="bar-pe" style="width:' + (totalHa ? (land.pecuario / totalHa) * 100 : 0) + '%"></div>' +
        '</div><div class="legend"><span><i class="sw" style="background:#7cb87a"></i>Agrícola ' + CF.fmtHa(land.agricola) + ' ha</span>' +
        '<span><i class="sw" style="background:#2f5d46"></i>Pecuario ' + CF.fmtHa(land.pecuario) + " ha</span></div></div>" +
        '<div class="kpi" style="margin:0"><div class="lbl">Total terreno</div><div class="val">' + CF.fmtHa(CF.hectareasTotales()) + " ha</div></div>" +
      "</div></div>" +
    '<div class="items-card"><div class="items-head"><h2>Datos productores</h2>' +
      "<p>Servicios básicos, conectividad y equipos · " + db.agricultores.length + " registros</p></div>" +
      '<div class="items-grid">' + items.map(function (it) {
        return '<div class="item-cell"><div class="item-icon">' + CF.icon(it.id) + '</div><div class="item-pct">' + CF.fmtPct(it.pct) + '</div><div class="item-label">' + CF.escape(it.label) + "</div></div>";
      }).join("") + "</div></div>"
  );
};

CF.mountDashboard = function () {
  const tm = document.getElementById("dash-treemap");
  if (tm) CF.renderTreemap(tm, CF.productosEnProduccion(), { height: 280 });
  const el = document.getElementById("dash-map");
  if (el && window.L) {
    const map = L.map(el, { scrollWheelZoom: false }).setView([-4.05, -79.25], 9);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OSM" }).addTo(map);
    CF.loadDB().fincas.forEach(function (f) {
      L.circleMarker([f.lat, f.lng], { radius: 6, color: "#2e7d32", fillColor: "#66bb6a", fillOpacity: 0.9 }).addTo(map)
        .bindPopup(CF.escape(f.nombre));
    });
    setTimeout(function () { map.invalidateSize(); }, 80);
  }
};
