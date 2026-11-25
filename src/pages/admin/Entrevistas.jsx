import { Fragment, useEffect, useMemo, useState } from "react";
import { supabase } from "../../supabase.js";
import Icono from "../../components/Icono.jsx";
import { ESTADO_ENTREVISTA, NECESIDADES, celdaCsv, tono } from "../../lib/etiquetas.js";

// Registro de entrevistas a comercios locales (tabla `entrevistas`, solo lectura para administradores).
// Los datos se cargan con supabase/entrevistas_datos_reales.sql.
function Stat({ icono, titulo, valor, nota }) {
  return (
    <article className="pn-stat">
      <div className="pn-stat-ico"><Icono n={icono} /></div>
      <h2>{titulo}</h2><p className="pn-stat-num">{valor ?? "—"}</p><small>{nota || " "}</small>
    </article>
  );
}

export default function Entrevistas() {
  const [filas, setFilas] = useState(null);
  const [error, setError] = useState("");
  const [busca, setBusca] = useState("");
  const [giro, setGiro] = useState("todos");
  const [estado, setEstado] = useState("todos");
  const [abierto, setAbierto] = useState(null);

  useEffect(() => {
    supabase.from("entrevistas")
      .select("*, comercio:comercios(id,nombre,descripcion)")
      .order("giro").order("created_at")
      .then(({ data, error: e }) => {
        if (e) { console.error(e); setError("No pudimos cargar las entrevistas. ¿Ya corriste supabase/entrevistas_datos_reales.sql?"); }
        setFilas(data || []);
      });
  }, []);

  const giros = useMemo(() => [...new Set((filas || []).map((f) => f.giro))], [filas]);
  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return (filas || []).filter((f) =>
      (giro === "todos" || f.giro === giro) && (estado === "todos" || f.estado === estado) &&
      (!q || `${f.comercio?.nombre} ${f.entrevistado} ${f.tipo_negocio || ""} ${f.sintesis || ""}`.toLowerCase().includes(q)));
  }, [filas, busca, giro, estado]);

  const realizadas = (filas || []).filter((f) => f.estado === "realizada");
  // Necesidades más mencionadas: solo cuentan las entrevistas realizadas (las otras son hipótesis del equipo)
  const ranking = useMemo(() => {
    const c = {};
    realizadas.forEach((f) => (f.necesidades || []).forEach((n) => { c[n] = (c[n] || 0) + 1; }));
    return Object.entries(c).sort((a, b) => b[1] - a[1]);
  }, [filas]); // eslint-disable-line react-hooks/exhaustive-deps
  const max = ranking[0]?.[1] || 1;
  const quierenCatalogo = realizadas.filter((f) => (f.necesidades || []).includes("catalogo")).length;

  function exportar() {
    const cab = ["Comercio", "Giro", "Tipo de negocio", "Entrevistado", "Estado", "Necesidades", "Síntesis"];
    const cuerpo = lista.map((f) => [f.comercio?.nombre, f.giro, f.tipo_negocio, f.entrevistado, ESTADO_ENTREVISTA[f.estado],
      (f.necesidades || []).map((n) => NECESIDADES[n] || n).join("; "), f.sintesis]);
    const csv = "﻿" + [cab, ...cuerpo].map((r) => r.map(celdaCsv).join(",")).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    a.download = "entrevistas_pymeconnect.csv"; a.click(); URL.revokeObjectURL(a.href);
  }

  return (
    <>
      <div className="pn-cabecera"><div>
        <p className="pn-fecha">ADMINISTRACIÓN</p><h1>Entrevistas a comercios</h1>
        <p className="muted">Instrumento aplicado a comercios locales para definir las funciones de la plataforma.</p>
      </div>
      <button className="pn-btn-oscuro" onClick={exportar} disabled={!lista.length}><Icono n="descarga" /> Exportar CSV</button></div>
      {error && <p className="msg error" role="alert">{error}</p>}

      <section className="pn-stats" aria-label="Resumen de entrevistas">
        <Stat icono="negocio" titulo="Comercios registrados" valor={filas?.length} nota={`${giros.length} giros`} />
        <Stat icono="entrevista" titulo="Entrevistas realizadas" valor={filas && realizadas.length} nota="Con respuestas del encargado" />
        <Stat icono="reporte" titulo="Sin entrevista" valor={filas && filas.length - realizadas.length} nota="Solo observaciones del equipo" />
        <Stat icono="capas" titulo="Quieren catálogo digital" valor={filas && quierenCatalogo} nota={`de ${realizadas.length} entrevistados`} />
      </section>

      {ranking.length > 0 && (
        <section className="pn-card" aria-label="Necesidades más mencionadas">
          <div className="pn-card-cab"><h2>Necesidades más mencionadas</h2><small className="muted">Solo entrevistas realizadas</small></div>
          <ul className="pn-necesidades">
            {ranking.map(([k, n]) => (
              <li key={k}>
                <span>{NECESIDADES[k] || k}</span>
                <span className="pn-nec-barra" aria-hidden="true"><span style={{ width: `${(n / max) * 100}%` }} /></span>
                <strong>{n}</strong>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="pn-card">
        <div className="pn-filtros">
          <input type="search" className="campo" placeholder="Buscar comercio, entrevistado o síntesis" value={busca}
            onChange={(e) => setBusca(e.target.value)} aria-label="Buscar entrevistas" />
          <select className="campo" value={giro} onChange={(e) => setGiro(e.target.value)} aria-label="Filtrar por giro">
            <option value="todos">Todos los giros</option>
            {giros.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <select className="campo" value={estado} onChange={(e) => setEstado(e.target.value)} aria-label="Filtrar por estado">
            <option value="todos">Todas</option>
            {Object.entries(ESTADO_ENTREVISTA).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>
        <div className="pn-tabla-caja">
          <table className="pn-tabla">
            <thead><tr><th>Comercio</th><th>Giro</th><th>Entrevistado</th><th>Estado</th><th>Necesidades</th><th>Acciones</th></tr></thead>
            <tbody>
              {filas === null && <tr><td colSpan={6} className="muted">Cargando…</td></tr>}
              {filas && lista.length === 0 && <tr><td colSpan={6} className="muted">No hay entrevistas en esta vista.</td></tr>}
              {lista.map((f) => (
                <Fragment key={f.id}>
                  <tr>
                    <td><strong>{f.comercio?.nombre}</strong>{f.tipo_negocio && <small className="muted"> · {f.tipo_negocio}</small>}</td>
                    <td>{f.giro}</td>
                    <td>{f.entrevistado}</td>
                    <td><span className={`pn-estado ${tono(f.estado === "realizada" ? "" : "pendiente")}`}>{ESTADO_ENTREVISTA[f.estado]}</span></td>
                    <td className="pn-corto">{(f.necesidades || []).map((n) => NECESIDADES[n] || n).join(", ") || "—"}</td>
                    <td><button className="pn-link" aria-expanded={abierto === f.id} onClick={() => setAbierto(abierto === f.id ? null : f.id)}>
                      {abierto === f.id ? "Ocultar" : "Ver entrevista"}</button></td>
                  </tr>
                  {abierto === f.id && (
                    <tr className="pn-detalle"><td colSpan={6}>
                      <div className="pn-entrevista">
                        <p className="pn-ent-sintesis"><strong>{f.estado === "realizada" ? "Síntesis para la plataforma" : "Posible aportación (hipótesis por validar)"}:</strong> {f.sintesis}</p>
                        {f.observaciones?.length > 0 && (<>
                          <h3>Observaciones del equipo</h3>
                          <ul>{f.observaciones.map((o, i) => <li key={i}>{o}</li>)}</ul>
                          <p className="muted">Aún no se registran respuestas del encargado; pendiente realizar la entrevista.</p>
                        </>)}
                        {f.respuestas?.length > 0 && (<>
                          <h3>Respuestas</h3>
                          <ol className="pn-ent-qa">
                            {f.respuestas.map((r, i) => (
                              <li key={i}><strong>{r.pregunta}</strong><span>{r.respuesta || <em className="muted">Sin respuesta registrada.</em>}</span></li>
                            ))}
                          </ol>
                        </>)}
                        <p className="muted">Fecha de la entrevista: {f.fecha ? new Date(f.fecha).toLocaleDateString("es-MX") : "por completar"}</p>
                      </div>
                    </td></tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
