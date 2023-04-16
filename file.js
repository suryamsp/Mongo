const fs=require("fs");

const quote = "lcihdsadgsi ihdsdh iihdhs dihdihdsdhi";

// fs.writeFile("./name.txt",quote,(err)=>{
//     console.log("completed sucess")
// });

// for (let i=1; i<=process.argv[2]; i++){
//     fs.writeFile(`./backup/nam ${i}.txt`,quote,(err)=>{
//         console.log("completed sucess")
//     });
// }
// const [, ,nooffiles]= process.argv;
// genFiles(nooffiles);

//  function genFiles(nooffiles){
//     if (nooffiles > 10){
//         console.log("maxsimum nunber reached 💀");
//         return; // stop panna use pandram
//     }

//     for (let i=1; i<=nooffiles; i++){
//         fs.writeFile(`./backup/nam ${i}.txt`,quote,(err)=>{
//             console.log("completed sucess")
//         });
//     }
//  }

// //Reading files
//  fs.readFile("./name.txt","utf-8",(err,data)=>{
//     console.log(data);
//  });

// // // apending

// const data= " pooda pofff ljhvlf ,hjghg jhfjgkjjhh";
// fs.appendFile("./name.txt", "\n" + data , (err)=>{ 
//     console.log("complted appending");
// })

// // Delete 

for(let i=1; i<=20; i++){
fs.unlink(`./backup/nam ${i}.txt`,(err)=>{
    console.log("deleted suess");
});
}