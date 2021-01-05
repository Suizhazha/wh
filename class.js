class Dog {
  constructor(name,age) {
    this.name   = name
    this.age = age
  }
  //say就是原型对象上的属性
  say(){
    console.log('name:'+this.name,'age:'+this.age)
  }
}

let dog1 = new Dog('wuhao',23)

dog1.say()

console.log(dog1.hasOwnProperty('name'),
dog1.hasOwnProperty('age'),
dog1.hasOwnProperty('say'),
dog1.__proto__.hasOwnProperty('say'))

class dogSon extends Dog {
  constructor(action) {

    // 子类必须要在constructor中指定super 函数，否则在新建实例的时候会报错.
    // 如果没有置顶constructor,默认带super函数的constructor将会被添加、

    super('dog2','23');
    this.action = action
  }
  say() {
    console.log(super.action)
  }
}

let dog2 = new dogSon('1')

dog2.say()