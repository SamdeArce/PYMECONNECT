import { Suspense, lazy, useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import DirectorioLayout from "./pages/directorio/DirectorioLayout.jsx";
import Explorar from "./pages/Explorar.jsx";
import Comercio from "./pages/Comercio.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import RutaProtegida from "./RutaProtegida.jsx";
import PanelLayout from "./pages/panel/PanelLayout.jsx";
import Inicio from "./pages/panel/Inicio.jsx";
const MiNegocio = lazy(() => import("./pages/panel/MiNegocio.jsx")); // carga el mapa (Leaflet) solo cuando se necesita
import Catalogo from "./pages/panel/Catalogo.jsx";
import Verificacion from "./pages/panel/Verificacion.jsx";
import Proximamente from "./pages/panel/Proximamente.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Resumen from "./pages/admin/Resumen.jsx";
import Usuarios from "./pages/admin/Usuarios.jsx";
import Comercios from "./pages/admin/Comercios.jsx";
import Verificaciones from "./pages/admin/Verificaciones.jsx";
import Reportes from "./pages/admin/Reportes.jsx";

const leer = (k, def) => { try { return localStorage.getItem(k) ?? def; } catch { return def; } };
const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } };

export default function App() {
  const [oscuro, setOscuro] = useState(leer("tema", "claro") === "oscuro");
  const { pathname } = useLocation();
  const pantallaCompleta = pathname === "/login" || pathname === "/registro" || pathname.startsWith("/panel") || pathname.startsWith("/admin");
  const [grande, setGrande] = useState(leer("texto", "normal") === "grande");

  useEffect(() => {
    document.documentElement.dataset.theme = oscuro ? "dark" : "light";
    document.documentElement.classList.toggle("texto-grande", grande);
    guardar("tema", oscuro ? "oscuro" : "claro");
    guardar("texto", grande ? "grande" : "normal");
  }, [oscuro, grande]);

  // Login y panel tienen su propio diseño de pantalla completa: sin encabezado público.
  if (pantallaCompleta) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route element={<RutaProtegida rol="administrador" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Resumen />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="comercios" element={<Comercios />} />
            <Route path="verificaciones" element={<Verificaciones />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="*" element={<Proximamente titulo="Página no encontrada" />} />
          </Route>
        </Route>
        <Route element={<RutaProtegida rol="comerciante" />}>
          <Route path="/panel" element={<PanelLayout />}>
            <Route index element={<Inicio />} />
            <Route path="negocio" element={<Suspense fallback={<p className="muted" role="status">Cargando…</p>}><MiNegocio /></Suspense>} />
            <Route path="productos" element={<Catalogo />} />
            <Route path="ubicacion" element={<Proximamente titulo="Ubicación" />} />
            <Route path="verificacion" element={<Verificacion />} />
            <Route path="perfil" element={<Proximamente titulo="Perfil" />} />
            <Route path="ayuda" element={<Proximamente titulo="Ayuda" />} />
            <Route path="*" element={<Proximamente titulo="Página no encontrada" />} />
          </Route>
        </Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<DirectorioLayout oscuro={oscuro} setOscuro={setOscuro} grande={grande} setGrande={setGrande} />}>
        <Route path="/" element={<Explorar />} />
        <Route path="/comercio" element={<Navigate to="/" replace />} />  {/* sin id no hay qué mostrar: vuelve al directorio */}
        <Route path="/comercio/:id" element={<Comercio />} />
        <Route path="*" element={<p>Página no encontrada. <Link to="/">Volver al directorio</Link></p>} />
      </Route>
    </Routes>
  );
}
