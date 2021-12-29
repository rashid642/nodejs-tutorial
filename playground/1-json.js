const fs = require('fs');
/*
const book = {
	title: "harry porter",
	author: "rashid"
}

const bookJSON=JSON.stringify(book);
//console.log(book);
//console.log(bookJSON);

//const parseJSON=JSON.parse(bookJSON);
//console.log(parseJSON);

fs.writeFileSync('1-json.json',bookJSON);

*/

const dataBuffer=fs.readFileSync('1-json.json');
const dataJSON= dataBuffer.toString();
const data = JSON.parse(dataJSON);

data.title= "Naruto";
newdata = JSON.stringify(data);
fs.writeFileSync("1-json.json",newdata);
//console.log(data.title);