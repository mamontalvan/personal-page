/**
 * Estado local del prototipo SIMERT (localStorage). Sin backend.
 * El reloj de demostración arranca a las 10:35 y puede acelerarse o saltar.
 */
window.SIM = window.SIM || {};

SIM.KEY = "simert_loja_demo_v1";

SIM._clock = {
  speed: 1,
  realOrigin: Date.now(),
  simOrigin: new Date(SIM.DEMO_START).getTime()
};

SIM.now = function () {
  const elapsed = Date.now() - SIM._clock.realOrigin;
  return SIM._clock.simOrigin + elapsed * SIM._clock.speed;
};

SIM.setSpeed = function (speed) {
  const current = SIM.now();
  SIM._clock.simOrigin = current;
  SIM._clock.realOrigin = Date.now();
  SIM._clock.speed = Number(speed) || 1;
  const db = SIM.load();
  db.speed = SIM._clock.speed;
  SIM.save(db);
};

SIM.jumpTo = function (isoOrMs) {
  const target = typeof isoOrMs === "number" ? isoOrMs : new Date(isoOrMs).getTime();
  SIM._clock.simOrigin = target;
  SIM._clock.realOrigin = Date.now();
};

SIM.jumpMinutes = function (mins) {
  SIM.jumpTo(SIM.now() + mins * 60000);
};

SIM.uid = function (prefix) {
  return prefix + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
};

SIM.zona = function (id) {
  return SIM.ZONAS.find(function (z) { return z.id === id; });
};

SIM.plaza = function (db, id) {
  return db.plazas.find(function (p) { return p.id === id; });
};

SIM.money = function (n) {
  const v = Math.max(0, Number(n) || 0);
  return "$" + v.toFixed(2).replace(".", ",");
};

SIM.pad = function (n) {
  return String(n).padStart(2, "0");
};

SIM.formatClock = function (ms) {
  const d = new Date(ms);
  return SIM.pad(d.getHours()) + ":" + SIM.pad(d.getMinutes());
};

SIM.formatClockSec = function (ms) {
  const d = new Date(ms);
  return SIM.formatClock(ms) + ":" + SIM.pad(d.getSeconds());
};

SIM.formatDateTime = function (ms) {
  const d = new Date(ms);
  const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return d.getDate() + " " + meses[d.getMonth()] + " · " + SIM.formatClock(ms);
};

SIM.formatDuration = function (ms) {
  const total = Math.max(0, Math.round(ms / 60000));
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h <= 0) return m + " min";
  if (m === 0) return h + " h";
  return h + " h " + m + " min";
};

