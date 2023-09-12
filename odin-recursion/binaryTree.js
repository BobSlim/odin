class Node {
    left = null
    right = null
    constructor(data){
      this.data = data
    }
    children(){
      const output = []
      if(this.left){output.push(this.left)}; 
      if(this.right){output.push(this.right)};
      return output
    }
}

class Tree {
    constructor(array){
        this.data = array
        this.root
    }
    buildTree(array, start=0, end=-1){
        if(start > end){return null}
        const mid = Math.floor((start + end) / 2)
        const newNode = new Node(this.data[mid])
        newNode.left = this.buildTree(array, start, mid-1)
        newNode.right = this.buildTree(array, mid+1, end)
        return newNode
    }
    
    //default behaviour returns a null node and its parent. leafStop mode returns a leaf node and its parent.
    search(value, node = this.root, leafStop = false){
      const direction = value > node.data ? 'right' : 'left';
      const nextNode = node[direction];
      const stopCon = leafStop ? !nextNode.children().length : !nextNode
      if(stopCon || nextNode.data == value){return {parent: node, node: nextNode, direction}}
      return this.search(value, nextNode)
    }
    
    insert(value){
      const nodeToInsert = this.search(value)
      if(nodeToInsert.node){return false}
      nodeToInsert.parent[nodeToInsert.direction] = new Node(value)
      return nodeToInsert
    }

    delete(value){
      const nodeToDelete = this.search(value)
      console.log(nodeToDelete)
      if(!nodeToDelete.node){return false}
      
      const children = nodeToDelete.node.children()
      console.log(children)
      switch (children.length){
        case 0:
          nodeToDelete.parent[nodeToDelete.direction] = null
          return true
        case 1:
          nodeToDelete.parent[nodeToDelete.direction] = children[0]
          return true
        case 2:
          const successor = this.search(-Infinity, children[1], true)
          //swaps data with close number, deletes useless leaf node.
          nodeToDelete.node.data = successor.node.data
          successor.parent[successor.direction] = null
          return true
      }
    }
    
    levelOrder(funct, nodes = this.root){
      if(!Array.isArray(nodes)){nodes = [nodes]}
      if(!nodes.length){return []}
      const node = nodes.shift()
      nodes = nodes.concat(node.children())
      funct(node)
      return [node ,...this.levelOrder(funct, nodes)]

      // This is technically the behaviour the spec asks for, but I'm not gonna use it. This prevents a return value if a callback is provided.
      // if(funct){
      //   funct(node)
      //   return [node ,...this.levelOrder(funct, nodes)]
      // }

      // this.levelOrder(funct, nodes)
    }

    inOrder(funct = (node) => {}, nodes = this.root){
      if(!Array.isArray(nodes)){nodes = [nodes]}
      if(!nodes.length){return []}
      const node = nodes.pop()
      nodes = nodes.concat(node.children())
      funct(node)
      return [node ,...this.levelOrder(funct, nodes)]
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const randomInt = (max) => {
  return Math.floor(Math.random()*max)
}

const randomsArray = (length, maxNumber) => {
  const array = []
  for (let index = 0; index < length; index++) {
    array.push(randomInt(maxNumber))
  }
  const output = new Int32Array([...new Set(array)]).sort()
  return output
}

const array = randomsArray(16, 100)
const tree = new Tree(array)
tree.root = tree.buildTree(tree.data, 0, tree.data.length-1)
prettyPrint(tree.root)
console.log(tree.search(23))
console.log(tree.search(50))
console.log(tree.search(70))
console.log(tree.insert(20))
prettyPrint(tree.root)
console.log(tree.delete(20))
console.log(tree.delete(40))
console.log(tree.delete(60))
prettyPrint(tree.root)
console.log(tree.levelOrder(console.log))
console.log(tree.levelOrder())