var finalDisplayArray = [];

var treeSpareWithoutReplacing = new Tree('pool');
treeSpareWithoutReplacing.add('mirror', 'pool', treeSpareWithoutReplacing.traverseZFSTree);
treeSpareWithoutReplacing.add('spare-0', 'mirror', treeSpareWithoutReplacing.traverseZFSTree);
treeSpareWithoutReplacing.add('d1', 'spare-0', treeSpareWithoutReplacing.traverseZFSTree);
treeSpareWithoutReplacing.add('s1', 'spare-0', treeSpareWithoutReplacing.traverseZFSTree);
treeSpareWithoutReplacing.add('d2', 'mirror', treeSpareWithoutReplacing.traverseZFSTree);

treeSpareWithoutReplacing.contains(function(node) {        
    if(treeSpareWithoutReplacing.itPassesReplacingRegExp(node) || treeSpareWithoutReplacing.itPassesSpareRegExp(node)) {                
        treeSpareWithoutReplacing.diskRepresentation.push(node.children);                        
    } else if(node.parent !== null && node.parent.data === 'mirror' && 
              ( !(treeSpareWithoutReplacing.itPassesReplacingRegExp(node)) || !(treeSpareWithoutReplacing.itPassesSpareRegExp(node))))
    {
            treeSpareWithoutReplacing.diskRepresentation.push(node.parent.children);            
    }        
    
}, treeSpareWithoutReplacing.traverseZFSTree);

console.log("Testing spare without replacing");

treeSpareWithoutReplacing.diskRepresentation.forEach(function(element){    
    element.forEach(function(node){        
        if(node.children.length === 0) {
            finalDisplayArray.push(node.data);            
        }        
    });
});

console.log(finalDisplayArray);