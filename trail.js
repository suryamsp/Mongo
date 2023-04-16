// console.log("Abithra");
// console.log(process.argv); // argv - argument value

// const dob=(n)=> n*2;
// // console.log(dob(10));

// console.log(dob(process.argv[2]));

// const dob=(c)=> ((c*1.8)+32);
// // console.log(dob(10));

// // console.log(dob(process.argv[2]));

// //destruture

// const [, , cel]=process.argv;
// console.log(dob(cel));


const dob=(c)=> {
    return (((c*1.8)+32).toFixed(2));
}

const [, , cel]=process.argv;
console.log(dob(cel));

// Browser to node js delay 6 month

