var roleDrone =        require('role.drone');
var roleMule =         require('role.mule');

var E =         require('role.E');
var H0 =         require('role.H0');
var H1 =         require('role.H1');
var J  =         require('role.J');
var P =          require('role.power');
var R =         require('role.R');
var S =          require('role.S');
var T =          require('role.T');
var W =         require('role.W');
var Z =          require('role.Z');

var roleAttack =         require('role.attack');
var roleOxygen =         require('role.oxygen');
 
var roleUpgrader =     require('role.upgrader');
var roleClaimy  =    require('role.claimy');
 
var droneLogic = require('logic.drone');
var repairLogic = require('logic.repair');
var spawnMain = require('spawn.main');

var utility = require('utility');
var utilitySpawn = require('utility.spawn');
var utilityMemory = require('utility.memory');
var utilityMarket = require('utility.market');
var utilityBase = require('utility.base');
var UC = require('utility.construct');



module.exports.loop = function () {
    
    console.log('------------TOP OF MAIN LOOP---------------------     \n' + utility.logGCL() + ' \n');

    if(utility.isOnInterval(117)){utilityMemory.handleMapCache();}
    if(utility.isOnInterval(217)){utilityMemory.handleBoostList();}
    if(utility.isOnInterval(10000)){utility.sendEmailStatus();}
    if(utility.isOnInterval(19)){utilityMemory.clearWar();}
    
    for(var name in Game.rooms) 
    {
        utility.defendRoom(name);
        
        if(utility.getOwner(Game.rooms[name]) == 'Mar10G')
        {
            utility.startPrint('ROOM ' + Memory.myMap[name] + ' - '  + utility.getRoomEnergyStatus(name) );
        
        
        
        
            
            if(utility.isOnInterval(17)){utility.movePower(name);}
            if(utility.isOnInterval(1)){utilitySpawn.main(name);}
            if(utility.isOnInterval(179)){UC.main(name);}
            if(utility.isOnInterval(21)){utilityMemory.doRoomMineral(name);}
            if(utility.isOnInterval(21)){utilityMarket.placeOrders(name);}
            
         //   if(utility.isOnInterval(11)){utility.runLabs(name);}
         
        
        utility.endPrint('ROOM  ');
         
        
        }
    }
    

    utility.startPrint('JOBS  ');
 
     droneLogic.main();
 
    utility.endPrint('JOBS ');

 
 

    
    if(utility.isOnInterval(21)){utilityMemory.cleanDeadDrones();}
    if(utility.isOnInterval(19)){utilityMemory.handleMineralList();}
  
  
  //  if(utility.isOnInterval(117)){utilityMemory.handleBoostList();}
    
     
     utility.startPrint('CREEPS  ');
     
     
    utilityBase.creepBase();

    for(var name in Game.creeps) 
    {
        var startCpu = Game.cpu.getUsed();
        var creep = Game.creeps[name];
        
         if(creep.memory.myFirstLetter == 'A')    {roleAttack.run(creep);}
         if(creep.memory.myFirstLetter == 'B')    {roleAttack.run(creep);}
         if(creep.memory.myFirstLetter == 'C')    {roleClaimy.run(creep);}
         if(creep.memory.myFirstLetter == 'D')    {roleDrone.run(creep);}
         if(creep.memory.myFirstLetter == 'H')    {H0.run(creep);}
         if(creep.memory.myFirstLetter == 'I')    {H1.run(creep);}
         if(creep.memory.myFirstLetter == 'J')    {J.run(creep);}
         if(creep.memory.myFirstLetter == 'K')    {H0.run(creep);}
         if(creep.memory.myFirstLetter == 'O')    {roleOxygen.run(creep);}
         if(creep.memory.myFirstLetter == 'P')    {P.run(creep);}
         if(creep.memory.myFirstLetter == 'R')    {R.run(creep);}
         if(creep.memory.myFirstLetter == 'S')    {S.run(creep);}
         if(creep.memory.myFirstLetter == 'T')    {T.run(creep);}
         if(creep.memory.myFirstLetter == 'U')    {roleUpgrader.run(creep);}
         if(creep.memory.myFirstLetter == 'W')    {W.run(creep);}
         if(creep.memory.myFirstLetter == 'Z')    {Z.run(creep);}
         
         
         creep.runMe(creep.memory.myFirstLetter);
         
        
     
   //     var elapsed = Game.cpu.getUsed() - startCpu;
       // console.log('Creep '+name+' has used '+elapsed+' CPU time');
    //    utilityMemory.handleCreepCPU(creep, elapsed );
    }
    
    utility.endPrint('CREEPS');

    console.log('Total CPU = ' + Game.cpu.getUsed() + '\n------------BOTTOM OF MAIN LOOP---------------------\n \n');
}  



//utilityMemory.handleCPU();




