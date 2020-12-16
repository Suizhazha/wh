class dog {
  constructor(name,age) {
    this.name   = name
    this.age = age
  }
  //say就是原型对象上的属性
  say(){
    console.log('name:'+this.name,'age:'+this.age)
  }
}

let dog1 = new dog('wuhao',23)

dog1.age
dog1.name
dog1.say()

console.log(dog1.hasOwnProperty('name'),
dog1.hasOwnProperty('age'),
dog1.hasOwnProperty('say'),
dog1.__proto__.hasOwnProperty('say'))

