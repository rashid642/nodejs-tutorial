// const geocode=(address, callback)=>{
//     const data={
//         longitude:0,
//         latitude:0,
//     }
//     return data;
// }
// const data = geocode("mumbai");
// console.log(data);

const geocode=(address, callback)=>{
    setTimeout(()=>{
        const data={
            longitude:0,
            latitude:0,
        }
        callback(data);
    },2000)
    
}

geocode("mumbai",(data)=>{
    console.log(data);
});
