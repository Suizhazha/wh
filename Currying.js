
//curriedAdd(1)(3) ===4

function curriedAdd(x){
  return function (y){
    return x+y
  }
}

curriedAdd(1)(3)

// Add3(2) === 5

function Add3(fn,...args1) {
  return function (...args2) {
    return fn(...args1, ...args2)
  }
}
let increment = Add3(add,3)

increment(2) ===5




