
//split+reverse+join
function reverseString(string){
  return string.split('').reverse().join('')
}

console.log(reverseString("hello"))


// for循环完成字符倒叙拼接
function reverseArray(arr){
  let o = ''
  for (let i = 0; i < arr.length; i++) {

    // 'e'+'h'='eh'  之后同样道理
    o = arr[i]+ o
  }
  return  o
}

console.log(reverseArray('hello'))


//ES6 扩展字符串
//[...str]+reverse+join
function reverseString (str) {
  return [...str].reverse().join('')
}
reverseString('Hello');


//split+reduce
function reverseString(str){
  //倒叙拼接
  return str.split("").reduce((revString, char)=> char + revString, "");
}
alert(reverseString("Learning JavaScript"));