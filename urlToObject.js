//获取url方法
//window.location.href

//
function getUrlkey(url){
  var params = {},
    arr = url.split("?");
  if (arr.length <= 1)
    return params;
  arr = arr[1].split("&");
  for(var i=0, l=arr.length; i<l; i++){
    var a = arr[i].split("=");
    params[a[0]] = a[1];
  }
  return params;
}
var url = "http://www.chenwenbo.info?key0=0&key1=1&key2=2",
  ps = getUrlkey(url);
console.log(ps["key1"]);