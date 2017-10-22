var utility = require('utility');

var harvestFrom ;
var depositTo ;

var roleMule = 
{
    run: function(creep)
    {
      //  var harvestFrom = Memory.myMap[creep.memory.mySecondLetter];
      // var depositTo = Memory.myMap[creep.memory.myThirdLetter];
        
        harvestFrom = utility.getRoomByLetter(creep.memory.mySecondLetter, creep);
        depositTo = utility.getRoomByLetter(creep.memory.myThirdLetter, creep);
        
      //   console.log(creep.name + ' from ' + harvestFrom);
      //   console.log(creep.name + ' to ' + depositTo);
        
        if(creep.carry.energy == 0)                   {creep.memory.action = 'charge';}
        if(creep.carry.energy == creep.carryCapacity) {creep.memory.action = 'deposit';}
        
        if(creep.memory.action == 'charge')
        {
         //   console.log(creep.name + ' ' + harvestFrom);
            
            if(creep.room.name != harvestFrom)
            {
                creep.moveToRoom(harvestFrom);
                return;
             
              //  creep.moveTo(new RoomPosition(25, 25, harvestFrom));
             
             /*   
                creep.moveTo(new RoomPosition(25, 25, harvestFrom), {visualizePathStyle: {
    fill: 'transparent',
    stroke: '#fff',
    lineStyle: 'dashed',
    strokeWidth: .15,
    opacity: .1}});
    */
    
    
                return;
            }
            else
            {
                var sources = creep.room.find(FIND_SOURCES);
                var mySource = 1;
             //   var mySource = creep.name.length % 2;
                
               // console.log('mySource = ' + mySource)
                
                if(typeof(sources[mySource]) == 'undefined')
                {
                 //  console.log('gt her 1');
                    mySource = 0;
                }
                
                mySource = 0;
                
                if(creep.harvest(sources[mySource]) == ERR_NOT_IN_RANGE) 
                {
                    creep.moveTo(sources[mySource]);
                }
                return;
            }
            
            return;
            console.log('REALLY SHOULD NOT GET HERE');
        }
        
        if(creep.memory.action == 'deposit')
        {
            if(creep.room.name != depositTo )
                {
                    creep.moveTo(new RoomPosition(25, 25, depositTo));
                    return;
                }
                else
                {
                    var targets = creep.room.find(FIND_STRUCTURES, { filter: (i) => 
                            (i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] < i.storeCapacity) ||
                            (i.structureType == STRUCTURE_LINK && i.energy < i.energyCapacity)
                        
                    });
                    
                   
            
                  //  console.log(creep.name + ' targets ' + targets.length)
            
                    if(targets.length > 0) 
                    {
                        var closest =  creep.pos.findClosestByPath(targets);
                        
                   //     console.log(creep.name + ' closest ' + closest + ' of ' + targets.length + ' targets');
                
                        if(creep.transfer(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                        {
                            creep.moveTo(closest);
                            return;
                        }
                        
                        return;
                    }
                    return;
                }
                
            console.log('got here an probably should not ' + creep.name + ' ' + creep.memory.action);
        }
	}
};

module.exports = roleMule;
