(function () {
  const EMOJI = {
    "p-cafe": "☕", "p-cacao": "🍫", "p-maiz": "🌽", "p-arroz": "🌾", "p-frejol": "🫘",
    "p-papa": "🥔", "p-yuca": "🌿", "p-platano": "🍌", "p-aguacate": "🥑", "p-mango": "🥭",
    "p-limon": "🍋", "p-naranja": "🍊", "p-mandarina": "🍊", "p-mora": "🫐", "p-tomate-arbol": "🍅",
    "p-granadilla": "🍈", "p-tomate": "🍅", "p-cebolla": "🧅", "p-pimiento": "🫑", "p-cana": "🎋",
    "p-hortensia": "🌸", "p-bovino": "🐄", "p-porcino": "🐖", "p-aves": "🐔", "p-cuy": "🐹",
    "p-caprino": "🐐", "p-tilapia": "🐟"
  };

  function route() {
    const raw = (location.hash || "#/dashboard").slice(1);
    const qIndex = raw.indexOf("?");
    const path = qIndex === -1 ? raw : raw.slice(0, qIndex);
    const query = new URLSearchParams(qIndex === -1 ? "" : raw.slice(qIndex + 1));
    const parts = path.split("/").filter(Boolean);
    return { view: parts[0] || "dashboard", id: parts[1] || "", query: query };
  }

  function go(hash) {
    location.hash = hash;
  }

  function publicView(view) {
    return view === "login" || view === "registro";
  }

  function navItems(user) {
    const items = [
      { href: "#/dashboard", label: "Tablero" },
      { href: "#/agricultores", label: "Productores" },
      { href: "#/compradores", label: "Compradores" },
      { href: "#/organizaciones", label: "Organizaciones" },
      { href: "#/productos", label: "Productos" },
      { href: "#/fincas", label: "Fincas" },
      { href: "#/demandas", label: "Demanda" }
    ];
    if (user && user.role === "agricultor") {
      items.push({ href: "#/produccion-nueva", label: "Calendario +" });
    }
    items.push({ href: "#/perfil", label: "Mi perfil" });
    return items;
  }

  function shell(user, inner) {
    if (!user) {
      return (
        '<header class="app-top">' +
          '<a class="app-brand" href="index.html">CULTIVANDO FUTURO<small>Loja · Ecuador</small></a>' +
          '<a class="btn btn-yellow btn-sm" href="index.html">Volver al inicio</a>' +
        "</header>" + inner
      );
    }
    const roleLabel = user.role === "agricultor" ? "Agricultor" : user.role === "comprador" ? "Comprador" : "Organización";
    const links = navItems(user).map(function (n) {
      const active = location.hash.indexOf(n.href.slice(1)) !== -1 ? " active" : "";
      return '<a class="' + active.trim() + '" href="' + n.href + '">' + n.label + "</a>";
    }).join("");
    return (
      '<header class="app-top">' +
        '<a class="app-brand" href="index.html">CULTIVANDO FUTURO<small>Loja · Ecuador</small></a>' +
        '<nav class="app-nav">' + links + "</nav>" +
        '<div class="app-user"><span class="role-pill">' + roleLabel + "</span>" +
          CF.escape(CF.nombreCompleto(user)) +
          ' <button class="btn btn-ghost btn-sm" data-action="logout">Salir</button></div>' +
      "</header>" +
      '<nav class="mobile-nav">' + links + "</nav>" +
      '<main class="page">' + inner + "</main>"
    );
  }

  function viewLogin() {
    return (
      '<div class="auth-wrap"><div class="auth-card">' +
        "<h1>Iniciar sesión</h1>" +
        "<p class=\"page-sub\">Red de productores, compradores y organizaciones del cantón Loja.</p>" +
        '<div class="demo-box"><b>Cuentas de demostración</b> (clave <code>loja2026</code>)<br>' +
        "Agricultor: maria.cevallos@loja.ec<br>Comprador: compras@mercado-loja.ec<br>Organización: contacto@cafivilcabamba.ec</div>" +
        '<form data-form="login">' +
          '<div class="form-grid">' +
            '<label class="fld full">Correo<input type="email" name="correo" required autocomplete="username"></label>' +
            '<label class="fld full">Contraseña<input type="password" name="password" required autocomplete="current-password"></label>' +
          "</div>" +
          '<p id="auth-msg" class="hidden alert alert-err" style="margin-top:0.8rem"></p>' +
          '<button class="btn btn-yellow" type="submit" style="margin-top:1rem;width:100%">Entrar</button>' +
        "</form>" +
        '<p style="margin-top:1rem;font-size:0.9rem">¿Aún no tienes cuenta? <a href="#/registro">Regístrate</a></p>' +
      "</div></div>"
    );
  }

  function viewRegistro(query) {
    const rol = query.get("rol") || "agricultor";
    function tab(id, label) {
      return '<button type="button" class="btn ' + (rol === id ? "btn-yellow" : "btn-outline") + '" data-action="tab-rol" data-rol="' + id + '">' + label + "</button>";
    }
    return (
      '<div class="auth-wrap"><div class="auth-card" style="width:min(720px,100%)">' +
        "<h1>Únete a Cultivando Futuro</h1>" +
        "<p class=\"page-sub\">Elige tu perfil. Los datos quedan en este navegador.</p>" +
        '<div class="tabs">' + tab("agricultor", "Agricultor") + tab("comprador", "Comprador") + tab("organizacion", "Organización") + "</div>" +
        formRegistro(rol) +
      "</div></div>"
    );
  }

  function parroquiaOptions(selected) {
    return CF.PARROQUIAS.map(function (p) {
      return '<option value="' + p.id + '"' + (p.id === selected ? " selected" : "") + ">" + p.nombre + " (" + p.tipo + ")</option>";
    }).join("");
  }

  function formRegistro(rol) {
    if (rol === "comprador") {
      return (
        '<form data-form="registro" data-rol="comprador"><div class="form-grid">' +
          campo("nombre", "Nombre") + campo("apellido", "Apellido") +
          campo("cedula", "Cédula") + campo("telefono", "Teléfono") +
          campo("correo", "Correo", "email") + campo("password", "Contraseña", "password") +
          campo("empresa", "Empresa / negocio") + campo("ruc", "RUC") +
          '<label class="fld">Tipo<select name="tipo"><option>Mayorista</option><option>Retail</option><option>Institucional</option><option>Exportador</option></select></label>' +
          '<label class="fld">Parroquia<select name="parroquia">' + parroquiaOptions("el-sagrario") + "</select></label>" +
          '<label class="fld full">Dirección<input name="direccion" required></label>' +
        '</div><button class="btn btn-yellow" style="margin-top:1rem">Crear perfil de comprador</button></form>'
      );
    }
    if (rol === "organizacion") {
      return (
        '<form data-form="registro" data-rol="organizacion"><div class="form-grid">' +
          '<label class="fld full">Nombre de la organización<input name="nombre" required></label>' +
          campo("ruc", "RUC") + campo("telefono", "Teléfono") +
          campo("correo", "Correo", "email") + campo("password", "Contraseña", "password") +
          '<label class="fld">Parroquia<select name="parroquia">' + parroquiaOptions("vilcabamba") + "</select></label>" +
          '<label class="fld full">Dirección<input name="direccion" required></label>' +
          '<label class="fld full">Descripción<textarea name="descripcion" required></textarea></label>' +
        '</div><button class="btn btn-yellow" style="margin-top:1rem">Crear perfil de organización</button></form>'
      );
    }
    return (
      '<form data-form="registro" data-rol="agricultor"><div class="form-grid">' +
        campo("nombre", "Nombre") + campo("apellido", "Apellido") +
        campo("cedula", "Cédula / identificación") + campo("telefono", "Teléfono") +
        campo("correo", "Correo", "email") + campo("password", "Contraseña", "password") +
        '<label class="fld">Género<select name="genero"><option value="F">Mujer</option><option value="M">Hombre</option><option value="O">Otro</option></select></label>' +
        '<label class="fld">Parroquia<select name="parroquia">' + parroquiaOptions("malacatos") + "</select></label>" +
        '<label class="fld full">Dirección / comunidad<input name="direccion" required></label>' +
        '<div class="full"><b>Servicios y condición sociodemográfica</b><div class="check-grid" style="margin-top:0.5rem">' +
          check("tieneAguaPotable", "Agua potable") +
          check("tieneLuz", "Energía eléctrica") +
          check("tieneInternet", "Internet") +
          check("tieneCuentaBancaria", "Cuenta bancaria") +
          check("tieneAuto", "Auto / camioneta de trabajo") +
        "</div></div>" +
        '<div class="full"><b>Equipos de trabajo</b><div class="check-grid" style="margin-top:0.5rem">' +
          CF.EQUIPOS.map(function (e) {
            return '<label><input type="checkbox" name="equipo" value="' + e.id + '"> ' + e.label + "</label>";
          }).join("") +
        "</div></div>" +
      '</div><button class="btn btn-yellow" style="margin-top:1rem">Crear perfil de agricultor</button></form>'
    );
  }

  function campo(name, label, type) {
    return '<label class="fld">' + label + '<input name="' + name + '" type="' + (type || "text") + '" required></label>';
  }
  function check(name, label) {
    return '<label><input type="checkbox" name="' + name + '"> ' + label + "</label>";
  }

  function viewDashboard() {
    return CF.dashboardHTML();
  }

  function viewAgricultores() {
    const db = CF.loadDB();
    return (
      '<div class="toolbar"><div><h1 class="page-title">Agricultores y productores</h1>' +
      '<p class="page-sub">Perfiles del cantón Loja. Un productor puede tener una o varias fincas.</p></div>' +
      '<input class="search" id="q" placeholder="Buscar por nombre, cédula o parroquia"></div>' +
      '<div class="cards" id="list">' + db.agricultores.map(cardAgricultor).join("") + "</div>"
    );
  }

  function cardAgricultor(a) {
    const fincas = CF.fincasDe(a.id);
    const parr = CF.parroquia(a.parroquia);
    return (
      '<article class="person-card" data-filter="' + CF.escape((a.nombre + " " + a.apellido + " " + a.cedula + " " + parr.nombre).toLowerCase()) + '">' +
        "<header><div class=\"avatar\">" + CF.escape(CF.iniciales(a)) + "</div><div>" +
        "<strong>" + CF.escape(CF.nombreCompleto(a)) + '</strong><div class="meta">' +
        '<span class="badge badge-ag">Agricultor</span> · ' + CF.escape(parr.nombre) + "</div></div></header>" +
        '<div class="meta">Cédula <b>' + CF.escape(a.cedula) + "</b> · " + fincas.length + " finca(s)</div>" +
        '<div class="chips">' +
          chipBool(a.tieneAguaPotable, "Agua") + chipBool(a.tieneLuz, "Luz") +
          chipBool(a.tieneInternet, "Internet") + chipBool(a.tieneCuentaBancaria, "Banco") +
          chipBool(a.tieneAuto, "Auto") +
        "</div>" +
        '<p style="margin-top:0.8rem"><a class="btn btn-outline btn-sm" href="#/agricultor/' + a.id + '">Ver perfil</a></p>' +
      "</article>"
    );
  }

  function chipBool(ok, label) {
    return '<span class="chip">' + (ok ? "● " : "○ ") + label + "</span>";
  }

  function viewAgricultor(id) {
    const db = CF.loadDB();
    const a = db.agricultores.find(function (x) { return x.id === id; });
    if (!a) return notFound("Productor no encontrado");
    const fincas = CF.fincasDe(a.id);
    const prods = CF.produccionesDe(a.id);
    const orgs = db.organizaciones.filter(function (o) { return (a.organizacionIds || []).indexOf(o.id) !== -1; });
    const user = CF.currentUser();
    const canEdit = user && user.id === a.id;
    return (
      profileSide(a, "Agricultor / productor") +
      '<div><div class="panel"><h3>Fincas</h3>' +
        (canEdit ? '<a class="btn btn-yellow btn-sm" href="#/finca-nueva">Registrar finca</a>' : "") +
        (fincas.length ? '<div class="cards" style="margin-top:0.8rem">' + fincas.map(cardFinca).join("") + "</div>" : "<p class=\"meta\">Sin fincas registradas.</p>") +
      "</div>" +
      '<div class="panel"><h3>Calendarios de producción</h3>' +
        (canEdit ? '<a class="btn btn-yellow btn-sm" href="#/produccion-nueva">Nuevo calendario</a>' : "") +
        (prods.length ? '<div class="table-wrap" style="margin-top:0.7rem"><table class="data"><thead><tr><th>Producto</th><th>Finca</th><th>Siembra</th><th>Cosecha</th><th></th></tr></thead><tbody>' +
          prods.map(function (p) {
            const prod = CF.producto(p.productoId);
            const fi = db.fincas.find(function (f) { return f.id === p.fincaId; });
            return "<tr><td>" + CF.escape(prod.nombre) + "</td><td>" + CF.escape(fi ? fi.nombre : "—") + "</td><td>" + CF.fmtFecha(p.fechaSiembraInicio) + "</td><td>" + CF.escape((p.mesesCosecha || []).join(", ")) + '</td><td><a href="#/calendario/' + p.id + '">Abrir</a></td></tr>';
          }).join("") + "</tbody></table></div>" : "<p class=\"meta\">Aún no hay calendarios.</p>") +
      "</div>" +
      '<div class="panel"><h3>Organizaciones</h3>' +
        (orgs.length ? orgs.map(function (o) { return '<a href="#/organizacion/' + o.id + '">' + CF.escape(o.nombre) + "</a>"; }).join("<br>") : "<span class=\"meta\">Independiente</span>") +
      "</div>" +
      '<div class="panel"><h3>Equipos</h3><div class="chips">' +
        (a.equipos || []).map(function (id) {
          const eq = CF.EQUIPOS.find(function (e) { return e.id === id; });
          return '<span class="chip">' + CF.escape(eq ? eq.label : id) + "</span>";
        }).join("") +
      "</div></div></div></div>"
    );
  }

  function profileSide(a, rol) {
    const parr = CF.parroquia(a.parroquia);
    return (
      '<div class="profile-grid"><aside class="profile-side">' +
        '<div class="av-lg">' + CF.escape(CF.iniciales(a)) + "</div>" +
        "<h2>" + CF.escape(CF.nombreCompleto(a)) + "</h2>" +
        '<div class="badge badge-ag" style="margin:0.4rem 0">' + rol + "</div>" +
        '<div class="meta">' + CF.escape(parr.nombre) + "<br>" + CF.escape(a.direccion || "") + "</div>" +
        '<div class="meta" style="margin-top:0.6rem">CI <b>' + CF.escape(a.cedula || a.ruc || "—") + "</b><br>" +
        CF.escape(a.telefono || "") + "<br>" + CF.escape(a.correo) + "</div>" +
        (a.role === "agricultor" ? '<div class="bool-list">' +
          boolItem(a.tieneAguaPotable, "Agua potable") +
          boolItem(a.tieneLuz, "Luz") +
          boolItem(a.tieneInternet, "Internet") +
          boolItem(a.tieneCuentaBancaria, "Cuenta bancaria") +
          boolItem(a.tieneAuto, "Auto de trabajo") +
        "</div>" : "") +
      "</aside>"
    );
  }

  function boolItem(ok, label) {
    return "<span>" + (ok ? "✅" : "⬜") + " " + label + "</span>";
  }

  function viewCompradores() {
    const db = CF.loadDB();
    return (
      '<h1 class="page-title">Compradores</h1><p class="page-sub">Perfiles que registran demanda de productos agropecuarios.</p>' +
      '<div class="cards">' + db.compradores.map(function (c) {
        return (
          '<article class="person-card"><header><div class="avatar" style="background:#f5b400;color:#111">' + CF.escape(CF.iniciales(c)) + "</div><div>" +
          "<strong>" + CF.escape(CF.nombreCompleto(c)) + '</strong><div class="meta"><span class="badge badge-co">Comprador</span> · ' + CF.escape(c.tipo) + "</div></div></header>" +
          '<div class="meta">' + CF.escape(c.empresa) + "<br>RUC " + CF.escape(c.ruc) + "</div>" +
          '<p style="margin-top:0.8rem"><a class="btn btn-outline btn-sm" href="#/comprador/' + c.id + '">Ver perfil</a></p></article>'
        );
      }).join("") + "</div>"
    );
  }

  function viewComprador(id) {
    const db = CF.loadDB();
    const c = db.compradores.find(function (x) { return x.id === id; });
    if (!c) return notFound("Comprador no encontrado");
    const dems = db.demandas.filter(function (d) { return d.compradorId === c.id; });
    return (
      '<div class="profile-grid"><aside class="profile-side"><div class="av-lg" style="background:#f5b400;color:#111">' + CF.escape(CF.iniciales(c)) + "</div>" +
      "<h2>" + CF.escape(CF.nombreCompleto(c)) + '</h2><div class="badge badge-co">Comprador</div>' +
      '<div class="meta" style="margin-top:0.6rem">' + CF.escape(c.empresa) + "<br>" + CF.escape(c.tipo) + "<br>RUC " + CF.escape(c.ruc) + "</div></aside>" +
      '<div class="panel"><h3>Demandas registradas</h3>' + tableDemandas(dems) + "</div></div>"
    );
  }

  function viewOrganizaciones() {
    const db = CF.loadDB();
    return (
      '<h1 class="page-title">Organizaciones</h1><p class="page-sub">Cada organización agrupa a uno o varios agricultores.</p>' +
      '<div class="cards">' + db.organizaciones.map(function (o) {
        const n = CF.miembrosDe(o.id).length;
        return (
          '<article class="person-card"><header><div class="avatar" style="background:#1565c0">' + CF.escape(CF.iniciales(o)) + "</div><div>" +
          "<strong>" + CF.escape(o.nombre) + '</strong><div class="meta"><span class="badge badge-or">Organización</span> · ' + n + " productores</div></div></header>" +
          '<div class="meta">' + CF.escape(CF.parroquia(o.parroquia).nombre) + "</div>" +
          '<p style="margin-top:0.8rem"><a class="btn btn-outline btn-sm" href="#/organizacion/' + o.id + '">Ver perfil</a></p></article>'
        );
      }).join("") + "</div>"
    );
  }

  function viewOrganizacion(id) {
    const db = CF.loadDB();
    const o = db.organizaciones.find(function (x) { return x.id === id; });
    if (!o) return notFound("Organización no encontrada");
    const miembros = CF.miembrosDe(o.id);
    const user = CF.currentUser();
    const canEdit = user && user.id === o.id;
    return (
      '<div class="profile-grid"><aside class="profile-side"><div class="av-lg" style="background:#1565c0">' + CF.escape(CF.iniciales(o)) + "</div>" +
      "<h2>" + CF.escape(o.nombre) + '</h2><div class="badge badge-or">Organización</div>' +
      '<div class="meta" style="margin-top:0.6rem">RUC ' + CF.escape(o.ruc) + "<br>" + CF.escape(o.telefono) + "<br>" + CF.escape(o.correo) + "</div>" +
      '<p class="meta" style="margin-top:0.8rem;text-align:left">' + CF.escape(o.descripcion) + "</p></aside>" +
      '<div><div class="panel"><h3>Productores asociados (' + miembros.length + ")</h3>" +
      (canEdit ? '<form data-form="add-miembro" class="toolbar"><input class="search" name="cedula" placeholder="Cédula del agricultor" required><button class="btn btn-yellow btn-sm">Vincular</button></form>' : "") +
      (miembros.length ? '<div class="cards">' + miembros.map(cardAgricultor).join("") + "</div>" : "<p class=\"meta\">Sin miembros.</p>") +
      "</div></div></div>"
    );
  }

  function viewProductos() {
    return (
      '<h1 class="page-title">Catálogo de productos</h1>' +
      '<p class="page-sub">Tipo agrícola o pecuario y código CPC 2.1 usado por INEC / MAG Ecuador.</p>' +
      '<div class="table-wrap"><table class="data"><thead><tr><th>Producto</th><th>Tipo</th><th>Código Ecuador</th><th>Categoría</th></tr></thead><tbody>' +
      CF.PRODUCTOS.map(function (p) {
        return "<tr><td>" + (EMOJI[p.id] || "") + " " + CF.escape(p.nombre) + '</td><td><span class="badge ' + (p.tipo === "pecuario" ? "badge-pe" : "badge-ag") + '">' + p.tipo + "</span></td><td>" + p.codigo + "</td><td>" + CF.escape(p.categoria) + "</td></tr>";
      }).join("") + "</tbody></table></div>"
    );
  }

  function cardFinca(f) {
    return (
      '<article class="farm-card"><strong>' + CF.escape(f.nombre) + "</strong>" +
      '<div class="meta">' + CF.escape(CF.parroquia(f.parroquia).nombre) + " · " + CF.fmtHa(f.hectareas) + " ha</div>" +
      '<div class="chips">' + (f.espacios || []).map(function (e) {
        return '<span class="chip">' + CF.escape(CF.producto(e.productoId).nombre) + " · " + e.tipoSuelo + "</span>";
      }).join("") + "</div>" +
      '<p style="margin-top:0.7rem"><a class="btn btn-outline btn-sm" href="#/finca/' + f.id + '">Ver finca</a></p></article>'
    );
  }

  function viewFincas() {
    const db = CF.loadDB();
    const user = CF.currentUser();
    return (
      '<div class="toolbar"><div><h1 class="page-title">Fincas</h1><p class="page-sub">Nombre, ubicación, tamaño y tipo de suelo de cada espacio cultivado.</p></div>' +
      (user && user.role === "agricultor" ? '<a class="btn btn-yellow" href="#/finca-nueva">Registrar finca</a>' : "") +
      "</div><div class=\"cards\">" + db.fincas.map(cardFinca).join("") + "</div>"
    );
  }

  function viewFinca(id) {
    const db = CF.loadDB();
    const f = db.fincas.find(function (x) { return x.id === id; });
    if (!f) return notFound("Finca no encontrada");
    const ag = db.agricultores.find(function (a) { return a.id === f.agricultorId; });
    const cals = db.producciones.filter(function (p) { return p.fincaId === f.id; });
    return (
      '<h1 class="page-title">' + CF.escape(f.nombre) + "</h1>" +
      '<p class="page-sub">' + CF.escape(CF.parroquia(f.parroquia).nombre) + " · " + CF.escape(f.direccion) + " · " + CF.fmtHa(f.hectareas) + " ha · " +
      'Productor: <a href="#/agricultor/' + f.agricultorId + '">' + CF.escape(CF.nombreCompleto(ag)) + "</a></p>" +
      '<div class="dash-grid"><div class="panel"><h3>Espacios cultivados</h3><table class="data"><thead><tr><th>Espacio</th><th>Ha</th><th>Suelo</th><th>Cultivo</th></tr></thead><tbody>' +
      (f.espacios || []).map(function (e) {
        const p = CF.producto(e.productoId);
        return "<tr><td>" + CF.escape(e.nombre) + "</td><td>" + CF.fmtHa(e.hectareas) + "</td><td>" + CF.escape(e.tipoSuelo) + "</td><td>" + CF.escape(p.nombre) + " <small>" + p.codigo + "</small></td></tr>";
      }).join("") + "</tbody></table></div>" +
      '<div class="panel"><h3>Ubicación</h3><div id="finca-map" style="height:260px;border-radius:8px"></div></div></div>' +
      '<div class="panel"><h3>Calendarios</h3>' +
      (cals.length ? cals.map(function (p) {
        return '<a class="btn btn-outline btn-sm" href="#/calendario/' + p.id + '">' + CF.escape(CF.producto(p.productoId).nombre) + "</a> ";
      }).join("") : "<span class=\"meta\">Sin calendarios.</span>") + "</div>"
    );
  }

  function productoOptions() {
    return CF.PRODUCTOS.map(function (p) {
      return '<option value="' + p.id + '">' + p.nombre + " · " + p.codigo + " (" + p.tipo + ")</option>";
    }).join("");
  }

  function sueloOptions() {
    return CF.TIPOS_SUELO.map(function (s) { return "<option>" + s + "</option>"; }).join("");
  }

  function viewFincaNueva(user) {
    const parr = CF.parroquia(user.parroquia);
    return (
      '<h1 class="page-title">Registrar finca</h1><p class="page-sub">Puedes tener una o varias fincas. Cada espacio cultivado declara suelo y producto.</p>' +
      '<form class="panel" data-form="finca"><div class="form-grid">' +
        '<label class="fld">Nombre de la finca<input name="nombre" required></label>' +
        '<label class="fld">Parroquia<select name="parroquia">' + parroquiaOptions(user.parroquia) + "</select></label>" +
        '<label class="fld full">Dirección<input name="direccion" required></label>' +
        '<label class="fld">Latitud<input name="lat" type="number" step="0.0001" value="' + parr.lat + '" required></label>' +
        '<label class="fld">Longitud<input name="lng" type="number" step="0.0001" value="' + parr.lng + '" required></label>' +
        '<label class="fld">Tamaño total (ha)<input name="hectareas" type="number" step="0.1" min="0.1" required></label>' +
      '</div><h3 style="margin:1rem 0 0.5rem">Espacios cultivados</h3>' +
      '<div id="espacios">' + espacioRow() + '</div>' +
      '<button type="button" class="btn btn-outline btn-sm" data-action="add-espacio" style="margin:0.6rem 0">+ Otro espacio</button>' +
      '<div><button class="btn btn-yellow">Guardar finca</button></div></form>'
    );
  }

  function espacioRow() {
    return (
      '<div class="form-grid espacio-row" style="margin-bottom:0.6rem;padding:0.6rem;background:#f7f7f7">' +
        '<label class="fld">Nombre del lote<input name="esp_nombre" required placeholder="Huerta principal"></label>' +
        '<label class="fld">Hectáreas<input name="esp_ha" type="number" step="0.1" min="0.1" required></label>' +
        '<label class="fld">Tipo de suelo<select name="esp_suelo">' + sueloOptions() + "</select></label>" +
        '<label class="fld">Producto<select name="esp_producto">' + productoOptions() + "</select></label>" +
      "</div>"
    );
  }

  function viewProduccionNueva(user) {
    const fincas = CF.fincasDe(user.id);
    if (!fincas.length) {
      return '<h1 class="page-title">Calendario de producción</h1><div class="alert">Primero registra una finca. <a href="#/finca-nueva">Registrar finca</a></div>';
    }
    return (
      '<h1 class="page-title">Registrar calendario de producción</h1>' +
      '<p class="page-sub">Fechas de siembra, inicio y fin de producción, y meses de cosecha.</p>' +
      '<form class="panel" data-form="produccion"><div class="form-grid">' +
        '<label class="fld">Finca<select name="fincaId" required>' + fincas.map(function (f) {
          return '<option value="' + f.id + '">' + CF.escape(f.nombre) + "</option>";
        }).join("") + "</select></label>" +
        '<label class="fld">Producto<select name="productoId">' + productoOptions() + "</select></label>" +
        '<label class="fld">Terreno en producción<input name="terrenoProduccion" type="number" step="0.1" required></label>' +
        '<label class="fld">Unidad<select name="unidadTerreno"><option>hectáreas</option><option>fanegadas</option><option>metros cuadrados</option></select></label>' +
        '<label class="fld">Cantidad de plántulas<input name="cantidadPlantulas" type="number" min="0" value="0"></label>' +
        '<label class="fld">Ciclo<select name="ciclo"><option>Convencional</option><option>Orgánico</option><option>Agroecológico</option></select></label>' +
        '<label class="fld">Entrega<select name="entrega"><option>Diario</option><option>Semanal</option><option>Por cosecha</option></select></label>' +
        '<label class="fld">Visibilidad<select name="visibilidad"><option>Pública</option><option>Privada</option></select></label>' +
        '<label class="fld">Inicio de siembra<input name="fechaSiembraInicio" type="date" required></label>' +
        '<label class="fld">Fin de siembra<input name="fechaSiembraFin" type="date" required></label>' +
        '<label class="fld">Inicio de producción<input name="fechaInicioProduccion" type="date" required></label>' +
        '<label class="fld">Fin de producción<input name="fechaFinProduccion" type="date" required></label>' +
        '<div class="full"><b>Meses de cosecha</b><div class="check-grid" style="margin-top:0.5rem">' +
          CF.MESES.map(function (m) { return '<label><input type="checkbox" name="mes" value="' + m + '"> ' + m + "</label>"; }).join("") +
        "</div></div>" +
      '</div><button class="btn btn-yellow" style="margin-top:1rem">Guardar calendario</button></form>'
    );
  }

  function viewCalendario(id) {
    const db = CF.loadDB();
    const p = db.producciones.find(function (x) { return x.id === id; });
    if (!p) return notFound("Calendario no encontrado");
    const prod = CF.producto(p.productoId);
    const finca = db.fincas.find(function (f) { return f.id === p.fincaId; });
    const ag = db.agricultores.find(function (a) { return a.id === p.agricultorId; });
    if (CF._calId !== id) {
      CF._calId = id;
      const start = p.fechaInicioProduccion || p.fechaSiembraInicio;
      CF._calMonth = start ? new Date(start + "T00:00:00") : new Date();
    }
    const now = CF._calMonth || new Date();
    return (
      '<div class="cal-page">' +
        '<div class="cal-head">' +
          '<div class="cal-thumb" style="background:' + prod.color + '">' + (EMOJI[prod.id] || "🌱") + "</div>" +
          "<div><div class=\"idline\">ID " + CF.escape(p.id.replace("pr-", "")) + " — " + CF.escape(p.visibilidad) + "</div>" +
          "<h2>" + CF.escape(prod.nombre) + " " + CF.escape(p.ciclo) + "</h2>" +
          '<div class="meta">' + CF.escape(finca ? finca.nombre : "") + " · " + CF.escape(CF.nombreCompleto(ag)) + "</div></div>" +
        "</div>" +
        '<div class="cal-stats">' +
          calStat("Terreno en producción", CF.fmtHa(p.terrenoProduccion) + " " + p.unidadTerreno) +
          calStat("Cantidad de plántulas", p.cantidadPlantulas) +
          calStat("Ciclo de producción", p.ciclo) +
          calStat("Entrega", p.entrega) +
        "</div>" +
        '<div class="cal-title"><h3>Calendario de Producción</h3>' +
        "<p>Aquí puedes ver las fechas importantes de tu producción, haz clic en una fecha para ir al día.</p></div>" +
        '<div class="cal-body">' +
          '<div class="cal-widget">' + renderMonth(now, p) + "</div>" +
          "<div>" +
            '<div class="milestone ms-yellow"><div class="k">Fecha siembra producción</div><div class="v">' + CF.fmtFecha(p.fechaSiembraInicio) + (p.fechaSiembraFin !== p.fechaSiembraInicio ? " — " + CF.fmtFecha(p.fechaSiembraFin) : "") + "</div></div>" +
            '<div class="milestone ms-green"><div class="k">Fecha inicio de producción</div><div class="v">' + CF.fmtFecha(p.fechaInicioProduccion) + "</div></div>" +
            '<div class="milestone ms-green"><div class="k">Fecha fin de producción</div><div class="v">' + CF.fmtFecha(p.fechaFinProduccion) + "</div></div>" +
            '<div class="milestone ms-green"><div class="k">Meses de cosecha</div><div class="v">' + CF.escape((p.mesesCosecha || []).join(" ")) + "</div></div>" +
            '<div class="meta">Código Ecuador: <b>' + prod.codigo + "</b> · " + prod.tipo + "</div>" +
          "</div>" +
        "</div></div>"
    );
  }

  function calStat(k, v) {
    return '<div class="cal-stat"><div class="k">' + k + '</div><div class="v">' + v + "</div></div>";
  }

  function renderMonth(date, produccion) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const first = new Date(year, month, 1);
    const start = first.getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const events = {};
    (produccion.eventos || []).forEach(function (ev) { events[ev.fecha] = ev.titulo; });
    [produccion.fechaSiembraInicio, produccion.fechaSiembraFin, produccion.fechaInicioProduccion, produccion.fechaFinProduccion].forEach(function (iso) {
      if (iso) events[iso] = events[iso] || "Fecha clave";
    });
    const week = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let cells = "";
    for (let i = 0; i < start; i++) cells += '<button type="button" class="out" disabled></button>';
    const today = new Date().toISOString().slice(0, 10);
    for (let d = 1; d <= days; d++) {
      const iso = year + "-" + String(month + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
      const cls = (events[iso] ? " event" : "") + (iso === today ? " today" : "");
      cells += '<button type="button" class="' + cls.trim() + '" data-action="cal-day" title="' + CF.escape(events[iso] || "") + '">' + d + "</button>";
    }
    return (
      '<div class="cal-nav">' +
        '<button type="button" data-action="cal-prev">◀</button>' +
        "<span>" + CF.MESES[month] + " " + year + "</span>" +
        '<button type="button" data-action="cal-next">▶</button>' +
      "</div>" +
      '<div class="cal-week">' + week.map(function (w) { return "<span>" + w.slice(0, 3) + "</span>"; }).join("") + "</div>" +
      '<div class="cal-days">' + cells + "</div>"
    );
  }

  function viewDemandas() {
    const db = CF.loadDB();
    const user = CF.currentUser();
    return (
      '<div class="toolbar"><div><h1 class="page-title">Demanda del mercado</h1><p class="page-sub">Lo que los compradores necesitan, para alinear la producción.</p></div>' +
      (user && user.role === "comprador" ? '<a class="btn btn-yellow" href="#/demanda-nueva">Registrar mi demanda</a>' : "") +
      "</div>" + tableDemandas(db.demandas)
    );
  }

  function tableDemandas(list) {
    const db = CF.loadDB();
    if (!list.length) return "<p class=\"meta\">No hay demandas.</p>";
    return '<div class="table-wrap"><table class="data"><thead><tr><th>Producto</th><th>Cantidad</th><th>Comprador</th><th>Fecha</th><th>Estado</th></tr></thead><tbody>' +
      list.map(function (d) {
        const c = db.compradores.find(function (x) { return x.id === d.compradorId; });
        const p = CF.producto(d.productoId);
        return "<tr><td>" + CF.escape(p.nombre) + " <small>" + p.codigo + "</small></td><td>" + d.cantidad + " " + CF.escape(d.unidad) + "</td><td>" + CF.escape(c ? c.empresa : "—") + "</td><td>" + CF.fmtFecha(d.fechaNecesidad) + "</td><td>" + CF.escape(d.estado) + "</td></tr>";
      }).join("") + "</tbody></table></div>";
  }

  function viewDemandaNueva() {
    return (
      '<h1 class="page-title">Registrar demanda</h1>' +
      '<form class="panel" data-form="demanda"><div class="form-grid">' +
        '<label class="fld">Producto<select name="productoId">' + productoOptions() + "</select></label>" +
        '<label class="fld">Cantidad<input name="cantidad" type="number" min="1" required></label>' +
        '<label class="fld">Unidad<input name="unidad" value="kg/semana" required></label>' +
        '<label class="fld">Fecha de necesidad<input name="fechaNecesidad" type="date" required></label>' +
        '<label class="fld full">Notas<textarea name="notas"></textarea></label>' +
      '</div><button class="btn btn-yellow" style="margin-top:1rem">Publicar demanda</button></form>'
    );
  }

  function viewPerfil(user) {
    if (user.role === "agricultor") {
      return '<h1 class="page-title">Mi perfil de agricultor</h1>' + viewAgricultor(user.id) +
        '<p style="margin-top:1rem"><button class="btn btn-outline btn-sm" data-action="reset">Restaurar datos de demostración</button></p>';
    }
    if (user.role === "comprador") {
      return '<h1 class="page-title">Mi perfil de comprador</h1>' + viewComprador(user.id);
    }
    return '<h1 class="page-title">Perfil de la organización</h1>' + viewOrganizacion(user.id);
  }

  function notFound(msg) {
    return '<div class="alert alert-err">' + CF.escape(msg) + ' <a href="#/dashboard">Volver</a></div>';
  }

  function afterRender(r, user) {
    if (r.view === "dashboard" && user) {
      CF.mountDashboard();
    }
    if (r.view === "finca" && r.id) {
      const f = CF.loadDB().fincas.find(function (x) { return x.id === r.id; });
      const el = document.getElementById("finca-map");
      if (f && el && window.L) {
        const map = L.map(el, { scrollWheelZoom: false }).setView([f.lat, f.lng], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OSM" }).addTo(map);
        L.circleMarker([f.lat, f.lng], { radius: 9, color: "#2e7d32", fillColor: "#66bb6a", fillOpacity: 1 }).addTo(map).bindPopup(CF.escape(f.nombre));
        setTimeout(function () { map.invalidateSize(); }, 80);
      }
    }
    const q = document.getElementById("q");
    if (q) {
      q.addEventListener("input", function () {
        const v = q.value.toLowerCase();
        document.querySelectorAll("[data-filter]").forEach(function (card) {
          card.style.display = card.getAttribute("data-filter").indexOf(v) === -1 ? "none" : "";
        });
      });
    }
  }

  function render() {
    const r = route();
    let user = CF.currentUser();
    if (!publicView(r.view) && !user) {
      go("#/login");
      return;
    }
    if (publicView(r.view) && user && r.view === "login") {
      go("#/dashboard");
      return;
    }
    let inner = "";
    if (r.view === "login") inner = viewLogin();
    else if (r.view === "registro") inner = viewRegistro(r.query);
    else if (r.view === "dashboard") inner = viewDashboard();
    else if (r.view === "agricultores") inner = viewAgricultores();
    else if (r.view === "agricultor") inner = viewAgricultor(r.id);
    else if (r.view === "compradores") inner = viewCompradores();
    else if (r.view === "comprador") inner = viewComprador(r.id);
    else if (r.view === "organizaciones") inner = viewOrganizaciones();
    else if (r.view === "organizacion") inner = viewOrganizacion(r.id);
    else if (r.view === "productos") inner = viewProductos();
    else if (r.view === "fincas") inner = viewFincas();
    else if (r.view === "finca") inner = viewFinca(r.id);
    else if (r.view === "finca-nueva") inner = user.role === "agricultor" ? viewFincaNueva(user) : notFound("Solo agricultores registran fincas");
    else if (r.view === "produccion-nueva") inner = user.role === "agricultor" ? viewProduccionNueva(user) : notFound("Solo agricultores registran calendarios");
    else if (r.view === "calendario") inner = viewCalendario(r.id);
    else if (r.view === "demandas") inner = viewDemandas();
    else if (r.view === "demanda-nueva") inner = user.role === "comprador" ? viewDemandaNueva() : notFound("Solo compradores registran demanda");
    else if (r.view === "perfil") inner = viewPerfil(user);
    else inner = notFound("Vista no encontrada");

    document.getElementById("shell").innerHTML = shell(publicView(r.view) ? null : user, inner);
    afterRender(r, user);
  }

  function formTo(form) {
    const data = {};
    new FormData(form).forEach(function (v, k) {
      if (data[k] === undefined) data[k] = v;
      else if (Array.isArray(data[k])) data[k].push(v);
      else data[k] = [data[k], v];
    });
    return data;
  }

  document.addEventListener("click", function (e) {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const action = btn.getAttribute("data-action");
    if (action === "logout") {
      CF.logout();
      go("#/login");
    }
    if (action === "tab-rol") go("#/registro?rol=" + btn.getAttribute("data-rol"));
    if (action === "add-espacio") {
      document.getElementById("espacios").insertAdjacentHTML("beforeend", espacioRow());
    }
    if (action === "cal-prev" || action === "cal-next") {
      const cur = CF._calMonth || new Date();
      CF._calMonth = new Date(cur.getFullYear(), cur.getMonth() + (action === "cal-next" ? 1 : -1), 1);
      render();
    }
    if (action === "reset") {
      if (confirm("Esto restaura los datos de demostración de Loja.")) {
        CF.resetDB();
        CF.logout();
        go("#/login");
      }
    }
  });

  document.addEventListener("submit", function (e) {
    const form = e.target.closest("[data-form]");
    if (!form) return;
    e.preventDefault();
    const kind = form.getAttribute("data-form");
    const db = CF.loadDB();

    if (kind === "login") {
      const user = CF.login(form.correo.value.trim(), form.password.value);
      if (!user) {
        const msg = document.getElementById("auth-msg");
        msg.textContent = "Correo o contraseña incorrectos.";
        msg.classList.remove("hidden");
        return;
      }
      go("#/dashboard");
      return;
    }

    if (kind === "registro") {
      const rol = form.getAttribute("data-rol");
      const d = formTo(form);
      if (rol === "agricultor") {
        const equipos = form.querySelectorAll('[name="equipo"]:checked');
        const ag = {
          id: CF.uid("ag"), role: "agricultor",
          nombre: d.nombre, apellido: d.apellido, cedula: d.cedula, telefono: d.telefono,
          correo: d.correo, password: d.password, genero: d.genero, parroquia: d.parroquia,
          direccion: d.direccion, fechaNacimiento: "",
          tieneAguaPotable: !!form.tieneAguaPotable.checked,
          tieneLuz: !!form.tieneLuz.checked,
          tieneInternet: !!form.tieneInternet.checked,
          tieneCuentaBancaria: !!form.tieneCuentaBancaria.checked,
          tieneAuto: !!form.tieneAuto.checked,
          organizacionIds: [],
          equipos: Array.prototype.map.call(equipos, function (x) { return x.value; })
        };
        ["agua_potable", "luz", "internet", "cuenta_bancaria", "auto"].forEach(function (k, i) {
          const flags = [ag.tieneAguaPotable, ag.tieneLuz, ag.tieneInternet, ag.tieneCuentaBancaria, ag.tieneAuto];
          if (flags[i] && ag.equipos.indexOf(k) === -1) ag.equipos.push(k);
        });
        db.agricultores.push(ag);
        CF.saveDB(db);
        CF.setSession(ag);
      } else if (rol === "comprador") {
        const co = {
          id: CF.uid("co"), role: "comprador",
          nombre: d.nombre, apellido: d.apellido, cedula: d.cedula, telefono: d.telefono,
          correo: d.correo, password: d.password, empresa: d.empresa, ruc: d.ruc,
          direccion: d.direccion, tipo: d.tipo, parroquia: d.parroquia
        };
        db.compradores.push(co);
        CF.saveDB(db);
        CF.setSession(co);
      } else {
        const org = {
          id: CF.uid("org"), role: "organizacion",
          nombre: d.nombre, ruc: d.ruc, telefono: d.telefono, correo: d.correo,
          password: d.password, parroquia: d.parroquia, direccion: d.direccion, descripcion: d.descripcion
        };
        db.organizaciones.push(org);
        CF.saveDB(db);
        CF.setSession(org);
      }
      go("#/dashboard");
      return;
    }

    if (kind === "finca") {
      const user = CF.currentUser();
      const d = formTo(form);
      const nombres = form.querySelectorAll('[name="esp_nombre"]');
      const has = form.querySelectorAll('[name="esp_ha"]');
      const suelos = form.querySelectorAll('[name="esp_suelo"]');
      const productos = form.querySelectorAll('[name="esp_producto"]');
      const espacios = [];
      for (let i = 0; i < nombres.length; i++) {
        espacios.push({
          id: CF.uid("es"),
          nombre: nombres[i].value,
          hectareas: Number(has[i].value),
          tipoSuelo: suelos[i].value,
          productoId: productos[i].value
        });
      }
      db.fincas.push({
        id: CF.uid("fi"), agricultorId: user.id, nombre: d.nombre,
        parroquia: d.parroquia, direccion: d.direccion,
        lat: Number(d.lat), lng: Number(d.lng), hectareas: Number(d.hectareas),
        espacios: espacios
      });
      CF.saveDB(db);
      go("#/agricultor/" + user.id);
      return;
    }

    if (kind === "produccion") {
      const user = CF.currentUser();
      const d = formTo(form);
      const meses = form.querySelectorAll('[name="mes"]:checked');
      const rec = {
        id: CF.uid("pr"), fincaId: d.fincaId, agricultorId: user.id, productoId: d.productoId,
        terrenoProduccion: Number(d.terrenoProduccion), unidadTerreno: d.unidadTerreno,
        cantidadPlantulas: Number(d.cantidadPlantulas || 0), ciclo: d.ciclo, entrega: d.entrega,
        visibilidad: d.visibilidad,
        fechaSiembraInicio: d.fechaSiembraInicio, fechaSiembraFin: d.fechaSiembraFin,
        fechaInicioProduccion: d.fechaInicioProduccion, fechaFinProduccion: d.fechaFinProduccion,
        mesesCosecha: Array.prototype.map.call(meses, function (x) { return x.value; }),
        eventos: [{ fecha: d.fechaInicioProduccion, titulo: "Inicio de producción" }]
      };
      db.producciones.push(rec);
      CF.saveDB(db);
      go("#/calendario/" + rec.id);
      return;
    }

    if (kind === "demanda") {
      const user = CF.currentUser();
      const d = formTo(form);
      db.demandas.push({
        id: CF.uid("de"), compradorId: user.id, productoId: d.productoId,
        cantidad: Number(d.cantidad), unidad: d.unidad, fechaNecesidad: d.fechaNecesidad,
        notas: d.notas || "", estado: "Abierta"
      });
      CF.saveDB(db);
      go("#/demandas");
      return;
    }

    if (kind === "add-miembro") {
      const user = CF.currentUser();
      const cedula = form.cedula.value.trim();
      const ag = db.agricultores.find(function (a) { return a.cedula === cedula; });
      if (!ag) { alert("No hay un agricultor con esa cédula."); return; }
      ag.organizacionIds = ag.organizacionIds || [];
      if (ag.organizacionIds.indexOf(user.id) === -1) ag.organizacionIds.push(user.id);
      CF.saveDB(db);
      render();
    }
  });

  window.addEventListener("hashchange", render);
  CF.loadDB();
  render();
})();
