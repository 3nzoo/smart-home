const ewelink = require('ewelink-api');

(async () => {

  const connection = new ewelink({
    phoneNumber: require('./config/keys').phoneNumber,
    password: require('./config/keys').password,
    region: require('./config/keys').region,
  });

  /* get all devices */
  const devices = await connection.getDevices();
//   console.log(devices);

  devices.map(item=>{
    //   console.log(item);
      console.log(item.name);
  })

  /* get specific devide info */
  const device = await connection.getDevice('<your device id>');
//   console.log(device);

  /* toggle device */
  await connection.toggleDevice('<your device id>');

  const region = await connection.getRegion();
  console.log(region);

})();