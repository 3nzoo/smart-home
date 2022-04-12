import axios from 'axios';
import './App.css';

import TitlebarImageList from './components/imageList';

let chargerStat = false;

axios.get('laptop/status').then((res) => {
  if (res.data === 'on') {
    chargerStat = true;
  }
});

setInterval(() => {
  navigator.getBattery().then((battery) => {
    const level = Math.floor(battery.level * 100);
    if (level > 80 && chargerStat) {
      axios.get('/laptop');
      console.log('turned off: ', level);
      chargerStat = false;
    }

    if (level < 30 && !chargerStat) {
      axios.get('/laptop');
      console.log('turned on: ', level);
      chargerStat = true;
    }
    console.log(level);
  });
}, 900000);

function App() {
  return (
    <div className='App'>
      <TitlebarImageList />
    </div>
  );
}

export default App;