SIM.normalizePlate = function (raw) {
  const s = String(raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (s.length < 5) return s;
  if (s.length === 6) return s.slice(0, 3) + "-" + s.slice(3);
  if (s.length === 7) return s.slice(0, 3) + "-" + s.slice(3);
  return s.slice(0, 3) + "-" + s.slice(3);
};

SIM.costFor = function (zona, startMs, endMs) {
  const minutes = Math.max(1, Math.ceil((endMs - startMs) / 60000));
  const raw = zona.tarifaHora * (minutes / 60);
  return Math.round(raw * 100) / 100;
};

SIM.distancia = function (a, b) {
  const R = 6371000;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const la1 = a.lat * Math.PI / 180;
  const la2 = b.lat * Math.PI / 180;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};

SIM.zonaPorGps = function (lat, lng) {
  let best = SIM.ZONAS[0];
  let bestD = Infinity;
  SIM.ZONAS.forEach(function (z) {
    const d = SIM.distancia({ lat: lat, lng: lng }, { lat: z.lat, lng: z.lng });
    if (d < bestD) {
      bestD = d;
      best = z;
    }
  });
  return { zona: best, metros: Math.round(bestD) };
};

function sesionesSemilla(now) {
  const h = function (minsAgo, placa, zonaId, plazaId, status, extraMins) {
    const start = now - minsAgo * 60000;
    const end = status === "activa" ? null : start + (extraMins || 40) * 60000;
    const zona = SIM.zona(zonaId);
    const costo = status === "activa" ? null : SIM.costFor(zona, start, end);
    return {
      id: SIM.uid("s"),
      placa: placa,
      zonaId: zonaId,
      plazaId: plazaId,
      inicio: start,
      fin: end,
      status: status,
      costo: costo,
      metodo: "visa",
      pagado: status === "cerrada",
      alerta10: false,
      alerta5: false,
      titular: placa === "LOJ-2048" || placa === "PBA-8812" ? SIM.CIUDADANO.nombre : "Ciudadano registrado"
    };
  };

  return [
    h(18, "GAA-4410", "centro", "C-01", "activa"),
    h(210, "MCH-3321", "centro", "C-02", "activa"),
    h(12, "ABC-9182", "centro", "C-06", "activa"),
    h(40, "LBA-2201", "centro", "C-08", "activa"),
    h(25, "GAI-5520", "centro", "C-10", "activa"),
    h(8, "TBA-7730", "centro", "C-14", "activa"),
    h(55, "RPA-1044", "centro", "C-16", "activa"),
    h(33, "HCL-6098", "centro", "C-18", "activa"),
    h(14, "VSA-4419", "centro", "C-22", "activa"),
    h(22, "NMA-8123", "centro", "C-24", "activa"),
    h(16, "QWE-3301", "mercado", "M-01", "activa"),
    h(50, "ZXC-2290", "mercado", "M-02", "activa"),
    h(9, "PLM-1188", "mercado", "M-05", "activa"),
    h(28, "KJH-6671", "mercado", "M-07", "activa"),
    h(11, "BGT-4402", "mercado", "M-09", "activa"),
    h(70, "YHN-9090", "mercado", "M-10", "activa"),
    h(20, "DFG-2218", "noviembre", "N-02", "activa"),
    h(44, "ERT-7744", "noviembre", "N-04", "activa"),
    h(6, "UIO-3355", "noviembre", "N-07", "activa"),
    h(15, "WQA-1280", "noviembre", "N-12", "activa"),
    h(30, "BUS-1022", "terminal", "T-01", "activa"),
    h(10, "TAX-4401", "terminal", "T-03", "activa"),
    h(48, "VAN-8833", "terminal", "T-05", "activa"),
    h(19, "RUT-5500", "terminal", "T-09", "activa"),
    h(35, "UNL-2016", "universitaria", "U-02", "activa"),
    h(12, "EST-4412", "universitaria", "U-04", "activa"),
    h(27, "DOC-1190", "universitaria", "U-07", "activa")
  ];
}

SIM.seed = function () {
  const now = new Date(SIM.DEMO_START).getTime();
  const plazas = SIM.PLAZAS_SEED.map(function (p) { return Object.assign({}, p); });
  const sesiones = sesionesSemilla(now);
  const events = [
    { t: now - 40000, tipo: "sensor", texto: "Sensor C-05 libera plaza · Zona Centro", nivel: "ok" },
    { t: now - 90000, tipo: "pago", texto: "Pago digital $0,40 · plaza N-01", nivel: "info" },
    { t: now - 140000, tipo: "control", texto: "Agente CT-184 consulta PXA-1107 · sin ticket", nivel: "warn" },
    { t: now - 200000, tipo: "sensor", texto: "Sensor M-03 detecta ocupación · Zona Mercado", nivel: "info" },
    { t: now - 260000, tipo: "sesion", texto: "Inicio de estacionamiento GAA-4410 · C-01", nivel: "ok" }
  ];
  return {
    version: 1,
    speed: 1,
    saldo: 15,
    metodoPago: "visa",
    placaActiva: "LOJ-2048",
    zonaActiva: "centro",
    plazaSugerida: "C-05",
    vehiculos: SIM.VEHICULOS_USUARIO.map(function (v) { return Object.assign({}, v); }),
    plazas: plazas,
    sesiones: sesiones,
    historial: SIM.HISTORIAL_SEED.map(function (h) {
      return {
        id: h.id,
        placa: h.placa,
        zonaId: h.zonaId,
        inicio: new Date(h.inicio).getTime(),
        fin: new Date(h.fin).getTime(),
        costo: h.costo,
        metodo: h.metodo,
        status: "cerrada",
        pagado: true
      };
    }),
    consultas: [],
    eventos: events,
    notificaciones: [
      { id: "n0", t: now - 86400000, titulo: "Bienvenido a SIMERT Inteligente", texto: "Ya no necesitas tarjeta de papel. Inicia y finaliza desde la app.", leida: true }
    ]
  };
};

SIM.load = function () {
  try {
    const raw = localStorage.getItem(SIM.KEY);
    if (raw) {
      const db = JSON.parse(raw);
      if (db && db.version === 1 && Array.isArray(db.plazas)) {
        if (!SIM._hydrated) {
          SIM._clock.simOrigin = db.clockSim || new Date(SIM.DEMO_START).getTime();
          SIM._clock.realOrigin = Date.now();
          SIM._clock.speed = db.speed || 1;
          SIM._hydrated = true;
        }
        return db;
      }
    }
  } catch (e) { /* seed */ }
  const seed = SIM.seed();
  SIM._hydrated = true;
  SIM.save(seed);
  return seed;
};

SIM.save = function (db) {
  db.clockSim = SIM.now();
  db.speed = SIM._clock.speed;
  localStorage.setItem(SIM.KEY, JSON.stringify(db));
};

SIM._hydrated = false;

SIM.reset = function () {
  localStorage.removeItem(SIM.KEY);
  SIM._hydrated = false;
  SIM._clock.speed = 1;
  SIM._clock.realOrigin = Date.now();
  SIM._clock.simOrigin = new Date(SIM.DEMO_START).getTime();
  return SIM.load();
};

SIM.sesionActiva = function (db, placa) {
  const p = placa || db.placaActiva;
  return db.sesiones.find(function (s) {
    return s.status === "activa" && s.placa === p;
  }) || null;
};

SIM.sesionPorPlaca = function (db, placa) {
  const norm = SIM.normalizePlate(placa);
  return db.sesiones.find(function (s) {
    return s.status === "activa" && SIM.normalizePlate(s.placa) === norm;
  }) || null;
};

SIM.ocupacionZona = function (db, zonaId) {
  const plazas = db.plazas.filter(function (p) { return p.zonaId === zonaId; });
  const ocupadas = plazas.filter(function (p) { return p.ocupada; }).length;
  return { total: plazas.length, ocupadas: ocupadas, libres: plazas.length - ocupadas };
};

SIM.ocupacionGlobal = function (db) {
  const total = db.plazas.length;
  const ocupadas = db.plazas.filter(function (p) { return p.ocupada; }).length;
  return { total: total, ocupadas: ocupadas, libres: total - ocupadas, pct: total ? Math.round(ocupadas * 100 / total) : 0 };
};

SIM.plazaLibreCercana = function (db, zonaId, gps) {
  const libres = db.plazas.filter(function (p) { return p.zonaId === zonaId && !p.ocupada; });
  if (!libres.length) return null;
  libres.sort(function (a, b) {
    return SIM.distancia(gps, a) - SIM.distancia(gps, b);
  });
  return libres[0];
};

SIM.pushEvento = function (db, tipo, texto, nivel) {
  db.eventos.unshift({ t: SIM.now(), tipo: tipo, texto: texto, nivel: nivel || "info" });
  db.eventos = db.eventos.slice(0, 40);
};

SIM.pushNotif = function (db, titulo, texto) {
  db.notificaciones.unshift({ id: SIM.uid("n"), t: SIM.now(), titulo: titulo, texto: texto, leida: false });
};

SIM.iniciarEstacionamiento = function (db) {
  if (SIM.sesionActiva(db)) return { ok: false, error: "Ya tienes un estacionamiento activo." };
  const zona = SIM.zona(db.zonaActiva);
  const plaza = SIM.plazaLibreCercana(db, zona.id, SIM.GPS_DEMO) || SIM.plaza(db, db.plazaSugerida);
  if (!plaza || plaza.ocupada) return { ok: false, error: "No hay plazas libres en esta zona." };
  plaza.ocupada = true;
  plaza.placa = db.placaActiva;
  const sesion = {
    id: SIM.uid("s"),
    placa: db.placaActiva,
    zonaId: zona.id,
    plazaId: plaza.id,
    inicio: SIM.now(),
    fin: null,
    status: "activa",
    costo: null,
    metodo: db.metodoPago,
    pagado: false,
    extraMs: 0,
    alerta10: false,
    alerta5: false,
    titular: SIM.CIUDADANO.nombre
  };
  db.sesiones.unshift(sesion);
  SIM.pushEvento(db, "sesion", "Inicio Start & Stop · " + sesion.placa + " · plaza " + plaza.id, "ok");
  SIM.pushEvento(db, "sensor", "Sensor " + plaza.id + " reporta ocupación", "info");
  SIM.save(db);
  return { ok: true, sesion: sesion, plaza: plaza, zona: zona };
};

SIM.finalizarEstacionamiento = function (db, metodo) {
  const sesion = SIM.sesionActiva(db);
  if (!sesion) return { ok: false, error: "No hay estacionamiento activo." };
  const zona = SIM.zona(sesion.zonaId);
  const fin = SIM.now();
  const costo = SIM.costFor(zona, sesion.inicio, fin);
  sesion.fin = fin;
  sesion.status = "cerrada";
  sesion.costo = costo;
  sesion.metodo = metodo || db.metodoPago;
  sesion.pagado = true;
  const plaza = SIM.plaza(db, sesion.plazaId);
  if (plaza) {
    plaza.ocupada = false;
    plaza.placa = null;
  }
  if (sesion.metodo === "saldo") {
    db.saldo = Math.round((db.saldo - costo) * 100) / 100;
  }
  db.historial.unshift({
    id: sesion.id,
    placa: sesion.placa,
    zonaId: sesion.zonaId,
    plazaId: sesion.plazaId,
    inicio: sesion.inicio,
    fin: sesion.fin,
    costo: costo,
    metodo: sesion.metodo,
    status: "cerrada",
    pagado: true
  });
  SIM.pushEvento(db, "pago", "Pago " + SIM.money(costo) + " · " + sesion.placa + " · " + zona.nombre, "ok");
  SIM.pushEvento(db, "sensor", "Sensor " + sesion.plazaId + " libera plaza", "info");
  SIM.save(db);
  return { ok: true, sesion: sesion, zona: zona, costo: costo };
};

SIM.extenderSesion = function (db, minutos) {
  const sesion = SIM.sesionActiva(db);
  if (!sesion) return { ok: false, error: "No hay estacionamiento activo." };
  const extra = Math.max(1, Number(minutos) || 30) * 60000;
  sesion.extraMs = (sesion.extraMs || 0) + extra;
  const info = SIM.estadoSesion(sesion);
  SIM.pushNotif(db, "Tiempo aumentado", "Se añadieron " + minutos + " minutos. Nuevo máximo hasta las " + SIM.formatClock(sesion.inicio + info.maxMs) + ".");
  SIM.pushEvento(db, "sesion", "Extensión +" + minutos + " min · " + sesion.placa, "ok");
  SIM.save(db);
  return { ok: true, sesion: sesion, extraMs: sesion.extraMs, info: info };
};

SIM.estadoSesion = function (sesion) {
  if (!sesion) return null;
  const zona = SIM.zona(sesion.zonaId);
  const now = SIM.now();
  const end = sesion.fin || now;
  const elapsed = end - sesion.inicio;
  const maxMs = zona.maxHoras * 3600000 + (sesion.extraMs || 0);
  const remaining = sesion.status === "activa" ? maxMs - elapsed : 0;
  const costo = SIM.costFor(zona, sesion.inicio, end);
  const pct = Math.min(100, Math.max(0, (elapsed / maxMs) * 100));
  let validez = "valido";
  if (sesion.status !== "activa") validez = "cerrado";
  else if (remaining <= 0) validez = "expirado";
  return {
    zona: zona,
    elapsed: elapsed,
    remaining: remaining,
    costo: costo,
    pct: pct,
    validez: validez,
    maxMs: maxMs
  };
};

SIM.consultarPlaca = function (db, placaRaw, origen) {
  const placa = SIM.normalizePlate(placaRaw);
  const sesion = SIM.sesionPorPlaca(db, placa);
  const plazaOcupada = db.plazas.find(function (p) {
    return p.placa && SIM.normalizePlate(p.placa) === placa;
  });
  let resultado = "sin_ticket";
  let detalle = "No hay estacionamiento digital activo para esta matrícula.";
  let sesionInfo = null;
  if (sesion) {
    sesionInfo = SIM.estadoSesion(sesion);
    if (sesionInfo.validez === "expirado") {
      resultado = "expirado";
      detalle = "El máximo de la zona se agotó. El ciudadano debía finalizar o irse.";
    } else {
      resultado = "valido";
      detalle = "Estacionamiento Start & Stop en curso. El ciudadano paga solo el tiempo usado.";
    }
  } else if (plazaOcupada) {
    resultado = "ocupado_sin_ticket";
    detalle = "El sensor de la plaza " + plazaOcupada.id + " reporta ocupación, pero no hay sesión digital.";
  }
  const consulta = {
    id: SIM.uid("q"),
    t: SIM.now(),
    placa: placa,
    resultado: resultado,
    detalle: detalle,
    agente: SIM.AGENTE.placa,
    origen: origen || "manual",
    sesionId: sesion ? sesion.id : null,
    plazaId: plazaOcupada ? plazaOcupada.id : (sesion ? sesion.plazaId : null)
  };
  db.consultas.unshift(consulta);
  db.consultas = db.consultas.slice(0, 30);
  const nivel = resultado === "valido" ? "ok" : resultado === "expirado" ? "warn" : "bad";
  SIM.pushEvento(db, "control", "Control " + placa + " · " + resultado.replace(/_/g, " "), nivel);
  SIM.save(db);
  return { consulta: consulta, sesion: sesion, info: sesionInfo, plaza: plazaOcupada || null };
};

SIM.revisarAlertas = function (db) {
  const fired = [];
  db.sesiones.forEach(function (s) {
    if (s.status !== "activa") return;
    if (s.placa !== db.placaActiva) return;
    const info = SIM.estadoSesion(s);
    const minLeft = info.remaining / 60000;
    if (!s.alerta10 && minLeft <= 10 && minLeft > 5) {
      s.alerta10 = true;
      SIM.pushNotif(db, "Te quedan 10 minutos", "Tu máximo en " + info.zona.nombre + " está por agotarse. Finaliza o retira el vehículo.");
      fired.push("10");
    }
    if (!s.alerta5 && minLeft <= 5 && minLeft > 0) {
      s.alerta5 = true;
      SIM.pushNotif(db, "Quedan 5 minutos", "El controlador verá tu placa como expirada cuando se acabe el máximo.");
      fired.push("5");
    }
    if (info.validez === "expirado" && !s.alertaExp) {
      s.alertaExp = true;
      SIM.pushNotif(db, "Tiempo máximo agotado", "Finaliza el estacionamiento. Pueden aplicar control en vía.");
      fired.push("exp");
    }
  });
  if (fired.length) SIM.save(db);
  return fired;
};

SIM.simularSensor = function (db) {
  const propias = {};
  db.sesiones.forEach(function (s) {
    if (s.status === "activa") propias[s.plazaId] = true;
  });
  const candidatas = db.plazas.filter(function (p) { return !propias[p.id]; });
  if (!candidatas.length) return null;
  const plaza = candidatas[Math.floor(Math.random() * candidatas.length)];
  plaza.ocupada = !plaza.ocupada;
  if (!plaza.ocupada) plaza.placa = null;
  const texto = plaza.ocupada
    ? "Sensor " + plaza.id + " detecta vehículo"
    : "Sensor " + plaza.id + " libera plaza";
  SIM.pushEvento(db, "sensor", texto, plaza.ocupada ? "info" : "ok");
  SIM.save(db);
  return plaza;
};

SIM.recaudacionHoy = function (db) {
  const startDay = new Date(SIM.now());
  startDay.setHours(0, 0, 0, 0);
  const from = startDay.getTime();
  let cobrado = 0;
  let n = 0;
  db.historial.forEach(function (s) {
    if (s.pagado && s.fin >= from) {
      cobrado += Number(s.costo) || 0;
      n += 1;
    }
  });
  let enCurso = 0;
  db.sesiones.forEach(function (s) {
    if (s.status === "activa") enCurso += SIM.estadoSesion(s).costo;
  });
  return {
    total: Math.round((cobrado + enCurso) * 100) / 100,
    cobrado: Math.round(cobrado * 100) / 100,
    enCurso: Math.round(enCurso * 100) / 100,
    tickets: n
  };
};

SIM.plazasConsultaDemo = ["GAA-4410"];

SIM.placaControlValido = function (db, preferida) {
  const tryPlate = function (placa) {
    if (!placa) return null;
    const s = SIM.sesionPorPlaca(db, placa);
    if (!s) return null;
    const info = SIM.estadoSesion(s);
    return info && info.validez === "valido" ? s.placa : null;
  };
  const hallada = tryPlate(preferida) || tryPlate(db.placaActiva);
  if (hallada) return hallada;
  const sesion = db.sesiones.find(function (s) {
    return s.status === "activa" && SIM.estadoSesion(s).validez === "valido";
  });
  return sesion ? sesion.placa : "GAA-4410";
};
