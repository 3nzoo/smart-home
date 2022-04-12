const express = require('express');
const ewelink = require('ewelink-api');
const newDevice = require('./config/keys');
const app = express();
const port = process.env.PORT || 4005;
const cors = require('cors');
const path = require('path');

const connection = new ewelink({
  phoneNumber: require('./config/keys').phoneNumber,
  password: require('./config/keys').password,
  region: require('./config/keys').region,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* toggle device */
app.get('/lamp', async (req, res) => {
  try {
    await connection.toggleDevice(newDevice.lamp);
    res.send('lamp toggled');
  } catch (err) {
    console.log(err);
  }
});

app.get('/laptop/status', async (req, res) => {
  try {
    const laptopstatus = await connection.getDevicePowerState(newDevice.laptop);
    res.send(laptopstatus.state, 'laptop status', laptopstatus);
  } catch (err) {
    console.log(err);
  }
});

app.get('/laptop', async (req, res) => {
  try {
    await connection.toggleDevice(newDevice.laptop);
    res.send('laptop toggeled');
  } catch (err) {
    console.log(err);
  }
});

app.get('/screen', async (req, res) => {
  try {
    await connection.toggleDevice(newDevice.screen);
    res.send('Monitor toggeled');
  } catch (err) {
    console.log(err);
  }
});

app.get('/charger', async (req, res) => {
  try {
    await connection.toggleDevice(newDevice.charger);
    res.send('charger toggeled');
  } catch (err) {
    console.log(err);
  }
});

app.get('/harddrive', async (req, res) => {
  try {
    await connection.toggleDevice(newDevice.harddrive);
    res.send('harddrive toggeled');
  } catch (err) {
    console.log(err);
  }
});

app.get('/mCharger', async (req, res) => {
  try {
    await connection.toggleDevice(newDevice.maCharger);
    res.send('mac Charger toggeled');
  } catch (err) {
    console.log(err);
  }
});

app.get('/ref', async (req, res) => {
  try {
    await connection.toggleDevice(newDevice.ref);
    res.send('Ref toggeled');
  } catch (err) {
    console.log(err);
  }
});

app.get('/all', async (req, res) => {
  try {
    const devices = await connection.getDevices();
    // console.log(devices);
    let devStatus = await devices.map((item) => {
      return { name: item.name.replace(/\s/g, ''), status: item.params.switch };
    });
    const hdstatus = await connection.getDevicePowerState(newDevice.harddrive);
    devStatus.push({ name: 'harddrive', status: hdstatus.state });

    const chargerstatus = await connection.getDevicePowerState(
      newDevice.charger
    );
    devStatus.push({ name: 'charger', status: chargerstatus.state });
    res.json(devStatus);
  } catch (err) {
    console.log(err);
  }
});

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
