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

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7226497c593f98a54d2874a7e7a1a953&query='+latitude+','+longitude;
    request({url : url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect',undefined);
        }else if(response.body.error){
            callback('something missing',undefined);
        }else{
            callback(undefined,{
                currenttemp: response.body.current.temperature,
                feellike: response.body.current.feelslike,
            })
        }
    })
}

geocode('Mumbai',(error, data)=>{
    if(error){
        return console.log(error);
    }
    console.log(data);
    forecast(data.latitude, data.longitude, (innererror,innerdata)=>{
        if(innererror){
            return console.log(innererror);
        }
        console.log(innerdata.currenttemp, innerdata.feellike);
    })
})





