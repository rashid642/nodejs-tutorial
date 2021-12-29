const request = require('request');

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

module.exports={
    forecast: forecast,
}