class Vue{
    constructor(options){
        // 获取传入的参数
        this.$options = options

        // 获取数据data
        this.$data = options.data

        // 获取挂载点
        this.$el = document.querySelector(options.el)

        // 数据劫持
        this.observer(this.$data)

        // 编译
        new Compile(this.$el , this)
    }

    observer(data){
        // 判断传入的data是否是对象
        if(!data || typeof data !== "object")return
        // 遍历每个key，进行数据劫持
        Object.keys(data).forEach(key => {
            this.defineRective(data, key, data[key])
            this.proxyData(key)
        })

    }

    proxyData(key){
        Object.defineProperty(this,key,{
            get(){
                return this.$data[key]
            },
            set(newVal){
                this.$data[key] = newVal
            }
        })
    }

    defineRective(data, key, value){
        // 递归，如果对象的值还是一个对象，那么就对它进行遍历，进行数据劫持
        this.observer(value)
        var dep = new Dep()

        Object.defineProperty(data, key ,{

            get(){
                // 进行依赖收集
                Dep.target && dep.addDeps(Dep.target)

                // 不能使用data[key]，否则会造成get的死循环
                return value
            },
            set(newVal){
                if(newVal === value)return
                value = newVal

                // 设置新值时触发通知
                dep.notify()
            }
        })
    }
}


class Dep{
    constructor(){
        this.deps = []
    }

    addDeps(dep){
        this.deps.push(dep)
    }

    notify(){
        this.deps.forEach((item) => {
            item.update()
        })
    }
}

class watcher{
    constructor(node , vm , exp ,cb){
        this.$vm = vm
        this.$exp = exp //username
        this.$cb = cb

        Dep.target = this
        console.log(this,'this')
        this.$vm[this.$exp] //读取数据，触发get，收集依赖
        Dep.target = null 
    }

    update(){
        // 将cb函数指向实例，传入更新的数据 
        this.$cb.call(this.$vm, this.$vm[this.$exp])
    }
}