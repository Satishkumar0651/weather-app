const request=require('request');
const yargs=require('argv');

const geocode=require('./geocode/geocode');
const weather=require('./weather/weather');

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

geocode.geoAddress(argv.address,(errorMessage,results)=>{
    if(errorMessage){
        console.log('errorMessage');
    }
    else{
        console.log(results.address);
        weather.getWeather(results.latitude,results.longitude,(errorMessage,weatherResults)=>{
            if(errorMessage){
                console.log('unable to connect to servers');
            }else{
               console.log(`it's currently ${weatherResults.temperature}.It feels like ${weatherResults.apparentTemperature}.`);
            }
        
        });
    }

});




