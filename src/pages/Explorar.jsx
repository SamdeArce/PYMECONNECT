import { useEffect, useMemo, useState } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import { useFav } from "../favoritos.jsx";
import Icono from "../components/Icono.jsx";
import { iconoCat } from "../lib/categorias.js";

const FILTROS = [["todos", "Todos"], ["abiertos", "Abiertos ahora"], ["verificados", "Verificados"]];

// true cuando la pantalla es lo bastante ancha para mostrar el panel de detalle a la derecha
function useAncho(px) {
  const consulta = `(min-width:${px}px)`;
  const [v, setV] = useState(() => typeof window !== "undefined" && window.matchMedia(consulta).matches);
  useEffect(() => {
    const m = window.matchMedia(consulta);
    const f = () => setV(m.matches);
    f(); m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, [consulta]);
  return v;
}

function Anillo({ pct }) {
  const r = 24, c = 2 * Math.PI * r;
  return (
    <svg className="dr-anillo" width="64" height="64" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r={r} fill="none" stroke="var(--line)" strokeWidth="6" />
      <circle cx="32" cy="32" r={r} fill="none" stroke="var(--olive)" strokeWidth="6" strokeLinecap="round"
        strokeDasharray={`${(c * pct) / 100} ${c}`} transform="rotate(-90 32 32)" />
      <text x="32" y="36" textAnchor="middle" fontSize="13" fontWeight="800" fill="currentColor">{pct}%</text>
    </svg>
  );
}

function Estado({ n }) {
  return <span className={`estado ${n.abierto_ahora ? "abierto" : "cerrado"}`}>{n.abierto_ahora ? "Abierto ahora" : "Cerrado"}</span>;
}

function BotonFav({ n, activo, alternar, clase = "dr-fav" }) {
  return (
    <button type="button" className={clase} onClick={() => alternar(n.id)} aria-pressed={activo}
      aria-label={`Guardar ${n.nombre} en favoritos`}>
      <Icono n="corazon" size={20} />
    </button>
  );
}

export default function Explorar() {
  const { cats, lista, cargando, error } = useOutletContext();
  const [params, setParams] = useSearchParams();
  const { ids, alternar } = useFav();
  const ancho = useAncho(1280);
  const [sel, setSel] = useState(null);

  const cat = params.get("cat") || "todas";
  const filtro = params.get("f") || "todos";
  const busca = params.get("q") || "";

  const cambiar = (clave, valor, porDefecto) => {
    const p = new URLSearchParams(params);
    if (valor === porDefecto) p.delete(clave); else p.set(clave, valor);
    setParams(p, { replace: true });
  };

  const iconoDe = (slug) => iconoCat(cats.find((c) => c.slug === slug)?.icono);

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return lista.filter((n) => {
      if (cat === "favoritos" && !ids.includes(n.id)) return false;
      if (cat !== "todas" && cat !== "favoritos" && n.categoria_slug !== cat) return false;
      if (filtro === "abiertos" && !n.abierto_ahora) return false;
      if (filtro === "verificados" && !n.verificado) return false;
      return !q || `${n.nombre} ${n.descripcion || ""} ${n.categoria}`.toLowerCase().includes(q);
    });
  }, [lista, busca, cat, filtro, ids]);

  const abiertos = lista.filter((n) => n.abierto_ahora).length;
  const verificados = lista.filter((n) => n.verificado).length;
  const pct = lista.length ? Math.round((abiertos / lista.length) * 100) : 0;
  const activo = filtrados.find((n) => n.id === sel) || filtrados[0];
  const hayFiltros = cat !== "todas" || filtro !== "todos" || busca;
  const limpiar = () => setParams({}, { replace: true });
  const nombreCat = cat === "favoritos" ? "Favoritos" : cats.find((c) => c.slug === cat)?.nombre;

  return (
    <>
      <div className="dr-encabezado">
        <div>
          <p className="etiqueta">DIRECTORIO LOCAL</p>
          <h1>Explorar comercios</h1>
          {nombreCat && cat !== "todas" && <p className="muted dr-sub">Categoría: <strong>{nombreCat}</strong></p>}
        </div>
        <ul className="dr-resumen" aria-label="Resumen del directorio">
          <li className="dr-stat dr-stat-anillo"><Anillo pct={pct} /><span><strong>{abiertos}</strong><small>Abiertos ahora</small></span></li>
          <li className="dr-stat"><strong>{lista.length}</strong><small>Comercios</small></li>
          <li className="dr-stat"><strong>{verificados}</strong><small>Verificados</small></li>
        </ul>
      </div>

      {/* Categorías en fila deslizable: solo en pantallas donde no se ve la barra lateral */}
      <div className="dr-chips-movil" role="group" aria-label="Categorías">
        {[{ slug: "todas", nombre: "Todas", icono: "" }, ...cats.map((c) => ({ ...c, icono: iconoCat(c.icono) })), { slug: "favoritos", nombre: "Favoritos", icono: "♥" }].map((c) => (
          <button key={c.slug} type="button" className={`chip ${cat === c.slug ? "activo" : ""}`}
            onClick={() => cambiar("cat", c.slug, "todas")} aria-pressed={cat === c.slug}>
            {c.icono} {c.nombre}
          </button>
        ))}
      </div>

      <div className="dr-tabs" role="group" aria-label="Filtrar por estado">
        {FILTROS.map(([k, t]) => (
          <button key={k} type="button" className={filtro === k ? "activo" : ""} aria-pressed={filtro === k}
            onClick={() => cambiar("f", k, "todos")}>{t}</button>
        ))}
        <span className="dr-conteo" aria-live="polite">
          {cargando ? "Cargando…" : `${filtrados.length} ${filtrados.length === 1 ? "comercio encontrado" : "comercios encontrados"}`}
        </span>
        {hayFiltros && <button type="button" className="dr-limpiar" onClick={limpiar}>Limpiar filtros</button>}
      </div>
      {cat === "favoritos" && <small className="nota">Tus favoritos se guardan en este dispositivo.</small>}
      {error && <div className="aviso" role="alert">{error}</div>}

      <div className={`dr-contenido ${ancho ? "con-detalle" : ""}`}>
        <ul className="dr-rejilla">
          {cargando && Array.from({ length: 6 }, (_, i) => <li key={i} className="dr-tarjeta dr-esqueleto" aria-hidden="true"><div className="dr-foto" /><div className="dr-tarjeta-cuerpo"><i /><i /></div></li>)}
          {!cargando && filtrados.map((n) => {
            const cuerpo = (
              <>
                <span className="dr-foto">
                  {n.foto_url ? <img src={n.foto_url} alt={`Fachada de ${n.nombre}`} loading="lazy" />
                    : <span className="dr-foto-ico" aria-hidden="true">{iconoDe(n.categoria_slug)}</span>}
                </span>
                <span className="dr-tarjeta-cuerpo">
                  <strong className="dr-nombre">{n.nombre}</strong>
                  <span className="muted dr-cat-linea">{n.categoria}{n.verificado && " · ✔ Verificado"}</span>
                  <Estado n={n} />
                </span>
              </>
            );
            return (
              <li key={n.id} className={`dr-tarjeta ${ancho && activo?.id === n.id ? "activa" : ""}`}>
                {ancho
                  ? <button type="button" className="dr-tarjeta-enlace" onClick={() => setSel(n.id)} aria-pressed={activo?.id === n.id}>{cuerpo}</button>
                  : <Link to={`/comercio/${n.id}`} className="dr-tarjeta-enlace">{cuerpo}</Link>}
                <BotonFav n={n} activo={ids.includes(n.id)} alternar={alternar} />
              </li>
            );
          })}
        </ul>

        {ancho && activo && (
          <aside className="dr-detalle" aria-label={`Vista previa de ${activo.nombre}`}>
            <div className="dr-detalle-foto">
              {activo.foto_url ? <img src={activo.foto_url} alt={`Fachada de ${activo.nombre}`} />
                : <span aria-hidden="true">{iconoDe(activo.categoria_slug)}</span>}
            </div>
            <h2>{activo.nombre}</h2>
            <p className="muted">{activo.categoria}{activo.verificado && " · ✔ Verificado"}</p>
            <Estado n={activo} />
            {activo.descripcion && <p className="dr-detalle-desc">{activo.descripcion}</p>}
            {activo.direccion && <p className="dr-detalle-dir">📍 {activo.direccion}</p>}
            <div className="dr-detalle-acciones">
              <Link to={`/comercio/${activo.id}`} className="btn btn-primario">Ver ficha completa</Link>
              {(activo.telefono || "").replace(/\D/g, "") && <a className="btn btn-borde" href={`tel:${activo.telefono.replace(/\D/g, "")}`}>📞 Llamar</a>}
            </div>
          </aside>
        )}
      </div>

      {!cargando && !filtrados.length && !error && (
        <div className="dr-vacio">
          <span aria-hidden="true">🔎</span>
          <p>{cat === "favoritos" ? "Aún no has guardado comercios en favoritos." : "No encontramos comercios con esa búsqueda."}</p>
          {hayFiltros && <button type="button" className="btn btn-borde" onClick={limpiar}>Ver todos los comercios</button>}
        </div>
      )}
    </>
  );
}
