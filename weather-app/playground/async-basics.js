// var add = (x,y) => {
//     console.log(x+y);
//     return ;
// }
// var square = x => x*x;

// // add((square(5)), 2);
// add(() =>{
//     var two =2;
//     var three =3;
//     return two+three;
// }, 2);

var no1 = 10;
var no2 = 20;

console.log('1st console.log no1 = '+ no1);

setTimeout(()=>{
    no1 = no2;
    console.log('Inside Timeout no1 = ' + no1);
},5000)

console.log('2nd console.log no1 = '+ no1);

setTimeout(() => {
    console.log('Inside Timeout 2 no1 = ' + no1);
},5000)
