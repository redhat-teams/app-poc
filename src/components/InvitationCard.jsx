import { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { Download, Loader2 } from 'lucide-react';

function initials(a, b) {
  const first = (a || '?').trim().charAt(0).toUpperCase();
  const second = (b || '?').trim().charAt(0).toUpperCase();
  return `${first || '?'} ${second || '?'}`;
}

export default function InvitationCard({ data, palette }) {
  const { name1, name2, date, city, venue, message } = data;
  const cardRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  const style = {
    '--paper': palette.paper,
    '--paper-shadow': palette.paperShadow,
    '--ink': palette.ink,
    '--accent': palette.accent,
    '--accent-soft': palette.accentSoft,
    '--seal': palette.seal,
    '--seal-text': palette.sealText,
  };

  const handleExportPng = async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      // On cache temporairement le bouton pour ne pas l'inclure dans l'export
      const button = cardRef.current.querySelector('.seal-button');
      if (button) button.style.visibility = 'hidden';

      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3, // haute résolution pour l'impression
        cacheBust: true,
        backgroundColor: palette.paper,
      });

      if (button) button.style.visibility = 'visible';

      const link = document.createElement('a');
      const filename = `faire-part-${(name1 || 'invite').toLowerCase()}-${(name2 || '').toLowerCase()}.png`;
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erreur lors de l'export PNG :", err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="stage">
      <div className="card-stack" style={style} aria-hidden="true">
        <span className="stack-leaf stack-leaf-2" />
        <span className="stack-leaf stack-leaf-1" />
      </div>

      <article
        ref={cardRef}
        className="card"
        style={style}
        role="img"
        aria-label={`Faire-part de mariage de ${name1 || 'Prénom 1'} et ${name2 || 'Prénom 2'}`}
      >
        <div className="card-frame">
          <svg className="ornament ornament-top" viewBox="0 0 240 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20 C 60 4, 90 4, 120 20 C 150 4, 180 4, 220 20" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
            <circle cx="120" cy="20" r="2.6" fill="var(--accent)" />
            <circle cx="20" cy="20" r="1.8" fill="var(--accent-soft)" />
            <circle cx="220" cy="20" r="1.8" fill="var(--accent-soft)" />
          </svg>

          <p className="eyebrow">Ils se disent&nbsp;oui</p>

          <h1 className="names">
            <span>{name1 || 'Prénom un'}</span>
            <span className="amp">&amp;</span>
            <span>{name2 || 'Prénom deux'}</span>
          </h1>

          <div className="rule" />

          <p className="date">{date || 'Samedi 12 septembre 2026'}</p>
          <p className="place">
            {venue ? `${venue}` : 'Domaine des Tilleuls'}
            {city ? ` — ${city}` : ' — Provence'}
          </p>

          <p className="message">
            {message ||
              "Vous êtes chaleureusement invités à célébrer notre union et à partager cette journée avec nous."}
          </p>

          <svg className="ornament ornament-bottom" viewBox="0 0 240 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20 C 60 36, 90 36, 120 20 C 150 36, 180 36, 220 20" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
            <circle cx="120" cy="20" r="2.6" fill="var(--accent)" />
            <circle cx="20" cy="20" r="1.8" fill="var(--accent-soft)" />
            <circle cx="220" cy="20" r="1.8" fill="var(--accent-soft)" />
          </svg>
        </div>

        <button
          type="button"
          className="seal seal-button"
          onClick={handleExportPng}
          disabled={exporting}
          title="Télécharger la carte en PNG"
          aria-label="Télécharger la carte en PNG"
        >
          {exporting ? <Loader2 className="seal-icon spin" size={18} /> : <Download className="seal-icon" size={18} />}
        </button>
      </article>
    </div>
  );
}