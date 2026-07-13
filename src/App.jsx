import { useState } from 'react';
import Controls from './components/Controls.jsx';
import InvitationCard from './components/InvitationCard.jsx';
import { palettes } from './palettes';
import './App.css';

const initialData = {
  name1: '',
  name2: '',
  date: '',
  venue: '',
  city: '',
  message: '',
};

export default function App() {
  const [data, setData] = useState(initialData);
  const [paletteKey, setPaletteKey] = useState('botanique');

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-mark">✦</span>
        <div>
          <p className="app-title">Atelier du Faire-Part</p>
          <p className="app-subtitle">Simulateur de carte de mariage</p>
        </div>
      </header>

      <main className="app-main">
        <Controls
          data={data}
          onChange={setData}
          paletteKey={paletteKey}
          onPaletteChange={setPaletteKey}
        />
        <InvitationCard data={data} palette={palettes[paletteKey]} />
      </main>

      <footer className="app-footer">
        <p>Aperçu à titre indicatif — l'impression réelle peut varier légèrement selon le papier choisi.</p>
      </footer>
    </div>
  );
}
