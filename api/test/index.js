// url1 ="kong.dev.file.json"

// function download(url,callback){
//     setTimeout(()=>{
//         console.log('กำลังโหลดไฟล์'+url)
//         callback(url)
//     },3000)
// }
// function complete(result){
//     console.log('ดาวโหลด '+result+' เรียบร้อย')
// }
// download(url1,complete);

// const url1 ="kong.dev.file1.json"
// const url2 ="kong.dev.file2.json"
// const url3 ="kong.dev.file3.json"

// function download(url,callback){
//     setTimeout(()=>{
//         console.log('กำลังโหลดไฟล์'+url)
//         callback(url)
//     },3000)
// }

// download(url1,function(result){
//     console.log('ดาวโหลด '+result+' เรียบร้อย')
//     download(url2,function(result){
//         console.log('ดาวน์โหลด'+result+'เรียบร้อย')
//     })
// });
const http = require('http')

