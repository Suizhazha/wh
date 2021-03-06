//复习promise,猜大小demo

function fn(m){
  console.log('开始摇色子，请等待3秒！')
 return new Promise((resolve,reject)=>{
   setTimeout(()=>{
     let n = parseInt(Math.random()*6+1,10)//[1,7)再parseInt

     if(n>3){
       if (m==='大'){
         resolve(n)
       }else {
         reject(n)
       }
     }else {
       if (m==='小'){
         resolve(n)
       }else {
         reject(n)
       }
     }
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

// async function test(){
//    try{
//      let n=await fn('大')
//      console.log('赢了！'+n)
//    }catch (error){
//      console.log('输了！'+error)}
// }
//
// test()


//摇两个色子
async function test(){
  try{
    //all需要多个都成功，race一个成功即可
    let n=await Promise.all([fn('大'),fn('大')])
    console.log('赢了！'+n)
  }catch (error){
    console.log('输了！'+error)}
}

test()
