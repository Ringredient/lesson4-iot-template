const ruuvi = require('node-ruuvitag');
const fetch=(...args)=> import('node-fetch').then(({default:fetch})=>fetch(...args));

ruuvi.on('found', (tag) => {
  console.log(`Found RuuviTag with id: ${tag.id}`);

  tag.on('updated', (data) => {

    // const body = { message: `temperature: ${data.temperature}` };
    if(tag.id==='d37d47ba9069'){
      console.log(`${tag.id}: ${JSON.stringify(data)}`);
      const body = {temperature: data.temperature, humidity: data.humidity};
      fetch('http://95.216.207.110:9000/api/events', {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
    }
  });
});
