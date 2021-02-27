
//curriedAdd(1)(3) ===4

function curriedAdd(x){
  return function (y){
    return x+y
  }
}

curriedAdd(1)(3)






