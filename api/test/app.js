// console.log('เริ่มต้นทำงาน')
// console.log('โหลดการทำงาน')
// console.log('จบการทำงาน')

// console.log('เริ่มต้นทำงาน')

// setTimeout(()=>{
//     console.log('กำลังโหลด')
// },3000)
// console.log('จบการทำงาน')

function calculate(x,y,callback){
    setTimeout(() => {
        console.log("กำลังคำนวณ....")
        const sum=x+y;
        callback(sum)
    }, 3000);
}
function display (result){
    console.log('ผลบวก ='+result)
}


calculate(100,50,function(result){
    console.log("ผลบวก ="+result)
})
