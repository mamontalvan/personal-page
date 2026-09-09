(function () {
  CF.loadDB();
  const root = document.getElementById("tablero");
  if (!root) return;
  root.innerHTML = CF.dashboardHTML();
  CF.mountDashboard();
})();
