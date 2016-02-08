var finalDisplayArray = [];
var tree2SparesWithoutReplacing = new Tree('pool');

tree2SparesWithoutReplacing.add('mirror', 'pool', tree2SparesWithoutReplacing.traverseZFSTree);
tree2SparesWithoutReplacing.add('spare-0', 'mirror', tree2SparesWithoutReplacing.traverseZFSTree);
tree2SparesWithoutReplacing.add('spare-1', 'mirror', tree2SparesWithoutReplacing.traverseZFSTree);
tree2SparesWithoutReplacing.add('d1', 'spare-0', tree2SparesWithoutReplacing.traverseZFSTree);
tree2SparesWithoutReplacing.add('s1', 'spare-0', tree2SparesWithoutReplacing.traverseZFSTree);
tree2SparesWithoutReplacing.add('d2', 'spare-1', tree2SparesWithoutReplacing.traverseZFSTree);
tree2SparesWithoutReplacing.add('s2', 'spare-1', tree2SparesWithoutReplacing.traverseZFSTree);

tree2SparesWithoutReplacing.contains(function(node) {        
    if(tree2SparesWithoutReplacing.itPassesReplacingRegExp(node) || tree2SparesWithoutReplacing.itPassesSpareRegExp(node)) {                
        tree2SparesWithoutReplacing.diskRepresentation.push(node.children);                        
    } else if(node.parent !== null && node.parent.data === 'mirror' && 
              ( !(tree2SparesWithoutReplacing.itPassesReplacingRegExp(node)) || !(tree2SparesWithoutReplacing.itPassesSpareRegExp(node))))
    {
            tree2SparesWithoutReplacing.diskRepresentation.push(node.parent.children);            
    }        
    
}, tree2SparesWithoutReplacing.traverseZFSTree);

console.log("Testing 2 spare right without replacing");

tree2SparesWithoutReplacing.diskRepresentation.forEach(function(element){
    element.forEach(function(node){        
        if(node.children.length === 0) {
            finalDisplayArray.push(node.data);            
        }        
    });
});

console.log(finalDisplayArray);