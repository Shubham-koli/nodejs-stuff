let val = [5, 4, 9, 2, 1];

let bigNo = val.reduce((a, b) =>
    (b > a) ? b : a
);
console.log(bigNo);

let sum = val.reduce((acc, val) => acc + val);
console.log(sum);