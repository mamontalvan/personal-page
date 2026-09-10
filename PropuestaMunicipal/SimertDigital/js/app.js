(function () {
  const root = document.getElementById("app");
  const ui = {
    screen: "login",
    loggedIn: false,
    toast: null,
    toastTimer: null,
    consulta: null,
    scanning: false,
    receipt: null,
    checkout: null,
    skipping: false,
    skipTimer: null,
    locateTimer: null,
    faceTimer: null,
    faceState: "idle",
    faceStream: null,
    extendOffer: false,
    agentLoggedIn: false,
    agentScreen: "login",
    agentFaceState: "idle",
    agentFaceTimer: null,
    agentCamState: "live",
    agentCamTimer: null,
    agentSnap: null,
    adminLoggedIn: false,
    adminScreen: "login",
    sensorTimer: 0
  };
  const maps = {};

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function route() {
    const raw = (location.hash || "#/").slice(1);
    const parts = raw.split("/").filter(Boolean);
    return { view: parts[0] || "home" };
  }

  function go(hash) {
    location.hash = hash;
  }

  function logoSvg() {
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8 19V7.8C8 5.2 10.2 4 12.4 4 15.2 4 17 5.7 17 8.1c0 2.1-1.4 3.4-3.6 3.9L12 13.2" stroke="#fff" stroke-width="1.85" stroke-linecap="round"/><circle cx="12" cy="17.4" r="1.7" fill="#DAA520"/><path d="M16.2 6.8c1.9.3 3.4 1.4 3.4 3.1" stroke="#F5D76E" stroke-width="1.5" stroke-linecap="round"/><path d="M16.6 5.2c2.6.4 4.7 1.9 4.7 4.2" stroke="#F5D76E" stroke-width="1.2" stroke-linecap="round" opacity=".7"/></svg>';
  }

  function icon(name) {
    const s = {
      home: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 11.5 12 5l8 6.5V20H4V11.5Z" stroke="currentColor" stroke-width="1.7"/><path d="M10 20v-6h4v6" stroke="currentColor" stroke-width="1.7"/></svg>',
      map: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 7l6-2 4 2 6-2v12l-6 2-4-2-6 2V7Z" stroke="currentColor" stroke-width="1.7"/><path d="M10 5v12M14 7v12" stroke="currentColor" stroke-width="1.7"/></svg>',
      clock: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><path d="M12 8v4.5l3 1.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      user: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="3.2" stroke="currentColor" stroke-width="1.7"/><path d="M6 19c1.2-3 3.2-4.5 6-4.5s4.8 1.5 6 4.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      bell: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 16h12l-1.2-1.2V11a4.8 4.8 0 0 0-9.6 0v3.8L6 16Z" stroke="currentColor" stroke-width="1.7"/><path d="M10 18.2a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.7"/></svg>',
      phone: '<svg viewBox="0 0 24 24" fill="none"><rect x="7" y="3" width="10" height="18" rx="2.2" stroke="currentColor" stroke-width="1.7"/><path d="M11 17h2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
      shield: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3 5 6.2v5.4c0 4.2 2.8 7.4 7 8.4 4.2-1 7-4.2 7-8.4V6.2L12 3Z" stroke="currentColor" stroke-width="1.7"/></svg>',
      board: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="7" height="7" rx="1.2" stroke="currentColor" stroke-width="1.7"/><rect x="13" y="4" width="7" height="4" rx="1.2" stroke="currentColor" stroke-width="1.7"/><rect x="13" y="10" width="7" height="10" rx="1.2" stroke="currentColor" stroke-width="1.7"/><rect x="4" y="13" width="7" height="7" rx="1.2" stroke="currentColor" stroke-width="1.7"/></svg>'
    };
    return s[name] || "";
  }

  function toastHtml() {
    if (!ui.toast) return "";
    return '<div class="toast ' + esc(ui.toast.type || "") + '"><b>' + esc(ui.toast.title) + "</b><br>" + esc(ui.toast.text) + "</div>";
  }

  function showToast(title, text, type, ms) {
    ui.toast = { title: title, text: text, type: type || "" };
    if (ui.toastTimer) clearTimeout(ui.toastTimer);
    ui.toastTimer = setTimeout(function () {
      ui.toast = null;
      const el = document.querySelector(".toast");
      if (el) el.remove();
    }, ms || 4200);
    render();
  }

  function statusBar() {
    return '<div class="status-bar"><span data-live="clock">--:--</span><span>SIMERT · 5G</span></div>';
  }

  function phoneChrome(inner, navActive) {
    return (
      '<div class="app-solo"><div class="phone">' +
        '<span class="phone-btn btn-vol" aria-hidden="true"></span>' +
        '<span class="phone-btn btn-pwr" aria-hidden="true"></span>' +
        '<div class="phone-screen">' +
          '<div class="notch"></div>' +
          statusBar() +
          toastHtml() +
          '<div class="app-body">' + inner + "</div>" +
          (navActive ? navBar(navActive) : "") +
          '<div class="home-bar" aria-hidden="true"></div>' +
        "</div></div></div>"
    );
  }

  function navBar(active) {
    const items = [
      ["welcome", "Inicio", "home"],
      ["map", "Mapa", "map"],
      ["session", "Sesión", "clock"],
      ["account", "Cuenta", "user"]
    ];
    return (
      '<nav class="app-nav">' +
        items.map(function (it) {
          return (
            '<button class="' + (active === it[0] ? "active" : "") + '" data-action="screen" data-screen="' + it[0] + '">' +
              icon(it[2]) + it[1] +
            "</button>"
          );
        }).join("") +
      "</nav>"
    );
  }

  function vehicleCard(db) {
    const v = db.vehiculos.find(function (x) { return x.placa === db.placaActiva; }) || db.vehiculos[0];
    return (
      '<article class="vehicle-card">' +
        '<div><div class="hello">Tu vehículo</div><div class="plate-lg">' + esc(v.placa) + "</div>" +
        '<div class="muted" style="font-size:12px;margin-top:4px">' + esc(v.alias) + " · " + esc(v.color) + "</div></div>" +
        '<button class="btn-ghost btn-sm" data-action="screen" data-screen="vehicles">Cambiar</button>' +
      "</article>"
    );
  }

  function zoneCard(db) {
    const z = SIM.zona(db.zonaActiva);
    const oc = SIM.ocupacionZona(db, z.id);
    const dots = db.plazas.filter(function (p) { return p.zonaId === z.id; }).slice(0, 24).map(function (p) {
      return '<span class="spot-dot' + (p.ocupada ? " busy" : "") + '" title="' + p.id + '"></span>';
    }).join("");
    const gps = SIM.zonaPorGps(SIM.GPS_DEMO.lat, SIM.GPS_DEMO.lng);
    return (
      '<article class="zone-card">' +
        '<div class="hello">La app detectó tu zona con GPS</div>' +
        "<h3>" + esc(z.nombre) + "</h3>" +
        '<div class="muted" style="font-size:12px">' + esc(z.alias) + " · a " + gps.metros + " m</div>" +
        '<div class="zone-meta">' +
          '<span class="pill info">' + esc(z.tipo) + "</span>" +
          '<span class="pill dark">' + oc.libres + " libres / " + oc.total + "</span>" +
        "</div>" +
        '<div class="tarifa">' + SIM.money(z.tarifaHora) + "<span> / hora</span></div>" +
        '<div class="muted" style="font-size:13px">Máximo ' + z.maxHoras + " h · Horario " + esc(z.horario) + "</div>" +
        '<div class="spots-row" aria-label="Sensores de la zona">' + dots + "</div>" +
        '<div class="field" style="margin-top:10px"><label>Cambiar zona</label>' +
          '<select data-action="zona">' +
            SIM.ZONAS.map(function (zn) {
              return '<option value="' + zn.id + '"' + (zn.id === z.id ? " selected" : "") + ">" + esc(zn.nombre) + " · " + SIM.money(zn.tarifaHora) + "/h</option>";
            }).join("") +
          "</select></div>" +
      "</article>"
    );
  }

  function startCta(db) {
    const active = SIM.sesionActiva(db);
    if (active) {
      return '<button class="btn btn-soft btn-full" data-action="screen" data-screen="session">Estacionamiento en curso — ver sesión</button>';
    }
    return '<button class="btn btn-start" data-action="start">Iniciar estacionamiento</button>';
  }

  function ringSvg(pct, color) {
    const r = 88, c = 2 * Math.PI * r;
    const dash = c * (1 - Math.min(1, pct / 100));
    return (
      '<svg viewBox="0 0 210 210">' +
        '<circle cx="105" cy="105" r="' + r + '" fill="none" stroke="#E8E1D0" stroke-width="12"/>' +
        '<circle cx="105" cy="105" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="12" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + dash + '"/>' +
      "</svg>"
    );
  }

  function citizenLogin() {
    return (
      '<div class="login-screen">' +
        '<div class="logo-mark" style="margin:8px auto 12px">' + logoSvg() + "</div>" +
        "<h2>Iniciar sesión</h2>" +
        '<p class="muted">Confirma tu identidad para usar SIMERT</p>' +
        '<button class="btn btn-start" data-action="face-start" style="margin-top:22px">' +
          '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true"><ellipse cx="12" cy="9" rx="4.2" ry="5" stroke="currentColor" stroke-width="1.7"/><path d="M5 19c1.4-3.2 3.6-4.8 7-4.8s5.6 1.6 7 4.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M4 8.5c2-3 5-4 8-4M20 8.5c-2-3-5-4-8-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' +
          " Desbloquear con el rostro" +
        "</button>" +
        '<p class="muted" style="margin:16px 0 10px;font-size:12px">o entra con tu clave</p>' +
        '<form data-form="login">' +
          '<div class="field"><label>Correo o cédula</label>' +
            '<input name="user" value="' + esc(SIM.CIUDADANO.correo) + '" autocomplete="username"></div>' +
          '<div class="field"><label>Contraseña</label>' +
            '<input name="pass" type="password" value="loja2026" autocomplete="current-password"></div>' +
          '<button class="btn btn-navy btn-full" type="submit">Entrar con contraseña</button>' +
        "</form>" +
      "</div>"
    );
  }

  function citizenFace() {
    const ok = ui.faceState === "ok";
    return (
      '<div class="face-screen">' +
        '<p class="hello">' + (ok ? "Identidad confirmada" : "Escaneando tu rostro") + "</p>" +
        '<div class="face-stage' + (ok ? " ok" : " scanning") + '">' +
          faceScanArt(ok) +
          (ok ? '<div class="face-ok">✓</div>' : "") +
        "</div>" +
        "<h2>" + (ok ? "Rostro reconocido" : "Autenticación por rostro") + "</h2>" +
        '<p class="muted">' + (ok ? esc(SIM.CIUDADANO.nombre) : "Mantén la mirada al frente…") + "</p>" +
      "</div>"
    );
  }

  function faceScanArt(ok, variant) {
    const agente = variant === "agente";
    const p = agente ? "-ag" : "";
    const shirtA = agente ? "#003366" : "#1A4A7A";
    const shirtB = agente ? "#0A192F" : "#003366";
    const hair = agente ? "#3B2418" : "#2C1B14";
    const hairDark = agente ? "#24160F" : "#1A100C";
    return (
      '<svg class="face-art" viewBox="0 0 220 280" role="img" aria-label="Persona con escáner facial">' +
        '<defs>' +
          '<linearGradient id="skin' + p + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F0C8A0"/><stop offset="1" stop-color="#E0B089"/></linearGradient>' +
          '<linearGradient id="shirt' + p + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + shirtA + '"/><stop offset="1" stop-color="' + shirtB + '"/></linearGradient>' +
          '<linearGradient id="beam' + p + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DAA520" stop-opacity="0"/><stop offset=".45" stop-color="#DAA520" stop-opacity=".55"/><stop offset="1" stop-color="#DAA520" stop-opacity="0"/></linearGradient>' +
        "</defs>" +
        '<rect width="220" height="280" fill="#0A192F"/>' +
        '<ellipse cx="110" cy="248" rx="78" ry="28" fill="#06101C"/>' +
        '<path d="M38 268c8-42 28-70 72-70s64 28 72 70" fill="url(#shirt' + p + ')"/>' +
        '<path d="M110 198v22" stroke="#C9A07A" stroke-width="16" stroke-linecap="round"/>' +
        '<ellipse cx="110" cy="118" rx="46" ry="56" fill="url(#skin' + p + ')"/>' +
        '<path d="M68 96c8-38 66-40 84-2 2 8-8 14-16 10-14-6-38-6-52 0-8 4-18-2-16-8z" fill="' + hair + '"/>' +
        '<path d="M72 86c10-22 56-24 68 2-20-8-44-8-68-2z" fill="' + hairDark + '"/>' +
        '<ellipse cx="92" cy="120" rx="5" ry="6" fill="#2A1C16"/>' +
        '<ellipse cx="128" cy="120" rx="5" ry="6" fill="#2A1C16"/>' +
        '<circle cx="94" cy="119" r="1.6" fill="#F7E7C8"/>' +
        '<circle cx="130" cy="119" r="1.6" fill="#F7E7C8"/>' +
        '<path d="M110 128v14" stroke="#C9A07A" stroke-width="2.2" stroke-linecap="round"/>' +
        '<path d="M102 152q8 8 16 0" stroke="#B36A5E" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
        '<path d="M84 112q8-5 14 0" stroke="#2A1C16" stroke-width="1.5" fill="none"/>' +
        '<path d="M122 112q8-5 14 0" stroke="#2A1C16" stroke-width="1.5" fill="none"/>' +
        '<g class="scan-grid" opacity="' + (ok ? "0" : ".45") + '" stroke="#DAA520" stroke-width=".7" fill="none">' +
          '<ellipse cx="110" cy="118" rx="40" ry="48"/>' +
          '<ellipse cx="110" cy="118" rx="28" ry="34"/>' +
          '<path d="M70 118h80M110 72v92M82 90l56 56M138 90L82 146"/>' +
        "</g>" +
        '<g fill="none" stroke="' + (ok ? "#FFF8DC" : "#DAA520") + '" stroke-width="3" stroke-linecap="round">' +
          '<path d="M48 78v-18h18"/><path d="M172 78v-18h-18"/><path d="M48 202v18h18"/><path d="M172 202v18h-18"/>' +
        "</g>" +
        (ok ? "" : '<rect class="scan-beam" x="62" y="70" width="96" height="36" fill="url(#beam' + p + ')" rx="6"/>') +
      "</svg>"
    );
  }

  function citizenLocating() {
    return (
      '<div class="gps-screen">' +
        '<div class="gps-pulse">' + icon("map") + "</div>" +
        "<h2>Detectando zona</h2>" +
        '<p class="muted">Usando GPS para ubicar tu estacionamiento en Loja…</p>' +
      "</div>"
    );
  }

  function citizenWelcome(db) {
    const activa = SIM.sesionActiva(db);
    const cta = activa
      ? '<button class="btn btn-soft btn-full" data-action="screen" data-screen="session">Estacionamiento en curso — ver sesión</button>'
      : '<button class="btn btn-start" data-action="estacionar">Estacionar</button>';
    return (
      '<div class="app-head"><div><div class="hello">Hola, ' + esc(SIM.CIUDADANO.nombre.split(" ")[0]) + '</div><h2>SIMERT</h2></div>' +
        '<button class="btn-ghost btn-sm" type="button" data-action="citizen-logout">Salir</button></div>' +
      '<div class="app-hero">' +
        '<img src="img/parqueo.jpg" alt="Parqueo en calle del centro de Loja">' +
        '<div class="hero-cap">' +
          "<strong>SIMERT Inteligente</strong>" +
          "<span>Loja · estacionamiento digital</span>" +
        "</div>" +
      "</div>" +
      '<p class="muted" style="font-size:13px;margin:0 0 14px">Inicia, paga y controla tu parqueadero en el centro de Loja.</p>' +
      '<div style="display:grid;gap:10px">' + cta +
        '<button class="btn-ghost btn-full" data-action="screen" data-screen="history">Historial</button>' +
      "</div>"
    );
  }

  function citizenHome(db) {
    const v = db.vehiculos.find(function (x) { return x.placa === db.placaActiva; }) || db.vehiculos[0];
    const z = SIM.zona(db.zonaActiva);
    return (
      '<div class="app-head"><div><div class="hello">Hola, ' + esc(SIM.CIUDADANO.nombre.split(" ")[0]) + "</div><h2>SIMERT</h2></div></div>" +
      '<article class="vehicle-card vehicle-pick">' +
        '<div class="hello">Matrícula seleccionada automáticamente</div>' +
        '<div class="plate-lg">' + esc(v.placa) + "</div>" +
        '<div class="field" style="width:100%;margin:10px 0 0">' +
          "<label>Tus vehículos registrados</label>" +
          '<select data-action="placa-select">' +
            db.vehiculos.map(function (car) {
              const tag = car.principal ? " · principal" : "";
              return '<option value="' + esc(car.placa) + '"' + (car.placa === db.placaActiva ? " selected" : "") + ">" +
                esc(car.placa) + " · " + esc(car.alias) + tag + "</option>";
            }).join("") +
          "</select>" +
        "</div>" +
        '<div class="muted" style="font-size:12px;margin-top:6px">' + esc(v.alias) + " · " + esc(v.color) + " · " + v.anio + "</div>" +
      "</article>" +
      '<article class="zone-card">' +
        '<div class="hello">La app detectó tu zona mediante GPS</div>' +
        "<h3>" + esc(z.nombre) + "</h3>" +
        '<ul class="zone-lines">' +
          "<li>Tarifa: <b>" + SIM.money(z.tarifaHora) + "/h</b></li>" +
          "<li>Máximo: <b>" + z.maxHoras + " h</b></li>" +
        "</ul>" +
      "</article>" +
      '<button class="btn btn-start" data-action="start">Iniciar estacionamiento</button>'
    );
  }

  function citizenMap(db) {
    const z = SIM.zona(db.zonaActiva);
    const oc = SIM.ocupacionZona(db, z.id);
    return (
      '<div class="app-head"><h2>Plazas en vivo</h2><span class="pill ok">' + oc.libres + " libres</span></div>" +
      '<p class="muted" style="font-size:13px;margin-bottom:8px">Sensores en ' + esc(z.nombre) + ". Verde = libre · rojo = ocupado.</p>" +
      '<div class="mini-map" id="map-full" style="height:420px"></div>'
    );
  }

  function citizenSession(db) {
    const sesion = SIM.sesionActiva(db);
    if (!sesion) {
      if (ui.receipt) return citizenReceipt(ui.receipt);
      return (
        '<div class="empty"><p>No tienes un estacionamiento activo.</p>' +
        '<button class="btn btn-start" style="margin-top:14px" data-action="screen" data-screen="home">Ir a iniciar</button></div>'
      );
    }
    const info = SIM.estadoSesion(sesion);
    const color = info.validez === "expirado" ? "var(--red)" : "var(--navy)";
    const alerta = info.remaining > 0 && info.remaining <= 10 * 60000
      ? '<div class="alert-banner">Te quedan ' + SIM.formatDuration(info.remaining) + " del máximo de la zona.</div>"
      : "";
    const skip = ui.skipping
      ? '<div class="skip-overlay"><div><b>Simulando el tiempo</b><p>El estacionamiento avanza hasta el aviso…</p><div class="time-bar"><span></span></div></div></div>'
      : "";
    const offer = !ui.skipping && ui.extendOffer
      ? '<div class="extend-card">' +
          '<div class="hello">Notificación SIMERT</div>' +
          "<b>Tu tiempo está a 30 minutos de terminar</b>" +
          "<p>Máximo de " + esc(info.zona.nombre) + ". ¿Deseas aumentar 30 minutos más?</p>" +
          '<div class="extend-actions">' +
            '<button class="btn btn-start" data-action="extend-yes">Sí, aumentar 30 min</button>' +
            '<button class="btn btn-ghost btn-full" data-action="extend-no">Ahora no</button>' +
          "</div>" +
        "</div>"
      : "";
    return (
      '<div class="session-wrap">' + skip +
      '<div class="app-head"><span class="pill ok">En curso</span><span class="pill dark">' + esc(sesion.placa) + "</span></div>" +
      offer +
      alerta +
      '<div class="session-hero">' +
        '<div class="hello">' + esc(info.zona.nombre) + " · plaza " + esc(sesion.plazaId) + "</div>" +
        '<div class="ring-wrap">' + ringSvg(info.pct, color) +
          '<div class="ring-center"><div class="t" data-live="elapsed">' + SIM.formatDuration(info.elapsed) + "</div>" +
          '<div class="c" data-live="cost">' + SIM.money(info.costo) + "</div></div>" +
        "</div>" +
        '<div class="muted" style="font-size:12px">Pagas solo el tiempo utilizado.</div>' +
      "</div>" +
      '<div class="kpi-mini">' +
        '<div><div class="lbl">Inicio</div><div class="val" data-live="inicio">' + SIM.formatClock(sesion.inicio) + "</div></div>" +
        '<div><div class="lbl">Máximo hasta</div><div class="val" data-live="maximo">' + SIM.formatClock(sesion.inicio + info.maxMs) + "</div></div>" +
      "</div>" +
      '<button class="btn btn-stop" data-action="stop"' + (ui.skipping || ui.extendOffer ? " disabled" : "") + ">Terminar</button>" +
      "</div>"
    );
  }

  function citizenCheckout(db) {
    const c = ui.checkout;
    if (!c) return citizenHome(db);
    const metodo = SIM.METODOS_PAGO.find(function (m) { return m.id === db.metodoPago; });
    return (
      '<div class="pay-screen">' +
        "<h2>Cobro del estacionamiento</h2>" +
        '<p class="muted">El sistema calcula el tiempo usado y genera el cobro.</p>' +
        '<article class="list-card">' +
          '<div class="list-row"><span>Matrícula</span><b class="mono">' + esc(c.sesion.placa) + "</b></div>" +
          '<div class="list-row"><span>Zona</span><b>' + esc(c.zona.nombre) + "</b></div>" +
          '<div class="list-row"><span>Tiempo</span><b>' + SIM.formatDuration(c.elapsed) + "</b></div>" +
          '<div class="list-row"><span>Tarifa</span><b>' + SIM.money(c.zona.tarifaHora) + "/h</b></div>" +
          '<div class="list-row"><span>Método</span><b>' + esc(metodo ? metodo.etiqueta : "") + "</b></div>" +
        "</article>" +
        '<div class="pay-total">Total a pagar<div class="amount">' + SIM.money(c.costo) + "</div></div>" +
        '<button class="btn btn-start" data-action="pay">Pagar ' + SIM.money(c.costo) + "</button>" +
      "</div>"
    );
  }

  function citizenPaying() {
    const c = ui.checkout;
    return (
      '<div class="gps-screen">' +
        '<div class="spin"></div>' +
        "<h2>Procesando pago</h2>" +
        '<p class="muted">Cobrado ' + SIM.money(c ? c.costo : 0) + " · un momento…</p>" +
      "</div>"
    );
  }

  function citizenReceipt(rec) {
    if (!rec) return '<div class="empty">No hay comprobante.</div>';
    const sesion = rec.sesion || {};
    const zona = rec.zona || {};
    const metodo = SIM.METODOS_PAGO.find(function (m) { return m.id === sesion.metodo; });
    const fin = sesion.fin || (sesion.inicio + (rec.elapsed || 0));
    return (
      '<div class="result-screen">' +
        '<div class="check"><svg width="40" height="40" viewBox="0 0 24 24" fill="none"><path d="M5 12.5 9.5 17 19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></div>' +
        "<div class=\"hello\">Pago realizado</div>" +
        '<div class="amount">' + SIM.money(rec.costo) + "</div>" +
        '<p class="muted">' + esc(zona.nombre) + " · " + SIM.formatDuration(fin - sesion.inicio) + "<br>" +
        SIM.formatClock(sesion.inicio) + " → " + SIM.formatClock(fin) + "<br>" +
        esc(metodo ? metodo.etiqueta : sesion.metodo || "") + "</p>" +
        '<button class="btn btn-navy btn-full" style="margin-top:18px" data-action="close-receipt">Listo</button>' +
      "</div>"
    );
  }

  function citizenVehicles(db) {
    return (
      '<div class="app-head"><h2>Vehículos</h2></div>' +
      db.vehiculos.map(function (v) {
        const on = v.placa === db.placaActiva;
        return (
          '<article class="vehicle-card">' +
            '<div><div class="plate-lg">' + esc(v.placa) + '</div><div class="muted" style="font-size:12px;margin-top:4px">' + esc(v.alias) + " · " + esc(v.color) + " · " + v.anio + "</div></div>" +
            (on ? '<span class="pill ok">Principal</span>' : '<button class="btn-soft btn-sm" data-action="placa" data-placa="' + v.placa + '">Usar</button>') +
          "</article>"
        );
      }).join("") +
      '<p class="muted" style="font-size:12px">El controlador identifica el auto por la matrícula, no por una tarjeta.</p>'
    );
  }

  function citizenAccount(db) {
    const metodo = SIM.METODOS_PAGO.find(function (m) { return m.id === db.metodoPago; });
    return (
      '<div class="app-head"><h2>Tu cuenta</h2></div>' +
      '<article class="list-card">' +
        "<b>" + esc(SIM.CIUDADANO.nombre) + "</b>" +
        '<div class="muted" style="font-size:13px">Cédula ' + esc(SIM.CIUDADANO.cedula) + "<br>" + esc(SIM.CIUDADANO.telefono) + "</div>" +
      "</article>" +
      '<article class="list-card">' +
        '<div class="list-row"><span>Saldo SIMERT</span><b>' + SIM.money(db.saldo) + "</b></div>" +
        '<div class="field"><label>Método de pago</label><select data-action="pago">' +
          SIM.METODOS_PAGO.map(function (m) {
            return '<option value="' + m.id + '"' + (m.id === db.metodoPago ? " selected" : "") + ">" + esc(m.etiqueta) + "</option>";
          }).join("") +
        "</select></div>" +
        '<div class="muted" style="font-size:12px">Activo: ' + esc(metodo ? metodo.etiqueta : "") + "</div>" +
      "</article>" +
      '<button class="btn-ghost btn-full" data-action="screen" data-screen="history">Historial de estacionamientos</button>' +
      '<button class="btn btn-stop" style="margin-top:10px" type="button" data-action="citizen-logout">Salir</button>'
    );
  }

  function citizenHistory(db) {
    const rows = db.historial.slice(0, 8);
    if (!rows.length) return '<div class="empty">Aún no hay pagos en esta demo.</div>';
    return (
      '<div class="app-head"><h2>Historial</h2></div>' +
      '<article class="list-card">' +
        rows.map(function (h) {
          const z = SIM.zona(h.zonaId);
          return '<div class="list-row"><div>' + esc(h.placa) + "<br><span class=\"muted\">" + esc(z.nombre) + " · " + SIM.formatDateTime(h.inicio) + "</span></div><b>" + SIM.money(h.costo) + "</b></div>";
        }).join("") +
      "</article>"
    );
  }

  function citizenNotifs(db) {
    return (
      '<div class="app-head"><h2>Alertas</h2></div>' +
      (db.notificaciones.length ? '<article class="list-card">' + db.notificaciones.map(function (n) {
        return '<div class="list-row"><div><b>' + esc(n.titulo) + "</b><br><span class=\"muted\">" + esc(n.texto) + "</span></div><span class=\"muted\">" + SIM.formatClock(n.t) + "</span></div>";
      }).join("") + "</article>" : '<div class="empty">Sin alertas. Te avisaremos 10 y 5 minutos antes del máximo.</div>')
    );
  }

  function citizenScreen(db) {
    if (ui.screen === "face") return citizenFace();
    if (!ui.loggedIn || ui.screen === "login") return citizenLogin();
    if (ui.screen === "locating") return citizenLocating();
    if (ui.screen === "checkout") return citizenCheckout(db);
    if (ui.screen === "paying") return citizenPaying();
    if (ui.screen === "receipt") return citizenReceipt(ui.receipt);
    if (ui.screen === "map") return citizenMap(db);
    if (ui.screen === "session") return citizenSession(db);
    if (ui.screen === "account") return citizenAccount(db);
    if (ui.screen === "vehicles") return citizenVehicles(db);
    if (ui.screen === "history") return citizenHistory(db);
    if (ui.screen === "notifs") return citizenNotifs(db);
    if (ui.screen === "welcome") return citizenWelcome(db);
    return citizenHome(db);
  }

  function navFromScreen(screen) {
    if (screen === "map") return "map";
    if (screen === "session" || screen === "history") return "session";
    if (screen === "account" || screen === "vehicles" || screen === "notifs") return "account";
    return "welcome";
  }

  function gatedScreen(screen) {
    return !ui.loggedIn || ["login", "face", "locating", "session", "checkout", "paying", "receipt"].indexOf(screen) !== -1;
  }

  function viewCiudadano() {
    const db = SIM.load();
    const inner = citizenScreen(db);
    const nav = gatedScreen(ui.screen) ? null : navFromScreen(ui.screen);
    return phoneChrome(inner, nav);
  }

  function agentValidResult() {
    return {
      placa: "LOJ-2048",
      titular: SIM.CIUDADANO.nombre,
      zona: "Zona Centro",
      plazaId: "C-05",
      inicio: "15:40",
      elapsed: "2 h 40 min",
      costo: "$1,34"
    };
  }

  function agentVerdictCard() {
    if (ui.consulta) {
      const c = ui.consulta.consulta;
      const info = ui.consulta.info;
      const sesion = ui.consulta.sesion;
      const cls = c.resultado;
      const titles = {
        valido: "Estacionamiento válido",
        expirado: "Tiempo máximo agotado",
        sin_ticket: "Sin estacionamiento activo",
        ocupado_sin_ticket: "Ocupado · sin ticket digital"
      };
      const extra = sesion && info
        ? "<p>" + esc(sesion.titular) + "<br>" + esc(info.zona.nombre) + " · plaza " + esc(sesion.plazaId) +
          "<br>Desde " + SIM.formatClock(sesion.inicio) + " · " + SIM.formatDuration(info.elapsed) +
          "<br>A pagar " + SIM.money(info.costo) + "</p>"
        : "<p>" + esc(c.detalle) + "</p>";
      return (
        '<div class="verdict ' + cls + '"><div class="mono" style="opacity:.8">' + esc(c.placa) + "</div>" +
          "<h3>" + (titles[cls] || cls) + "</h3>" + extra + "</div>"
      );
    }
    const r = agentValidResult();
    return (
      '<div class="verdict valido">' +
        '<div class="mono" style="opacity:.8">' + esc(r.placa) + "</div>" +
        "<h3>Estacionamiento válido</h3>" +
        "<p>" + esc(r.titular) + "<br>" +
          esc(r.zona) + " · plaza " + esc(r.plazaId) + "<br>" +
          "Desde " + esc(r.inicio) + " · " + esc(r.elapsed) + "<br>" +
          "A pagar " + esc(r.costo) +
        "</p>" +
      "</div>"
    );
  }

  function agentFinder() {
    const state = ui.agentCamState || "live";
    const capturing = state === "capturing";
    return (
      '<div class="cam-finder' + (capturing ? " capturing" : "") + '">' +
        '<div class="cam-hud"><span class="cam-rec"></span><span>SIMERT CAM</span></div>' +
        '<div class="reticle' + (capturing ? " scanning" : "") + '"></div>' +
        '<div class="finder-label">Apunta a la matrícula</div>' +
        (capturing ? '<div class="cam-flash"></div>' : "") +
      "</div>"
    );
  }

  function agentControl() {
    const db = SIM.load();
    const showResult = ui.agentCamState === "ok" || ui.consulta;
    const busy = ui.agentCamState === "capturing";
    const validas = db.consultas.filter(function (q) { return q.resultado === "valido"; }).slice(0, 4);
    return (
      '<div class="app-head"><div><div class="hello">' + esc(SIM.AGENTE.unidad) + "</div><h2>Control</h2></div>" +
        '<button class="btn-ghost btn-sm" type="button" data-action="agent-screen" data-screen="welcome">Volver</button></div>' +
      '<p class="muted" style="font-size:13px;margin-bottom:8px">' + esc(SIM.AGENTE.nombre) + " · " + esc(SIM.AGENTE.placa) + " · no revisa tarjetas, consulta la placa.</p>" +
      (showResult ? agentVerdictCard() : agentFinder()) +
      '<button class="btn btn-gold btn-full" type="button" data-action="scan"' + (busy ? " disabled" : "") + ">Escanear matrícula cercana</button>" +
      '<div class="field" style="margin-top:12px"><label>O ingresa la placa</label>' +
        '<div style="display:flex;gap:8px">' +
          '<input id="placa-in" placeholder="GAA-4410" value="GAA-4410" maxlength="8" style="flex:1">' +
          '<button class="btn btn-navy" type="button" data-action="lookup">Ver</button>' +
        "</div></div>" +
      '<div class="zone-meta" style="margin:10px 0">' +
        '<button class="pill ok" type="button" data-action="quick" data-placa="GAA-4410">GAA-4410</button>' +
      "</div>" +
      '<article class="list-card"><div class="hello">Últimas consultas</div>' +
        (validas.map(function (q) {
          return '<div class="list-row"><span class="mono">' + esc(q.placa) + '</span><span class="pill ok">válido</span></div>';
        }).join("") || '<div class="muted">Aún no hay lecturas en esta demo.</div>') +
      "</article>"
    );
  }

  function agentWelcome() {
    return (
      '<div class="app-head"><div><div class="hello">' + esc(SIM.AGENTE.unidad) + '</div><h2>SIMERT</h2></div>' +
        '<button class="btn-ghost btn-sm" type="button" data-action="agent-logout">Salir</button></div>' +
      '<div class="app-hero">' +
        '<img src="img/parqueo.jpg" alt="Parqueo en calle del centro de Loja">' +
        '<div class="hero-cap">' +
          "<strong>SIMERT Inteligente</strong>" +
          "<span>Loja · control de estacionamiento</span>" +
        "</div>" +
      "</div>" +
      '<p class="muted" style="font-size:13px;margin:0 0 14px">Consulta placas en vía. No revisa tarjetas, verifica el ticket digital.</p>' +
      '<div style="display:grid;gap:10px">' +
        '<button class="btn btn-start" type="button" data-action="agent-screen" data-screen="home">Iniciar control</button>' +
      "</div>"
    );
  }

  function viewAgente() {
    if (ui.agentScreen === "face") return phoneChrome(agentFace(), null);
    if (!ui.agentLoggedIn || ui.agentScreen === "login") return phoneChrome(agentLogin(), null);
    if (ui.agentScreen === "welcome") return phoneChrome(agentWelcome(), null);
    return phoneChrome(agentControl(), null);
  }

  function agentLogin() {
    return (
      '<div class="login-screen">' +
        '<div class="logo-mark" style="margin:8px auto 12px">' + logoSvg() + "</div>" +
        "<h2>Acceso agentes</h2>" +
        '<p class="muted">Control SIMERT · Municipio de Loja</p>' +
        '<button class="btn btn-start" data-action="agent-face-start" style="margin-top:22px">' +
          '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true"><ellipse cx="12" cy="9" rx="4.2" ry="5" stroke="currentColor" stroke-width="1.7"/><path d="M5 19c1.4-3.2 3.6-4.8 7-4.8s5.6 1.6 7 4.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M4 8.5c2-3 5-4 8-4M20 8.5c-2-3-5-4-8-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>' +
          " Desbloquear con el rostro" +
        "</button>" +
        '<p class="muted" style="margin:16px 0 10px;font-size:12px">o entra con tu usuario institucional</p>' +
        '<form data-form="agent-login">' +
          '<div class="field"><label>Usuario</label>' +
            '<input name="user" value="' + esc(SIM.AGENTE.usuario) + '" autocomplete="username"></div>' +
          '<div class="field"><label>Contraseña</label>' +
            '<input name="pass" type="password" value="' + esc(SIM.AGENTE.password) + '" autocomplete="current-password"></div>' +
          '<button class="btn btn-navy btn-full" type="submit">Entrar con contraseña</button>' +
        "</form>" +
      "</div>"
    );
  }

  function agentFace() {
    const ok = ui.agentFaceState === "ok";
    return (
      '<div class="face-screen">' +
        '<p class="hello">' + (ok ? "Identidad confirmada" : "Escaneando tu rostro") + "</p>" +
        '<div class="face-stage' + (ok ? " ok" : " scanning") + '">' +
          faceScanArt(ok, "agente") +
          (ok ? '<div class="face-ok">✓</div>' : "") +
        "</div>" +
        "<h2>" + (ok ? "Agente reconocido" : "Validación de agente") + "</h2>" +
        '<p class="muted">' + (ok ? esc(SIM.AGENTE.nombre) + " · " + esc(SIM.AGENTE.placa) : "Comparando con el registro de control…") + "</p>" +
      "</div>"
    );
  }

  function viewAdmin() {
    if (!ui.adminLoggedIn || ui.adminScreen === "login") return adminGate(adminLogin());
    const db = SIM.load();
    const oc = SIM.ocupacionGlobal(db);
    const rec = SIM.recaudacionHoy(db);
    const activas = db.sesiones.filter(function (s) { return s.status === "activa"; });
    const kpis = [
      ["Ocupación de sensores", oc.pct + "%", oc.ocupadas + " de " + oc.total + " plazas"],
      ["Sesiones Start & Stop", String(activas.length), "estacionamientos digitales activos"],
      ["Recaudación del día", SIM.money(rec.total), rec.tickets + " pagos · " + SIM.money(rec.enCurso) + " en curso"],
      ["Controles en vía", String(db.consultas.length), "lecturas de placa en esta demo"]
    ];
    const zonasRows = SIM.ZONAS.map(function (z) {
      const o = SIM.ocupacionZona(db, z.id);
      const pct = Math.round(o.ocupadas * 100 / o.total);
      const cls = pct >= 80 ? "hot" : pct >= 50 ? "" : "ok";
      return "<tr><td><b>" + esc(z.nombre) + '</b><br><span class="muted">' + esc(z.tipo) + "</span></td>" +
        "<td class=\"mono\">" + SIM.money(z.tarifaHora) + "/h</td>" +
        "<td>" + o.libres + " / " + o.total + '</td><td><div class="bar ' + cls + '"><span style="width:' + pct + '%"></span></div></td></tr>';
    }).join("");
    const sesRows = activas.slice(0, 8).map(function (s) {
      const info = SIM.estadoSesion(s);
      const pill = info.validez === "expirado" ? "warn" : "ok";
      return "<tr><td class=\"mono\">" + esc(s.placa) + "</td><td>" + esc(info.zona.nombre) + "</td><td>" + esc(s.plazaId) +
        "</td><td data-live-sesion=\"" + s.id + "\">" + SIM.formatDuration(info.elapsed) + "</td>" +
        "<td><span class=\"pill " + pill + "\">" + (info.validez === "expirado" ? "máximo" : "activo") + "</span></td></tr>";
    }).join("");
    return (
      '<div class="admin-solo"><div class="admin-wrap">' +
        '<div class="admin-head">' +
          '<div class="brand"><div class="logo-mark">' + logoSvg() + "</div><div>" +
            "<h1>Tablero SIMERT · Municipio de Loja</h1>" +
            "<p class=\"muted\">" + esc(SIM.ADMIN.nombre) + " · " + esc(SIM.ADMIN.cargo) + "</p></div></div>" +
          '<div class="admin-head-actions">' +
            '<div class="live"><span class="dot"></span> Sensores en vivo</div>' +
            '<button class="btn btn-ghost btn-sm" type="button" data-action="admin-logout">Cerrar sesión</button>' +
          "</div>" +
        "</div>" +
        '<section class="kpis">' + kpis.map(function (k) {
          return '<article class="kpi"><div class="lbl">' + k[0] + '</div><div class="val">' + k[1] + "</div><p class=\"muted\">" + k[2] + "</p></article>";
        }).join("") + "</section>" +
        '<div class="admin-grid">' +
          '<article class="card"><h3>Mapa de sensores</h3><p class="muted" style="margin-bottom:8px">Cada punto es un sensor de plaza. Verde libre, rojo ocupado, dorado sesión digital.</p>' +
            '<div class="admin-map" id="map-admin"></div></article>' +
          '<article class="card"><h3>Actividad en tiempo real</h3>' +
            '<div class="feed">' + db.eventos.slice(0, 12).map(function (e) {
              const pill = e.nivel === "ok" ? "ok" : e.nivel === "bad" ? "bad" : e.nivel === "warn" ? "warn" : "info";
              return '<div class="feed-item"><div><span class="pill ' + pill + '">' + esc(e.tipo) + "</span> " + esc(e.texto) +
                "</div><time>" + SIM.formatClockSec(e.t) + "</time></div>";
            }).join("") + "</div></article>" +
        "</div>" +
        '<div class="admin-grid" style="margin-top:14px">' +
          '<article class="card"><h3>Ocupación por zona</h3>' +
            '<div class="table-wrap"><table><thead><tr><th>Zona</th><th>Tarifa</th><th>Libres</th><th></th></tr></thead><tbody>' +
            zonasRows + "</tbody></table></div></article>" +
          '<article class="card"><h3>Sesiones activas</h3>' +
            '<div class="table-wrap"><table><thead><tr><th>Placa</th><th>Zona</th><th>Plaza</th><th>Tiempo</th><th></th></tr></thead><tbody>' +
            (sesRows || "<tr><td colspan=\"5\" class=\"muted\">Nadie está usando Start & Stop ahora.</td></tr>") +
            "</tbody></table></div></article>" +
        "</div>" +
      "</div></div>"
    );
  }

  function adminGate(inner) {
    return (
      '<div class="admin-solo admin-login">' +
        '<div class="flagbar"><span></span><span></span><span></span><span></span><span></span></div>' +
        '<div class="admin-login-card">' + inner + "</div>" +
      "</div>"
    );
  }

  function adminLogin() {
    return (
      '<div class="login-screen">' +
        '<div class="logo-mark" style="margin:8px auto 12px">' + logoSvg() + "</div>" +
        "<h2>Acceso municipal</h2>" +
        '<p class="muted">Tablero SIMERT · ' + esc(SIM.ADMIN.area) + "</p>" +
        '<form data-form="admin-login">' +
          '<div class="field"><label>Usuario</label>' +
            '<input name="user" value="' + esc(SIM.ADMIN.usuario) + '" autocomplete="username"></div>' +
          '<div class="field"><label>Contraseña</label>' +
            '<input name="pass" type="password" value="' + esc(SIM.ADMIN.password) + '" autocomplete="current-password"></div>' +
          '<button class="btn btn-navy btn-full" type="submit">Entrar al tablero</button>' +
        "</form>" +
      "</div>"
    );
  }

  function viewLanding() {
    return (
      '<div class="flagbar"><span></span><span></span><span></span><span></span><span></span></div>' +
      '<div class="gate">' +
        '<div class="brand gate-brand"><div class="logo-mark">' + logoSvg() + "</div>" +
          "<div><h1>SIMERT Inteligente</h1><small>Municipio de Loja</small></div></div>" +
        '<p class="gate-lead">Estacionamiento inteligente para Loja. Inicia, paga y controla desde el celular.</p>' +
        '<div class="gate-actions">' +
          '<a class="btn btn-gate" href="#/app">' + icon("phone") + " App del ciudadano</a>" +
          '<a class="btn btn-gate" href="#/agente">' + icon("shield") + " App del agente</a>" +
          '<a class="btn btn-gate" href="#/admin">' + icon("board") + " Tablero del municipio</a>" +
        "</div>" +
      "</div>"
    );
  }

  function markerHtml(plaza, db) {
    const sesion = db.sesiones.find(function (s) { return s.status === "activa" && s.plazaId === plaza.id; });
    let color = "#2C6B44";
    if (plaza.ocupada && sesion) color = "#DAA520";
    else if (plaza.ocupada) color = "#8B0000";
    return L.divIcon({
      className: "sim-m",
      html: '<div style="width:14px;height:14px;border-radius:50%;background:' + color + ';border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.35)"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7]
    });
  }

  function bindMap(id, db, opts) {
    const el = document.getElementById(id);
    if (!el || typeof L === "undefined") return;
    if (maps[id]) {
      maps[id].remove();
      maps[id] = null;
    }
    const z = SIM.zona(db.zonaActiva);
    const center = opts && opts.admin ? [-3.9962, -79.2055] : [z.lat, z.lng];
    const zoom = opts && opts.admin ? 15 : 17;
    const map = L.map(el, { zoomControl: opts && opts.admin, attributionControl: false, dragging: true, scrollWheelZoom: false });
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { maxZoom: 19 }).addTo(map);
    const plazas = opts && opts.admin ? db.plazas : db.plazas.filter(function (p) { return p.zonaId === db.zonaActiva; });
    plazas.forEach(function (p) {
      const m = L.marker([p.lat, p.lng], { icon: markerHtml(p, db) }).addTo(map);
      const occ = p.ocupada ? (p.placa || "ocupada") : "libre";
      m.bindPopup("<b>" + p.id + "</b><br>" + occ);
    });
    L.circleMarker([SIM.GPS_DEMO.lat, SIM.GPS_DEMO.lng], {
      radius: 8, color: "#003366", fillColor: "#003366", fillOpacity: 0.9, weight: 2
    }).addTo(map).bindPopup("Tu ubicación (demo GPS)");
    map.setView(center, zoom);
    setTimeout(function () { map.invalidateSize(); }, 80);
    maps[id] = map;
  }

  function initMaps() {
    const db = SIM.load();
    const r = route().view;
    if (r === "app" && ui.screen === "home") bindMap("map-mini", db, {});
    if (r === "app" && ui.screen === "map") bindMap("map-full", db, {});
    if (r === "admin") bindMap("map-admin", db, { admin: true });
  }

  function view() {
    const r = route().view;
    if (r === "app") return viewCiudadano();
    if (r === "agente") return viewAgente();
    if (r === "admin") return viewAdmin();
    return viewLanding();
  }

  function render() {
    const r = route().view;
    document.body.classList.toggle("is-app", r === "app" || r === "agente");
    document.body.classList.toggle("is-admin", r === "admin");
    root.innerHTML = view();
    initMaps();
    paintLive();
  }

  function paintLive() {
    const db = SIM.load();
    document.querySelectorAll("[data-live]").forEach(function (el) {
      const k = el.getAttribute("data-live");
      if (k === "clock") el.textContent = SIM.formatClockSec(SIM.now());
      const sesion = SIM.sesionActiva(db);
      if (!sesion) return;
      const info = SIM.estadoSesion(sesion);
      if (k === "elapsed") el.textContent = SIM.formatDuration(info.elapsed);
      if (k === "cost") el.textContent = SIM.money(info.costo);
      if (k === "inicio") el.textContent = SIM.formatClock(sesion.inicio);
      if (k === "maximo") el.textContent = SIM.formatClock(sesion.inicio + info.maxMs);
    });
  }

  function stopAgentCamera() {
    if (ui.agentCamTimer) {
      clearTimeout(ui.agentCamTimer);
      ui.agentCamTimer = null;
    }
  }

  function resetAgentCamera() {
    stopAgentCamera();
    ui.agentCamState = "live";
    ui.agentSnap = null;
    ui.consulta = null;
    ui.scanning = false;
  }

  function registrarConsultaDemo() {
    const db = SIM.load();
    db.consultas.unshift({
      id: SIM.uid("q"),
      t: SIM.now(),
      placa: "LOJ-2048",
      resultado: "valido",
      detalle: "Estacionamiento Start & Stop en curso. El ciudadano paga solo el tiempo usado.",
      agente: SIM.AGENTE.placa,
      origen: "camara",
      sesionId: null,
      plazaId: "C-05"
    });
    db.consultas = db.consultas.slice(0, 30);
    SIM.pushEvento(db, "control", "Control LOJ-2048 · valido", "ok");
    SIM.save(db);
  }

  function onAgentPhoto() {
    if (ui.agentCamState === "capturing" || ui.agentCamState === "analyzing") return;
    ui.consulta = null;
    ui.agentSnap = null;
    ui.agentCamState = "capturing";
    render();
    if (ui.agentCamTimer) clearTimeout(ui.agentCamTimer);
    ui.agentCamTimer = setTimeout(function () {
      registrarConsultaDemo();
      ui.agentCamState = "ok";
      ui.agentCamTimer = null;
      render();
    }, 400);
  }

  function consultar(placa, origen) {
    const db = SIM.load();
    ui.consulta = SIM.consultarPlaca(db, placa, origen);
    ui.scanning = false;
    render();
  }

  function onFaceStart() {
    ui.screen = "face";
    ui.faceState = "scanning";
    render();
    if (ui.faceTimer) clearTimeout(ui.faceTimer);
    ui.faceTimer = setTimeout(function () {
      ui.faceState = "ok";
      render();
      ui.faceTimer = setTimeout(function () {
        onLogin();
      }, 1000);
    }, 2300);
  }

  function onLogin() {
    ui.loggedIn = true;
    ui.screen = "welcome";
    ui.faceState = "idle";
    const db = SIM.load();
    db.placaActiva = "LOJ-2048";
    db.zonaActiva = "centro";
    SIM.save(db);
    render();
  }

  function onEstacionar() {
    ui.screen = "locating";
    render();
    if (ui.locateTimer) clearTimeout(ui.locateTimer);
    ui.locateTimer = setTimeout(function () {
      if (!ui.loggedIn) return;
      ui.screen = "home";
      render();
    }, 2000);
  }

  function onAgentLogin() {
    ui.agentLoggedIn = true;
    ui.agentScreen = "welcome";
    ui.agentFaceState = "idle";
    render();
  }

  function onAgentFaceStart() {
    ui.agentScreen = "face";
    ui.agentFaceState = "scanning";
    render();
    if (ui.agentFaceTimer) clearTimeout(ui.agentFaceTimer);
    ui.agentFaceTimer = setTimeout(function () {
      ui.agentFaceState = "ok";
      render();
      ui.agentFaceTimer = setTimeout(function () {
        onAgentLogin();
      }, 1000);
    }, 2300);
  }

  function onAdminLogin() {
    ui.adminLoggedIn = true;
    ui.adminScreen = "home";
    render();
  }

  function onStart() {
    const db = SIM.load();
    const activa = SIM.sesionActiva(db);
    if (activa) {
      ui.screen = "session";
      render();
      return;
    }
    const res = SIM.iniciarEstacionamiento(db);
    if (!res.ok) {
      showToast("No se pudo iniciar", res.error, "warn");
      return;
    }
    ui.screen = "session";
    ui.receipt = null;
    ui.checkout = null;
    ui.extendOffer = false;
    ui.skipping = true;
    SIM.setSpeed(1);
    render();
    if (ui.skipTimer) clearTimeout(ui.skipTimer);
    ui.skipTimer = setTimeout(function () {
      const live = SIM.load();
      const s = SIM.sesionActiva(live);
      if (s) {
        const info = SIM.estadoSesion(s);
        SIM.jumpTo(s.inicio + info.maxMs - 30 * 60000);
      }
      SIM.setSpeed(1);
      ui.skipping = false;
      ui.extendOffer = true;
      SIM.pushNotif(live, "Quedan 30 minutos", "Tu máximo en la zona está por terminar. Puedes aumentar 30 minutos más.");
      SIM.save(live);
      render();
    }, 2500);
  }

  function onStop() {
    if (ui.skipping || ui.extendOffer) return;
    const db = SIM.load();
    const sesion = SIM.sesionActiva(db);
    if (!sesion) {
      showToast("No hay sesión", "No hay estacionamiento activo.", "warn");
      return;
    }
    SIM.setSpeed(1);
    const info = SIM.estadoSesion(sesion);
    ui.checkout = {
      sesion: sesion,
      zona: info.zona,
      costo: info.costo,
      elapsed: info.elapsed
    };
    ui.screen = "checkout";
    render();
  }

  function onPay() {
    if (!ui.checkout) return;
    ui.screen = "paying";
    render();
    setTimeout(function () {
      const db = SIM.load();
      const s = SIM.sesionActiva(db);
      if (s) SIM.jumpTo(s.inicio + ui.checkout.elapsed);
      const res = SIM.finalizarEstacionamiento(db);
      ui.receipt = res.ok ? res : ui.checkout;
      if (ui.receipt && !ui.receipt.costo) ui.receipt.costo = ui.checkout.costo;
      if (ui.receipt && !ui.receipt.zona) ui.receipt.zona = ui.checkout.zona;
      if (ui.receipt && !ui.receipt.sesion) ui.receipt.sesion = ui.checkout.sesion;
      ui.screen = "receipt";
      render();
    }, 1400);
  }

  root.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.getAttribute("data-action");
    if (action === "speed") {
      SIM.setSpeed(Number(btn.getAttribute("data-speed")));
      render();
    }
    if (action === "reset") {
      if (!confirm("¿Volver la demo a las 10:35 y a los datos iniciales?")) return;
      SIM.reset();
      ui.screen = "home";
      ui.consulta = null;
      ui.receipt = null;
      render();
    }
    if (action === "screen") {
      ui.screen = btn.getAttribute("data-screen");
      if (ui.screen === "notifs") {
        const db = SIM.load();
        db.notificaciones.forEach(function (n) { n.leida = true; });
        SIM.save(db);
      }
      render();
    }
    if (action === "face-start") onFaceStart();
    if (action === "agent-face-start") onAgentFaceStart();
    if (action === "agent-screen") {
      ui.agentScreen = btn.getAttribute("data-screen");
      if (ui.agentScreen === "home") {
        resetAgentCamera();
      } else {
        stopAgentCamera();
      }
      render();
    }
    if (action === "agent-logout") {
      ui.agentLoggedIn = false;
      ui.agentScreen = "login";
      ui.agentFaceState = "idle";
      resetAgentCamera();
      if (ui.agentFaceTimer) clearTimeout(ui.agentFaceTimer);
      render();
    }
    if (action === "admin-logout") {
      ui.adminLoggedIn = false;
      ui.adminScreen = "login";
      render();
    }
    if (action === "citizen-logout") {
      ui.loggedIn = false;
      ui.screen = "login";
      ui.receipt = null;
      ui.checkout = null;
      ui.skipping = false;
      ui.extendOffer = false;
      ui.faceState = "idle";
      if (ui.skipTimer) clearTimeout(ui.skipTimer);
      if (ui.faceTimer) clearTimeout(ui.faceTimer);
      if (ui.locateTimer) clearTimeout(ui.locateTimer);
      render();
    }
    if (action === "extend-yes") {
      const db = SIM.load();
      const res = SIM.extenderSesion(db, 30);
      ui.extendOffer = false;
      if (res.ok) showToast("Tiempo aumentado", "Se añadieron 30 minutos a tu máximo.", "ok");
      else render();
    }
    if (action === "extend-no") {
      ui.extendOffer = false;
      render();
    }
    if (action === "estacionar") onEstacionar();
    if (action === "start") onStart();
    if (action === "stop") onStop();
    if (action === "pay") onPay();
    if (action === "close-receipt") {
      ui.receipt = null;
      ui.checkout = null;
      ui.screen = "home";
      render();
    }
    if (action === "placa") {
      const db = SIM.load();
      if (SIM.sesionActiva(db)) {
        showToast("Sesión activa", "Finaliza el estacionamiento antes de cambiar de vehículo.", "warn");
        return;
      }
      db.placaActiva = btn.getAttribute("data-placa");
      SIM.save(db);
      ui.screen = "home";
      render();
    }
    if (action === "jump1112") {
      const db = SIM.load();
      const s = SIM.sesionActiva(db);
      if (!s) return;
      SIM.jumpTo(s.inicio + 60 * 60000);
      SIM.setSpeed(1);
      SIM.revisarAlertas(db);
      render();
    }
    if (action === "scan") onAgentPhoto();
    if (action === "agent-rescan") {
      resetAgentCamera();
      render();
    }
    if (action === "lookup") {
      const input = document.getElementById("placa-in");
      const placa = input && input.value.trim();
      if (!placa) {
        showToast("Ingresa una placa", "Aún no hay datos automáticos. Escribe la matrícula para consultarla.", "warn");
        return;
      }
      consultar(placa, "manual");
    }
    if (action === "quick") consultar(btn.getAttribute("data-placa"), "atajo");
  });

  root.addEventListener("change", function (e) {
    const el = e.target;
    const db = SIM.load();
    if (el.matches("[data-action=zona]")) {
      db.zonaActiva = el.value;
      SIM.save(db);
      render();
    }
    if (el.matches("[data-action=placa-select]")) {
      if (SIM.sesionActiva(db)) return;
      db.placaActiva = el.value;
      SIM.save(db);
      render();
    }
    if (el.matches("[data-action=pago]")) {
      db.metodoPago = el.value;
      SIM.save(db);
    }
  });

  root.addEventListener("submit", function (e) {
    const form = e.target.closest("[data-form]");
    if (!form) return;
    e.preventDefault();
    const tipo = form.getAttribute("data-form");
    if (tipo === "login") onLogin();
    if (tipo === "agent-login") onAgentLogin();
    if (tipo === "admin-login") onAdminLogin();
  });

  window.addEventListener("hashchange", function () {
    const view = route().view;
    if (view !== "app") {
      ui.loggedIn = false;
      ui.screen = "login";
      ui.receipt = null;
      ui.checkout = null;
      ui.skipping = false;
      ui.extendOffer = false;
      ui.faceState = "idle";
      if (ui.skipTimer) clearTimeout(ui.skipTimer);
      if (ui.faceTimer) clearTimeout(ui.faceTimer);
      if (ui.locateTimer) clearTimeout(ui.locateTimer);
    } else if (!ui.loggedIn) {
      ui.screen = "login";
    }
    if (view !== "agente") {
      ui.agentLoggedIn = false;
      ui.agentScreen = "login";
      ui.agentFaceState = "idle";
      resetAgentCamera();
      if (ui.agentFaceTimer) clearTimeout(ui.agentFaceTimer);
    } else if (!ui.agentLoggedIn) {
      ui.agentScreen = "login";
    }
    if (view !== "admin") {
      ui.adminLoggedIn = false;
      ui.adminScreen = "login";
    } else if (!ui.adminLoggedIn) {
      ui.adminScreen = "login";
    }
    render();
  });

  setInterval(function () {
    const db = SIM.load();
    const fired = SIM.revisarAlertas(db);
    if (fired.indexOf("10") !== -1) showToast("Te quedan 10 minutos", "El máximo de la zona está por agotarse.", "warn", 5000);
    if (fired.indexOf("5") !== -1) showToast("Quedan 5 minutos", "Finaliza o retira el vehículo.", "warn", 5000);
    if (fired.indexOf("exp") !== -1) showToast("Tiempo máximo agotado", "El controlador verá la placa como expirada.", "warn", 5000);
    ui.sensorTimer += 1;
    if (route().view === "admin" && ui.adminLoggedIn && ui.sensorTimer % 8 === 0) {
      SIM.simularSensor(db);
      render();
      return;
    }
    paintLive();
    const r = route().view;
    if (r === "app" && ui.screen === "session" && SIM.sesionActiva(db)) {
      const wrap = document.querySelector(".ring-wrap");
      if (wrap) {
        const info = SIM.estadoSesion(SIM.sesionActiva(db));
        const color = info.validez === "expirado" ? "var(--red)" : "var(--navy)";
        wrap.querySelector("svg").outerHTML = ringSvg(info.pct, color);
      }
    }
  }, 1000);

  render();
})();
