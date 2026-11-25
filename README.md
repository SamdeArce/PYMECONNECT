# PYMECONNECT Maravatío — Fase 1 (visitante)

1. Instala Node.js 18 o superior.
2. En esta carpeta: `npm install`
3. Copia `.env.example` como `.env` y pega tu URL y llave anon de Supabase.
4. `npm run dev` y abre la dirección que muestre la terminal.

## Publicar en GitHub Pages
El workflow `.github/workflows/deploy.yml` compila y publica automáticamente cada push a `main`. En GitHub, abre **Settings > Pages** y selecciona **GitHub Actions** como fuente. Para que la app se conecte a Supabase, crea `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en **Settings > Secrets and variables > Actions > New repository secret**. Usa la llave anon/publishable; nunca publiques la llave `service_role`.

Requiere haber ejecutado `pymeconnect_supabase.sql` (y `antispam_reportes.sql` para los reportes).

## Comerciante y administrador
1. `npm install` (incluye leaflet) y `npm run dev`. No hay que correr SQL: la app usa tu esquema actual (`perfiles`, `comercios`, `productos`, `verificaciones`, `reportes`, `admin_log`) y sus políticas RLS.
2. El **rol se lee de `perfiles.rol`** (`comerciante` | `admin`); una cuenta con `estado != 'activo'` no puede entrar.
3. Rutas comerciante: `/#/login`, `/#/registro`, `/#/panel`, `/#/panel/negocio`, `/#/panel/productos`, `/#/panel/verificacion`.
4. Rutas administrador: `/#/admin` (Resumen), `/#/admin/usuarios`, `/#/admin/comercios`, `/#/admin/verificaciones`, `/#/admin/reportes`.
5. Crear un administrador (ejecútalo tú en el SQL Editor, con el correo de una cuenta ya registrada):

```sql
update public.perfiles
set rol = 'admin', nivel_acceso = 'general'
where id = (select id from auth.users where email = 'TU_CORREO');
```

Nota: la protección de rutas en el navegador es solo UX; la seguridad real es RLS y los triggers de la base de datos.

## Diseño del login
`src/pages/login.css` (bloque "Login v2", todo bajo `.lg-v2`) usa la foto `src/assets/fondo-cafe.jpg` como fondo. Para cambiarla, reemplaza ese archivo. Registro aún usa el diseño anterior.

## Datos reales de las entrevistas
`supabase/entrevistas_datos_reales.sql` carga los 12 comercios del "Registro de entrevistas a comercios locales":
crea la tabla `entrevistas`, una cuenta de comerciante por negocio (`<negocio>@pymeconnect.test`, ya confirmada),
su comercio, su catálogo (productos mencionados, sin precio) y la entrevista. Es idempotente.

1. Abre el archivo, cambia `CAMBIA_ESTA_CLAVE` por la contraseña inicial de esas cuentas.
2. Pégalo en Supabase → SQL Editor → Run. Al final muestra una tabla de comprobación (12 filas).
3. Las respuestas se consultan en `/#/admin/entrevistas` (solo administradores).

Solo se cargan datos reales: 8 entrevistas con respuestas y, para Alcormia Coffee, Centro de Nutrición Mora,
Dulces y Botanas Vale y Fresty, únicamente las observaciones del equipo (las "respuestas simuladas" del borrador no se cargan).
