/* 
    将标签转化成js对象
*/
class Compile{
    constructor(el ,vm){
        this.$el = el
        this.$vm = vm
        if( this.$el ) 
        {
            // 获取APP下的所有节点
            this.$fragment = this.getNodeFragment(this.$el)  //会返回装载着节点的文档碎片
            // 编译（对文档碎片进行编译）
            this.compile(this.$fragment)  
            // 将节点插入到app中
            this.$el.appendChild(this.$fragment)
        }
    }
    getNodeFragment(root){
        // 创建文档碎片，减少DOM操作
        var frag = document.createDocumentFragment()
        
        var child;
        while(child = root.firstChild){ //如果 root存在子节点，那么条件就会成立
            // 文档碎片会保存在js内存当中，与此同时 页面上的节点会消失
            frag.appendChild(child)
        }
        
        return frag
    }

    compile(fragment){
        // 获取文档碎片中的所有节点
        var childNodes = fragment.childNodes
        Array.from(childNodes).forEach((node) => {
            if( this.isText(node) ){
                this.compileText(node)
            }

            if( this.isElement(node) ){
                // 获取当前节点所有的属性
                var attrs = node.attributes

                Array.from(attrs).forEach((attr) => {
                    var key = attr.name
                    var value = attr.value  //属性的值， v-text="name" 中 value为name

                    // 判断是指令还是事件
                    if(this.isDirection(key)){
                        console.log(key,'key')
                        var dir = key.substr(2)  //获取v-on后的指令名称
                        this[dir + 'update'] && this[dir + 'update'](node, this.$vm[value]) //第二个参数传入value
                    }

                    if(this.isEvent(key)){
                        var dir = key.substr(1)
                        // value就是绑定的事件名称，dir是触发事件的方式
                        this.handleEvent(node , this.$vm , value , dir)
                    }
                })

                // this.compileElement(node)
            }

            if( node.childNodes && node.childNodes.length >0)
            {
                this.compile(node)  //如果子节点下还有节点，就进行递归编译
            }
        })
        
    }

    isElement(node){
        return node.nodeType === 1 //元素节点的节点类型为1
    }

    isText(node){
         //文本节点的节点类型是3
        return node.nodeType === 3 && /\{\{(.+)\}\}/.test(node.textContent) //如果是文本节点，并且文本节点中有内容返回true
    }

    compileText(node){
        // RegExp.$1选中的是{{}}里边的内容，会选取最近一次的匹配的结果
        console.log(RegExp.$1,'RegExp.$1')
        this.update(node,this.$vm, RegExp.$1,'text')
       /*
            node      元素
            this.vm  vue的实例
            RegExp.$1   {{属性}}
            text      标识
       */
    }

    // 传入的dir是元素类型的标识，区分text和element
    update(node, vm, exp , dir){
        var updateFn = this[dir + 'update']  //读取对应的更新函数
        // 更新函数存在时， 调用，传入节点，以及value , vm是vue实例，实例中挂载这对应的数据
        // exp对应vue实例中 data下的key， vm[exp]则是获取对应key的值
        updateFn && updateFn(node , vm[exp])
        new watcher(node , vm ,exp , (value) => {
            updateFn && updateFn(node , vm[exp])
        })
    }

    textupdate(node , value){
        node.textContent = value
    }

    isDirection(attr){
        // 存在v-on即为true（此处以v-on为例）
        return attr.indexOf('v-') === 0
    }

    isEvent(attr){
        return attr.indexOf('@') === 0
    }

    handleEvent(node , vm ,cb ,type){
        // 判断绑定的方法在vue中的methods中是否存在，如果存在则 为该节点绑定这个方法
        var fn = vm.$options.methods && vm.$options.methods[cb]

        node.addEventListener(type , fn.bind(vm))
    }
}