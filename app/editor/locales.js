import en from '@/content/locales/en.json';
import de from '@/content/locales/de.json';
import es from '@/content/locales/es.json';
import ja from '@/content/locales/ja.json';
import ar from '@/content/locales/ar.json';

/**
 * Locale packs. `en` is generated from the template defaults by
 * scripts/extract-locale.mjs and is the translation baseline; the rest are
 * partial by design — anything a pack omits falls back to English rather than
 * rendering an empty field.
 *
 * Every non-English pack carries `_status: 'needs-native-review'`. The editor
 * shows that state so nobody mistakes machine-assisted copy for approved brand
 * voice, which matters more than usual for a privacy/compliance product.
 */
export const LOCALES = [en, de, es, ja, ar].map((l) => ({
  code: l._locale,
  label: l._label,
  script: l._script,
  status: l._status,
  note: l._note,
  templates: l.templates,
}));

export const DEFAULT_LOCALE = 'en';

export const getLocale = (code) =>
  LOCALES.find((l) => l.code === code) ?? LOCALES[0];

/**
 * Field values for one template in one locale, English-backfilled.
 * @returns {{values:object, translated:number, total:number}}
 */
export function localeContent(code, templateId, fields) {
  const loc = getLocale(code);
  const base = getLocale(DEFAULT_LOCALE).templates[templateId] ?? {};
  const over = loc.templates[templateId] ?? {};
  const values = {};
  let translated = 0;
  let total = 0;
  for (const f of fields ?? []) {
    // Array-shaped fields (repeating rows) are structural, not prose — they are
    // not part of the translation surface and always come from the default.
    if (Array.isArray(f.def)) {
      values[f.k] = f.def.map((r) => ({ ...r }));
      continue;
    }
    total++;
    if (over[f.k] != null) {
      values[f.k] = over[f.k];
      translated++;
    } else {
      values[f.k] = base[f.k] ?? f.def;
    }
  }
  return { values, translated, total };
}
