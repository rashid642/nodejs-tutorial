// Async await is used so that promises chaining can be simplified 

const sum = (a, b) => {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(a+b);
        }, 2000);
    })
}

const dowork = async () =>{
    const res = await sum(99,1);
    const res1 = await sum(res,1);
    const res2 = await sum(res1,1);
    return res2;
}

// console.log(dowork());
dowork().then((res)=>{
    console.log(res);
}).catch((e)=>{
    console.log(e);
})