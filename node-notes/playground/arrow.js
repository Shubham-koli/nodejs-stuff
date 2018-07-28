const _ = require('lodash');

var square = (x) => x * x;
console.log(square(9));

var user = {
    name : 'Shubham',
    printName : () => {
        console.log(user.name);
    },
    printNameAlt ()
    {
        console.log(arguments);
        console.log(this.name);
    }
};

user.printNameAlt(1, 2, 3);
