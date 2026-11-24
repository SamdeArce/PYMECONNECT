import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { supabase, configurado } from "../../supabase.js";
import { useFav } from "../../favoritos.jsx";
import Sello from "../../components/Sello.jsx";
import Icono from "../../components/Icono.jsx";
import { iconoCat } from "../../lib/categorias.js";
import "./directorio.css";

// Estructura de las pantallas públicas: barra lateral (menú + categorías) + barra superior con buscador.
// Carga una sola vez las categorías y el directorio y los comparte con las páginas hijas.
export default function DirectorioLayout({ oscuro, setOscuro, grande, setGrande }) {
  const [cats, setCats] = useState([]);
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [abierto, setAbierto] = useState(false);
  const { ids } = useFav();
  const [params] = useSearchParams();
  const loc = useLocation();
  const nav = useNavigate();

  const enInicio = loc.pathname === "/";
  const cat = enInicio ? params.get("cat") || "todas" : "";
  const q = enInicio ? params.get("q") || "" : "";

  useEffect(() => {
    if (!supabase) { setCargando(false); return; }
    Promise.all([
      supabase.from("categorias").select("id,nombre,slug,icono").order("id"),
      supabase.from("directorio").select("*").order("nombre"),
    ]).then(([c, d]) => {
      if (c.error || d.error) setError("No pudimos cargar los comercios. Intenta de nuevo.");
      setCats(c.data || []);
      setLista(d.data || []);
      setCargando(false);
    });
  }, []);

  useEffect(() => setAbierto(false), [loc.pathname, loc.search]);
  useEffect(() => {
    if (!abierto) return;
    const f = (e) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [abierto]);

  const conteo = useMemo(() => {
    const m = {};
    lista.forEach((n) => { m[n.categoria_slug] = (m[n.categoria_slug] || 0) + 1; });
    return m;
  }, [lista]);
  const max = Math.max(1, ...Object.values(conteo));

  const buscar = (v) => {
    const p = new URLSearchParams(enInicio ? params : {});
    if (v) p.set("q", v); else p.delete("q");
    const s = p.toString();
    nav({ pathname: "/", search: s ? `?${s}` : "" }, { replace: true });
  };

  return (
    <div className="dr-app">
      <div className="dr-marco">
        <aside className={`dr-lado ${abierto ? "abierto" : ""}`} aria-label="Menú del directorio">
          <div className="dr-lado-in">
            <Link to="/" className="dr-marca" aria-label="PYMECONNECT, ir al inicio">
              <Sello className="dr-sello" />
              <span><strong>PYMECONNECT</strong><small>TUS NEGOCIOS MÁS CERCA · MARAVATÍO</small></span>
            </Link>

            <div className="dr-lado-scroll">
            <p className="dr-titulo-lado">Menú</p>
            <nav aria-label="Principal">
              <ul className="dr-menu">
                <li><Link to="/" className={`dr-item ${enInicio && cat === "todas" ? "activo" : ""}`} aria-current={enInicio && cat === "todas" ? "page" : undefined}>
                  <span className="dr-ico"><Icono n="inicio" /></span> Explorar</Link></li>
                <li><Link to="/?cat=favoritos" className={`dr-item ${cat === "favoritos" ? "activo" : ""}`}>
                  <span className="dr-ico"><Icono n="corazon" /></span> Favoritos <span className="dr-num">{ids.length}</span></Link></li>
              </ul>
            </nav>

            <p className="dr-titulo-lado">Categorías</p>
            <ul className="dr-cats">
              {cats.map((c) => {
                const n = conteo[c.slug] || 0;
                return (
                  <li key={c.slug}>
                    <Link to={`/?cat=${c.slug}`} className={`dr-cat ${cat === c.slug ? "activo" : ""}`}>
                      <span className="dr-cat-ico" aria-hidden="true">{iconoCat(c.icono)}</span>
                      <span className="dr-cat-txt">
                        <span className="dr-cat-nombre">{c.nombre}</span>
                        <span className="dr-barra"><i style={{ width: `${(n / max) * 100}%` }} /></span>
                      </span>
                      <span className="dr-num">{n}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            </div>

            <div className="dr-lado-pie">
              <Link to="/login" className="dr-acceso dr-solo-movil"><Icono n="negocio" /> Acceso comerciantes</Link>
              <div className="dr-ajustes">
                <button type="button" onClick={() => setGrande(!grande)} aria-pressed={grande}>Aa {grande ? "Texto normal" : "Texto grande"}</button>
                <button type="button" onClick={() => setOscuro(!oscuro)} aria-pressed={oscuro}>{oscuro ? "☀ Claro" : "☾ Oscuro"}</button>
              </div>
            </div>
          </div>
        </aside>
        {abierto && <div className="dr-velo" onClick={() => setAbierto(false)} aria-hidden="true" />}

        <div className="dr-cuerpo">
          <header className="dr-barra-sup">
            <button type="button" className="dr-hamb" onClick={() => setAbierto(!abierto)} aria-expanded={abierto} aria-label={abierto ? "Cerrar menú" : "Abrir menú"}>
              <Icono n={abierto ? "cerrar" : "menu"} size={22} />
            </button>
            <form className="dr-buscar" role="search" onSubmit={(e) => e.preventDefault()}>
              <Icono n="busca" size={18} />
              <input type="search" value={q} onChange={(e) => buscar(e.target.value)}
                placeholder="¿Qué estás buscando? Ej. pan, café" aria-label="Buscar comercios" />
            </form>
            <Link to="/login" className="btn btn-primario dr-acceso-sup"><Icono n="negocio" /> Acceso comerciantes</Link>
          </header>

          <main className="dr-main">
            {!configurado && (
              <div className="aviso" role="alert">
                Falta conectar Supabase. Copia <code>.env.example</code> como <code>.env</code> y
                llena tus datos; luego reinicia con <code>npm run dev</code>.
              </div>
            )}
            <Outlet context={{ cats, lista, cargando, error }} />
          </main>
        </div>
      </div>
    </div>
  );
}
