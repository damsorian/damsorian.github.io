# damsorian.github.io

Sitio personal de Cristian Urbano, publicado con GitHub Pages desde `main`.

## Cómo se edita

1. Los textos en inglés y español están en [`src/content.mjs`](src/content.mjs).
2. `node src/build.mjs` genera:
   - `index.html` (inglés, `/`) y `es/index.html` (español, `/es/`), con todo el contenido en el HTML, legible sin JavaScript para buscadores y agentes de IA;
   - `cristian-urbano.md` y `es/cristian-urbano.md`, el mismo contenido en Markdown (lo abre el botón Markdown).
   - `robots.txt` (todo abierto, con el sitemap), `sitemap.xml` (con `hreflang`), `llms.txt` (resumen y enlaces para agentes de IA) y `404.html`.

Cada página lleva título y descripción por idioma, canonical, `hreflang`, Open Graph, el Markdown enlazado como `alternate` y datos estructurados (`ProfilePage` con `Person`: cargo, ubicación, LinkedIn, GitHub, temas e idiomas).

**Dominio:** la URL del sitio está en `SITE.url` de `src/content.mjs`. Si cambia el dominio, se cambia ahí y se vuelve a correr el build.
3. Se versionan los archivos generados: GitHub Pages sirve el repo tal cual.

El estilo (tokens del DS de Cristian Urbano) y el JavaScript mínimo (modal de Markdown y preferencia de idioma) están en `src/build.mjs`. No hay dependencias.

## Otros archivos

| Archivo | Qué es |
|---|---|
| `assets/cristian-urbano.jpg` | Foto del encabezado, 208 px. |
| `assets/cristian-urbano-512.jpg` | Foto para los datos estructurados. |
| `uploads/crisur2.png` | Foto original, para el CV y la imagen para compartir. |
| `og.png` | Imagen para compartir el link (1200×630). |
| `favicon.svg`, `apple-touch-icon.png` | Íconos. |
| `cristian-urbano-en.pdf`, `cristian-urbano-es.pdf` | CV de una página; se generan con `tools/cv/build.py` (el título del PDF sale del `<title>`). |

El CV tiene su propia versión condensada de los textos en `tools/cv/build.py`: si cambia el contenido del sitio, actualizarla también.
