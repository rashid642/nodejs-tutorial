const request = require('request');

const geocode=(address,callback)=>{
    const url2='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFzaGlkLW1vaGFtbWVkIiwiYSI6ImNrd3lsN3VycjA5M3Iycmw0ZTByemI5cWsifQ.USNInwLa1axxHStdbjdkAg';
    request({url : url2, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect',undefined);
        }else if(response.body.features.length===0){
            callback('something missing',undefined);
        }else{
            // console.log(response.body.features[0].place_name);
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports={
    geocode: geocode,
}




