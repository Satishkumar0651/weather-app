const yargs=require('argv');
const axois=require('axios');

const argv=yargs
    .option({
        a:{
            demand:true,
            alias:'address',
            string:true,
            description:'Address to fetch weather'

        }

})
.help()
.alias('help','h')
.argv;

var encodedAddress=encodeURIComponent(argv.address);
var geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=your_api_key`

axois.get(geocodeUrl).then((response)=>{
    if(response.data=='ZERO_RESULTS'){
        throw new Error('Unable to find the address');
    }
    var latitude=response.data.results[0].geometry.location.lat;
    var longitude=response.data.results[0].geometry.location.lng;
    var weatherUrl=`https://api.darksky.net/forecast/your_api_key/${latitude},${longitude}`
    console.log(response.data.results[0].formatted_address);
    return axois.get(weatherUrl)

}).then((response)=>{
    var temperature=response.data.currently.temperature;
    var apparentTemperature=response.data.currrently.apparentTemperature;

    console.log(`it's currently ${temperature}.It feels like ${apparentTemperature}.`)
}).catch((e)=>{
    if(e.code=='ENOTFOUND'){
        console.log('Unable to connect to API servers');
    }else{
        console.log(e.message);
    }
   
});