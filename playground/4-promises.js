// const doWorkCallBack=(callback)=>{
//     setTimeout(()=>{
//         callback("ERORR!!1",undefined)
//     },2000)   
// }

// doWorkCallBack((error, result)=>{
//     if(error){
//         console.log(error);
//     }else{
//         console.log(result);
//     }
// })


// const doWorkPromise = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         // resolve([1,2,3,4]);
//         reject("things went wrong");
//     },2000)
// })

// doWorkPromise.then((result)=>{
//     console.log("SUCCESS!! "+result);
// }).catch((error)=>{
//     console.log("FAILURE!! "+error);
// })

const sum = (a, b) => {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(a+b);
        }, 2000);
    })
}

// sum(2,3).then((sum)=>{
//     console.log(sum);
//     sum(sum, 4).then((sum2)=>{
//         console.log(sum2);
//     }).catch((e)=>{
//         console.log(e);
//     })
// }).catch((e)=>{
//     console.log(e);
// })

sum(2,3).then((res)=>{
    console.log(res);
    return sum(res, 4);
}).then((res2)=>{
    console.log(res2)
}).catch((e)=>{
    console.log(e);
})