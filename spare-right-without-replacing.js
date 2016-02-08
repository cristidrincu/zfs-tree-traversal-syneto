var finalDisplayArray = [];
var treeSpareRightWithoutReplacing = new Tree('pool');

treeSpareRightWithoutReplacing.add('mirror', 'pool', treeSpareRightWithoutReplacing.traverseZFSTree);
treeSpareRightWithoutReplacing.add('d2', 'mirror', treeSpareRightWithoutReplacing.traverseZFSTree);
treeSpareRightWithoutReplacing.add('spare-0', 'mirror', treeSpareRightWithoutReplacing.traverseZFSTree);
treeSpareRightWithoutReplacing.add('d1', 'spare-0', treeSpareRightWithoutReplacing.traverseZFSTree);
treeSpareRightWithoutReplacing.add('s1', 'spare-0', treeSpareRightWithoutReplacing.traverseZFSTree);

treeSpareRightWithoutReplacing.contains(function(node) {        
    if(treeSpareRightWithoutReplacing.itPassesReplacingRegExp(node) || treeSpareRightWithoutReplacing.itPassesSpareRegExp(node)) {                
        treeSpareRightWithoutReplacing.diskRepresentation.push(node.children);                        
    } else if(node.parent !== null && node.parent.data === 'mirror' && 
              ( !(treeSpareRightWithoutReplacing.itPassesReplacingRegExp(node)) || !(treeSpareRightWithoutReplacing.itPassesSpareRegExp(node))))
    {
            treeSpareRightWithoutReplacing.diskRepresentation.push(node.parent.children);            
    }        
    
}, treeSpareRightWithoutReplacing.traverseZFSTree);

console.log("Testing spare right without replacing");

treeSpareRightWithoutReplacing.diskRepresentation.forEach(function(element){
    element.forEach(function(node){        
        if(node.children.length === 0) {
            finalDisplayArray.push(node.data);            
        }        
    });
});

console.log(finalDisplayArray);