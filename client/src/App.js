import axios from 'axios';
import './App.css';

import TitlebarImageList from './components/imageList';

const laptopStatus = axios.get('laptop/status');

console.log(laptopStatus.data);

let chargerStat = false;

setInterval(() => {
  navigator.getBattery().then((battery) => {
    const level = Math.floor(battery.level * 100);
    if (level > 80 && chargerStat) {
      axios.get('https://mysmarthomeph.herokuapp.com/laptop');
      // axios.get('/laptop');
      console.log('turned off: ', level);
      chargerStat = false;
    }

    if (level < 30 && !chargerStat) {
      axios.get('https://mysmarthomeph.herokuapp.com/laptop');
      // axios.get('/laptop');
      console.log('turned on: ', level);
      chargerStat = true;
    }
    // document.querySelector('.bat-status').textContent = level * 100;
    console.log(level);
  });
}, 60000);

function App() {
  return (
    <div className='App'>
      <TitlebarImageList />
    </div>
  );
}

export default App;
