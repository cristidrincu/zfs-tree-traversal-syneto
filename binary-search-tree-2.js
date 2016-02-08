//Base element in a tree is a node
//A tree has a root node
//A node can have a parent and a list of child nodes, which in turn can have other nodes
//Thus, this becomes a problem of recursion
//Node implementation
function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

//The main characteristic of a tree is it's root node
function Tree(data) {
    //root_node
    var node = new Node(data);
    this._root = node;
    this.data = data;
    this.diskRepresentation = [];
}

//tree traversal using depth-first search
Tree.prototype.traverseZFSTree = function (callback) {
    (function recurse(currentNode) {        
        currentNode.children.forEach(function(childNode) {
            recurse(childNode);
        })
        
        callback(currentNode);
    })(this._root);
}

Tree.prototype.add = function(data, toData, traversalMethod) {
    var child = new Node(data),
    parent = null,
    callback = function(node) {
        if(node.data === toData) {
            parent = node;
        }
    };
    
    this.contains(callback, traversalMethod);
    
    if(parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');    
    }
};

Tree.prototype.addDataToExistingNode = function (dataToAdd, parentNodeData, traversalMethod) {
    var child = new Node(dataToAdd),
        parent = null,
        callback = function(node) {
            if(node.data === parentNodeData) {
                parent = node;
            }
        };
    
    //voi pasa callback-ul definit mai sus metodei de contains pentru a identifica nodul parinte
    this.contains(callback, traversalMethod);
    
    if(parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent');
    }
}

Tree.prototype.contains = function(callback, traverseMethod) {    
    traverseMethod.call(this, callback);
}

Tree.prototype.itPassesReplacingRegExp = function(node){
    var replacingRegExp = new RegExp("replacing-");
    return replacingRegExp.test(node.data);
}

Tree.prototype.itPassesSpareRegExp = function(node){
    var spareRegExp = new RegExp("spare-");
    return spareRegExp.test(node.data);
}