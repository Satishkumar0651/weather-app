const request=require('request');

var geocodeAddress=(address,callback)=>{

    var encodedAddress=encodeURIComponent(address);
    request({
        url:'https://maps.googleapis.com/maps/api/geocode/json?address=`${encodedAddress}&key=your_api_key`',
        json:true
    },(error,response,body)=>{
        if(error)
        {
            callback('Unable to connect to google servers:');
        }else if(body.status==='ZERO_RESULTS'){
            callback('unable to find address');
        }
        else if(body.status==='OK')
        {
            callback(undefined,{
                address:body.result[0].formatted_address,
                latitute:body.result[0].geometry.location.lat,
                longitude:body.result[0].geometry.location.lng
            });
             
        }
       
    });
    



};


module.exports.geocodeAddress=geocodeAddress;
    
