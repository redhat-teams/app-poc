import { paletteOrder, palettes } from '../palettes';

export default function Controls({ data, onChange, paletteKey, onPaletteChange }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <div className="controls">
      <div className="controls-head">
        <p className="controls-eyebrow">BUSINESS  IT SOLUTIONS </p>
        <h2>Composez votre carton</h2>
        <p className="controls-hint">Chaque champ met à jour l'aperçu à droite, en temps réel.</p>
      </div>

      <div className="field-row">
        <label className="field">
          <span>Prénom 1</span>
          <input value={data.name1} onChange={set('name1')} placeholder="Camille" maxLength={24} />
        </label>
        <label className="field">
          <span>Prénom 2</span>
          <input value={data.name2} onChange={set('name2')} placeholder="Antoine" maxLength={24} />
        </label>
      </div>

      <label className="field">
        <span>Date</span>
        <input value={data.date} onChange={set('date')} placeholder="Samedi 12 septembre 2026" maxLength={40} />
      </label>

      <div className="field-row">
        <label className="field">
          <span>Lieu de réception</span>
          <input value={data.venue} onChange={set('venue')} placeholder="Domaine des Tilleuls" maxLength={30} />
        </label>
        <label className="field">
          <span>Ville</span>
          <input value={data.city} onChange={set('city')} placeholder="Provence" maxLength={24} />
        </label>
      </div>

      <label className="field">
        <span>Mot d'invitation</span>
        <textarea
          value={data.message}
          onChange={set('message')}
          placeholder="Vous êtes chaleureusement invités à célébrer notre union..."
          maxLength={220}
          rows={4}
        />
      </label>

      <div className="field">
        <span>Palette de papeterie</span>
        <div className="swatches">
          {paletteOrder.map((key) => {
            const p = palettes[key];
            const active = key === paletteKey;
            return (
              <button
                key={key}
                type="button"
                className={`swatch${active ? ' swatch-active' : ''}`}
                style={{ '--sw-paper': p.paper, '--sw-accent': p.accent, '--sw-ink': p.ink }}
                onClick={() => onPaletteChange(key)}
                aria-pressed={active}
              >
                <span className="swatch-dot" />
                <span className="swatch-text">
                  <strong>{p.label}</strong>
                  <em>{p.sub}</em>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
