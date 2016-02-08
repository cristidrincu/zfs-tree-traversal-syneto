var tree = new Tree('pool');
var finalDisplayArray = [];
tree.add('mirror', 'pool', tree.traverseZFSTree);
tree.add('replacing-0', 'mirror', tree.traverseZFSTree);
tree.add('d1', 'replacing-0', tree.traverseZFSTree);
tree.add('d3', 'replacing-0', tree.traverseZFSTree);
tree.add('d2', 'mirror', tree.traverseZFSTree);

tree.contains(function(node) {        
    if(tree.itPassesReplacingRegExp(node) || tree.itPassesSpareRegExp(node)) {                
        tree.diskRepresentation.push(node.children);                        
    } else if(node.parent !== null && node.parent.data === 'mirror' && 
              ( !(tree.itPassesReplacingRegExp(node)) || !(tree.itPassesSpareRegExp(node))))
    {
            tree.diskRepresentation.push(node.parent.children);            
    }        
    
}, tree.traverseZFSTree);

console.log("Testing replacing without spare");

tree.diskRepresentation.forEach(function(element){
    element.forEach(function(node){        
        if(node.children.length === 0) {
            finalDisplayArray.push(node.data);
        }        
    });
});

console.log(finalDisplayArray);