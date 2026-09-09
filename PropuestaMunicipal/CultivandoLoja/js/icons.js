window.CF = window.CF || {};

CF.ICON_SVG = {
  smartphone: '<svg viewBox="0 0 48 48"><rect x="14" y="6" width="20" height="36" rx="3" fill="#42A5F5"/><rect x="17" y="10" width="14" height="24" fill="#E3F2FD"/><circle cx="24" cy="38" r="2" fill="#fff"/></svg>',
  television: '<svg viewBox="0 0 48 48"><rect x="6" y="8" width="36" height="24" rx="2" fill="#5C6BC0"/><rect x="9" y="11" width="30" height="18" fill="#BBDEFB"/><path d="M18 36h12l2 4H16z" fill="#3949AB"/></svg>',
  sanitario: '<svg viewBox="0 0 48 48"><rect x="16" y="8" width="16" height="8" rx="2" fill="#90A4AE"/><path d="M14 16h20v8c0 8-4 14-10 14s-10-6-10-14z" fill="#78909C"/><rect x="22" y="38" width="4" height="4" fill="#607D8B"/></svg>',
  agua_natural: '<svg viewBox="0 0 48 48"><path d="M6 30c6-8 10-8 16 0s12 8 20 0" fill="none" stroke="#26A69A" stroke-width="3"/><path d="M4 36c8-6 12-6 20 0s14 6 20 0" fill="none" stroke="#80CBC4" stroke-width="3"/><path d="M24 8c0 0-8 10-8 16a8 8 0 0016 0c0-6-8-16-8-16z" fill="#29B6F6"/></svg>',
  internet: '<svg viewBox="0 0 48 48"><path d="M10 34h28v6H10z" fill="#8D6E63"/><path d="M14 20h20v14H14z" fill="#A1887F"/><circle cx="24" cy="16" r="8" fill="none" stroke="#42A5F5" stroke-width="2"/><circle cx="24" cy="16" r="4" fill="none" stroke="#42A5F5" stroke-width="2"/><circle cx="24" cy="16" r="1.5" fill="#42A5F5"/></svg>',
  whatsapp: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18" fill="#25D366"/><path d="M16 32l1.5-5.5A10 10 0 1132 30l-5 1.6z" fill="#fff"/><path d="M20 22c.4 2 2.2 4 4 4.4" fill="none" stroke="#25D366" stroke-width="1.6"/></svg>',
  luz: '<svg viewBox="0 0 48 48"><path d="M12 34h24v6H12z" fill="#FFB300"/><path d="M16 18h16v16H16z" fill="#FFE082"/><path d="M24 8v6M12 16l4 3M36 16l-4 3" stroke="#FFC107" stroke-width="2"/><circle cx="24" cy="26" r="3" fill="#fff"/></svg>',
  computadora: '<svg viewBox="0 0 48 48"><rect x="8" y="8" width="24" height="18" rx="1" fill="#546E7A"/><rect x="10" y="10" width="20" height="14" fill="#90CAF9"/><rect x="32" y="14" width="8" height="20" rx="1" fill="#455A64"/><path d="M6 30h28v3H6z" fill="#37474F"/></svg>',
  tanque: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="14" rx="12" ry="5" fill="#90A4AE"/><path d="M12 14v18c0 3 5 5 12 5s12-2 12-5V14" fill="#78909C"/><ellipse cx="24" cy="32" rx="12" ry="5" fill="#607D8B"/></svg>',
  agua_potable: '<svg viewBox="0 0 48 48"><path d="M14 14h10v6H14z" fill="#90A4AE"/><path d="M24 16h10v4c0 4-2 6-6 6" fill="none" stroke="#546E7A" stroke-width="3"/><path d="M28 28c0 0-6 8-6 12a6 6 0 0012 0c0-4-6-12-6-12z" fill="#29B6F6"/></svg>',
  motoguadana: '<svg viewBox="0 0 48 48"><rect x="8" y="20" width="14" height="8" rx="2" fill="#43A047"/><path d="M22 24h18" stroke="#616161" stroke-width="3"/><circle cx="40" cy="24" r="5" fill="#9E9E9E"/><path d="M10 18h8v4h-8z" fill="#2E7D32"/></svg>',
  fumigadora: '<svg viewBox="0 0 48 48"><circle cx="18" cy="18" r="7" fill="#FFCC80"/><rect x="14" y="24" width="8" height="14" fill="#42A5F5"/><path d="M22 28h12l4-6" stroke="#8D6E63" stroke-width="2"/><circle cx="38" cy="20" r="3" fill="#66BB6A"/></svg>',
  correo: '<svg viewBox="0 0 48 48"><rect x="8" y="12" width="32" height="24" rx="2" fill="#5C6BC0"/><path d="M8 12l16 12L40 12" fill="none" stroke="#E8EAF6" stroke-width="2"/></svg>',
  gas: '<svg viewBox="0 0 48 48"><rect x="16" y="10" width="16" height="30" rx="3" fill="#42A5F5"/><rect x="20" y="6" width="8" height="6" rx="1" fill="#1E88E5"/><circle cx="24" cy="24" r="4" fill="#BBDEFB"/></svg>',
  estanteria: '<svg viewBox="0 0 48 48"><rect x="10" y="8" width="28" height="4" fill="#8D6E63"/><rect x="10" y="22" width="28" height="4" fill="#8D6E63"/><rect x="10" y="36" width="28" height="4" fill="#8D6E63"/><rect x="10" y="8" width="3" height="32" fill="#6D4C41"/><rect x="35" y="8" width="3" height="32" fill="#6D4C41"/></svg>',
  cuenta_bancaria: '<svg viewBox="0 0 48 48"><rect x="6" y="14" width="36" height="22" rx="3" fill="#FFA726"/><rect x="10" y="20" width="12" height="8" rx="1" fill="#FFE0B2"/><rect x="26" y="28" width="12" height="4" fill="#FFF3E0"/></svg>',
  auto: '<svg viewBox="0 0 48 48"><path d="M8 28h32l-4-10H16z" fill="#FB8C00"/><rect x="6" y="28" width="36" height="8" rx="2" fill="#EF6C00"/><circle cx="14" cy="36" r="4" fill="#424242"/><circle cx="34" cy="36" r="4" fill="#424242"/></svg>',
  manguera: '<svg viewBox="0 0 48 48"><path d="M12 32c8-16 16 8 24-8" fill="none" stroke="#29B6F6" stroke-width="5" stroke-linecap="round"/><circle cx="12" cy="32" r="4" fill="#0277BD"/></svg>',
  generador: '<svg viewBox="0 0 48 48"><rect x="8" y="16" width="32" height="20" rx="2" fill="#546E7A"/><rect x="14" y="20" width="10" height="8" fill="#90A4AE"/><path d="M28 22l4 6-4 4" stroke="#FFEB3B" stroke-width="2"/></svg>',
  invernadero: '<svg viewBox="0 0 48 48"><path d="M8 36V22L24 10l16 12v14z" fill="#A5D6A7"/><path d="M24 10v26M8 22h32" stroke="#2E7D32" stroke-width="1.5"/></svg>',
  tractor: '<svg viewBox="0 0 48 48"><rect x="10" y="18" width="18" height="12" fill="#43A047"/><rect x="24" y="14" width="12" height="16" fill="#2E7D32"/><circle cx="14" cy="34" r="6" fill="#424242"/><circle cx="34" cy="32" r="8" fill="#616161"/></svg>',
  motosierra: '<svg viewBox="0 0 48 48"><rect x="6" y="20" width="16" height="10" rx="2" fill="#FF7043"/><path d="M22 24h20" stroke="#9E9E9E" stroke-width="4"/><path d="M24 20h16v8H24z" fill="#BDBDBD"/></svg>',
  pozo: '<svg viewBox="0 0 48 48"><path d="M10 22h28v16H10z" fill="#90A4AE"/><path d="M8 18h32v4H8z" fill="#6D4C41"/><path d="M16 8h16v10H16z" fill="#A1887F"/><circle cx="24" cy="30" r="5" fill="#29B6F6"/></svg>',
  panel_solar: '<svg viewBox="0 0 48 48"><rect x="10" y="12" width="28" height="18" rx="1" fill="#1565C0"/><path d="M10 21h28M24 12v18M17 12v18M31 12v18" stroke="#90CAF9" stroke-width="1"/><path d="M22 30l2 8h0" stroke="#6D4C41" stroke-width="3"/></svg>'
};

CF.icon = function (id) {
  return CF.ICON_SVG[id] || CF.ICON_SVG.smartphone;
};
