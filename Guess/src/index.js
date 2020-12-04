//复习promise,猜大小demo

function fn(){
 return new Promise((resolve,reject)=>{
   setTimeout(()=>{
     let n = parseInt(Math.random()*6+1,10)//[1,7)再parseInt
     resolve(n)
   },3000)
 })
}

//异步
// fn().then(
//   (x)=>{console.log('色子的点数'+x)},
//   ()=>{
//     console.log('摇色子不可能失败！')})


//async和await

//await is only valid in async function

async function test(){
  let n = await fn()
}