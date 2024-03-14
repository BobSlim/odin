class LinkedList {
    constructor(){
        this._head = null
    }

    get head(){
        return this._head
    }

    set head(value){
        if(!this._head){this._head = value; return}
        value.nextNode = this._head
        this._head = value
    }

    tail = () => {
        const traverse_tail = (node) => {
            if(!node.nextNode){return node}
            return traverse_tail(node.nextNode)
        }
        return traverse_tail(this.head)
    }

    append = (value) => {
        const newNode = new Node(value)
        if(!this.head){this.head = newNode; return}
        this.tail().nextNode = newNode
    }

    prepend = (value) => {
        const newNode = new Node(value)
        this.head = newNode
    }

    size = () => {
        const traverse_size = (node) => {
            if(!node.nextNode){return 1}
            return 1 + traverse_size(node.nextNode)
        }
        return traverse_size(this.head)
    }
    at = (index) => {
        const traverse_at = (node, count = 0) => {
            if(index == count){return node}
            return traverse_at(node.nextNode, count+1)
        }
        return traverse_at(this.head)
    }
    pop = () => {
        const traverse_pop = (node) => {
            if(!node.nextNode.nextNode){
                const output = node.nextNode
                node.nextNode = null
                return output
            }
            return traverse_pop(node.nextNode)
        }
        return traverse_pop(this.head)
    }
    contains = (value) => {
        const traverse_contains = (node) => {
            if(node.value == value){return true}
            if(!node.nextNode){return false}
            return traverse_contains(node.nextNode)
        }
        return traverse_contains(this.head)
    }
    find = (value) => {
        const traverse_find = (node, count=0) => {
            if(node.value == value){return count}
            if(!node.nextNode){return -1}
            return traverse_find(node.nextNode, count+1)
        }
        return traverse_find(this.head)
    }
    toString = () => {
        const traverse_toString = (node, string="") => {
            if(!node.nextNode){return string += `(${node.value}) => null`}
            return traverse_toString(node.nextNode, string += `(${node.value}) => `)
        }
        return traverse_toString(this.head)
    }
    insertAt = (value, index) => {
        
    }
    removeAt = (index) => {

    }
}

class Node {
    constructor(value){
        this.value = value
        this._nextNode = null
    }
    get nextNode(){
        return this._nextNode
    }
    set nextNode(value){
        this._nextNode = value
    }
}

const print = (funct, ...params) => {
    const output = funct(...params)
    console.log(newList.toString())
}

let number = 0

const newList = new LinkedList()
newList.append(number++)
newList.append(number++)
newList.append(number++)
newList.append(number++)
newList.append(number++)
newList.append(number++)
print(newList.pop)
print(newList.toString)
print(newList.at, 2)
print(newList.find, 5)
print(newList.prepend, 2)
print(newList.toString)