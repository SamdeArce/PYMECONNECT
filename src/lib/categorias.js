// Algunas categorías guardan el nombre de un icono ("utensils") en vez de un emoji.
// Aquí lo convertimos a emoji para que nunca se vea texto técnico en pantalla.
const POR_NOMBRE = {
  utensils: "🍽️", "shopping-bag": "🛍️", briefcase: "💼", "heart-pulse": "🩺", palette: "🎨",
  store: "🏪", scissors: "✂️", wrench: "🔧", coffee: "☕", shirt: "👕", book: "📚", home: "🏠",
  car: "🚗", gift: "🎁", flower: "🌸", dumbbell: "🏋️", pill: "💊", bread: "🥖",
};
export function iconoCat(v) {
  if (!v) return "📍";
  const t = String(v).trim();
  if (/^[a-z][a-z0-9-]*$/i.test(t)) return POR_NOMBRE[t.toLowerCase()] ?? "📍";
  return t;
}
