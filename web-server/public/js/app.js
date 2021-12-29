console.log("at start");



const form = document.querySelector('form');
const input = document.querySelector('input');
const temp = document.querySelector('#temp');
const feellike = document.querySelector('#feellike');

temp.textContent="Enter a location......";

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    temp.textContent="Loading......";
    const location = input.value;
    fetch("http://localhost:3000/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                temp.textContent=data.error;
            }else{
                console.log("current temp="+data.info.currenttemp);
                console.log("feellike="+data.info.feellike);
                temp.textContent="Current temperature = "+data.info.currenttemp;
                feellike.textContent="Current temperature feel's like = "+data.info.feellike;
            }
        })
    })  
    console.log("submitted "+ location);
})