var utility = require('utility');

var myRoomName = 'E49N71';
var targetObject;
var myJob;
var jobsArray ;
var currentJob;
var i;
var currentTarget;
var closest;
var jobToReturn;



var roleDrone = {

   
   
    run: function(creep) 
    {
     //   console.log(creep.name + ' action = ' + creep.memory.action );
        
     //   console.log(creep.name + ' oxygen ' + creep.carry[RESOURCE_OXYGEN] )
        if(creep.carry[RESOURCE_OXYGEN] > 1)
        {
            if(creep.transfer(creep.room.terminal , RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) 
            {
                         //   console.log('going to terminal9');
                creep.moveTo(creep.room.terminal);
                return;
            }
            return;
        }
                
       creep.memory.action = 'doWork' ;
       
    //   console.log(creep.name + ' action = ' + creep.memory.action )
       
     //   if(creep.carry.energy == 0)                   {creep.memory.action = 'charge';}
     //   if(creep.carry.energy == creep.carryCapacity) {creep.memory.action = 'doWork';}
        
        if(creep.memory.action == 'charge')
        {
 
           //    console.log(creep.name + ' charge')
                creep.chargeFromClosestContainerOrSpawn();
                return;
  
            
        }
        
        if(creep.memory.action == 'doWork')
        {
          //  console.log(creep.name + ' do work');
          
         // utility.hello();
          
            if(myJob = utility.getJob(creep.pos, creep.name))
          //  if(myJob = this.getJob(creep.pos, creep.name))
            {    
               // console.log(myJob.priority);
               
                if(myJob.priority > 99)
                {
                  //  console.log('NOT going to mark');
                }
                else
                {
                 //   console.log('mark it');
                    utility.markJob(myJob.guid, creep.name);
                }
                
                targetObject =  Game.getObjectById(myJob.structureID);
                
                if(myJob.action == 'repair')
                {
                    
                //    console.log(creep.name + ' is repair ');
                    
                    if(creep.carry.energy == 0) 
                    {
                    //    console.log(creep.name + ' is charging');
                        
                        creep.doCharge(RESOURCE_ENERGY, creep);
                        //creep.chargeFromClosestContainerOrLink(); 
                        return;
                    }
                    else
                    {
                        if(creep.repair(targetObject) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(targetObject, {visualizePathStyle: { fill: 'transparent', stroke: '#0000FF', lineStyle: 'dashed', strokeWidth: .05, opacity: .5}});
                            
                        }
                        return;
                    }
                }
                
                if(myJob.action == 'charge')
                {
                    if(creep.carry.energy == 0) 
                    {
                        console.log(creep.name + ' is charging');
            
                         creep.doCharge(RESOURCE_ENERGY, creep);
                        //creep.chargeFromClosestContainerOrLink();  
                        return;
                    }
                    else
                    {
                        if(creep.transfer(targetObject, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){creep.moveTo(targetObject);}
                        return;
                    }
                }
                
                if(myJob.action == 'chargeLink')
                {
                    if(creep.carry.energy == 0) 
                    {
                        if(creep.withdraw(targetObject, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){creep.moveTo(targetObject);}
                        return;
                    }
                    else
                    {
                        var links = creep.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_LINK}});
                        var targetObject2 = links[0];
                        
                        if(creep.transfer(targetObject2, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){creep.moveTo(targetObject2);}
                        return;
                    }
                }
                
                if(myJob.action == 'pickup')
                {
                  //  console.log(creep.name + ' got pickup job');
                  //  console.log(creep.carry.energy);
                    
                    /*
                    if(creep.carry.energy >  0) 
                    {
                    //     console.log(creep.name + ' carrying eneryg');
            
                        targetObject = Game.rooms[Memory.myMap['P']].terminal;
                        
                        var x = creep.transfer(targetObject, RESOURCE_ENERGY);
                        
                     //   console.log(x);
                        
                        if(creep.transfer(targetObject, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){creep.moveTo(targetObject);}
                        return;  
                        
                    }
                   
                   
                   if(creep.carry[RESOURCE_OXYGEN] > 1)
                    {
                        if(creep.transfer(creep.room.terminal , RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) 
                        {
                         //   console.log('going to terminal9');
                            creep.moveTo(creep.room.terminal);
                            return;
                        }
                        return;
                    }
                    
                    */
                    if(creep.carry.energy >  0) 
                    {
                        creep.depositToClosestLinkOrContainer();
                    }
                   
                    if(creep.pickup(targetObject) == ERR_NOT_IN_RANGE)
                    {
                        creep.moveTo(targetObject, {visualizePathStyle: { fill: 'transparent', stroke: '#0000FF', lineStyle: 'dashed', strokeWidth: .05, opacity: .5}});
                        
                    }
                    return;
                    
                }
                
                if(myJob.action == 'build')
                {
                     if(creep.carry.energy == 0) 
                    {
                      //  console.log(creep.name + ' is charging');
            
                         creep.doCharge(RESOURCE_ENERGY, creep);
                        //creep.chargeFromClosestContainerOrLink();  
                        return;
                    }
                    else
                    {
                        if(creep.build(targetObject) == ERR_NOT_IN_RANGE)
                        {
                           // creep.moveTo(targetObject);
                            creep.moveTo(targetObject, {visualizePathStyle: { fill: 'transparent', stroke: '#0000FF', lineStyle: 'dashed', strokeWidth: .05, opacity: .5}});
                            
                        }
                        return;
                    }
                }
                
                if(myJob.action == 'empty')
                {
                 //  console.log(creep.name + ' is emptying ' +  targetObject);
                   
                    if(creep.emptyToTerm())
                    {
                        creep.emptyStucture(targetObject);
                    }
                   
                   
                   
                   return;
                    
                   if(creep.carry.energy == 0) 
                    {
                        
            
                         this.doCharge(RESOURCE_ENERGY, creep);
                        //creep.chargeFromClosestContainerOrLink(); 
                        return;
                    }
                    else
                    {
                        if(creep.upgradeController(targetObject) == ERR_NOT_IN_RANGE){creep.moveTo(targetObject);}
                        return;
                    }
                    
                    return;
                }
                
                if(myJob.action == 'upgrade')
                {
                   if(creep.carry.energy == 0) 
                    {
                    //    console.log(creep.name + ' is charging');
            
                         creep.doCharge(RESOURCE_ENERGY, creep);
                        //creep.chargeFromClosestContainerOrLink(); 
                        return;
                    }
                    else
                    {
                        if(creep.upgradeController(targetObject) == ERR_NOT_IN_RANGE){creep.moveTo(targetObject);}
                        return;
                    }
                }
                
                if(myJob.action == 'loadLab')
                {
                    
                  //  console.log(creep.name + ' loading lab with ' + myJob.myMineral)
                    
                    if(creep.carry.energy >  0 && myJob.myMineral != RESOURCE_ENERGY) 
                    {
                      //  console.log(creep.name + ' carrying eneryg');
            
                        targetObject = Game.rooms[Memory.myMap['I']].terminal;
                        
                        if(creep.transfer(targetObject, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){creep.moveTo(targetObject);}
                        return;  
                        
                    }
                    
                    if(creep.carry[myJob.myMineral] > 1)
                    {
                        if(creep.transfer(targetObject, myJob.myMineral) == ERR_NOT_IN_RANGE) 
                        {
                            console.log(creep.name + ' going to lab ');
                            creep.moveTo(targetObject);
                            return;
                        }
                    }
                    else
                    {
                        var targetRoom = targetObject.pos.roomName;
                        console.log('targetRoom = ' + targetRoom);
                        
                        targetObject = Game.rooms[targetRoom].terminal;
                        
                        if(creep.withdraw(targetObject, myJob.myMineral) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(targetObject);
                           console.log(creep.name + ' moving to withdraw');
                        
                            return;
                        }
                    }
                    
                    
                    return;
                    /*
                   if(creep.carry.energy == 0) 
                    {
                    //    console.log(creep.name + ' is charging');
            
                         this.doCharge(RESOURCE_ENERGY, creep);
                        //creep.chargeFromClosestContainerOrLink(); 
                        return;
                    }
                    else
                    {
                        if(creep.upgradeController(targetObject) == ERR_NOT_IN_RANGE){creep.moveTo(targetObject);}
                        return;
                    }
                    */
                }
                
                if(myJob.action == 'transfer')
                {
                   // console.log(creep.name + ' transfer');
                  //  console.log('Memory.jobs.length ' + Memory.jobs.length);
                   // if(creep.upgradeController(targetObject) == ERR_NOT_IN_RANGE){creep.moveTo(targetObject);}
                    
                    if(creep.carry.energy > 0)     
                    {
                      //  console.log(creep.name + ' deposit energy');
                        
                        
                       var targets = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] < i.storeCapacity });
                       
                       var allContainers = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER  });
                       
                       for(i=0; i < allContainers.length; i++)
                       {
                        //   console.log('energy = ' + allContainers[i].store[RESOURCE_ENERGY] );
                       }
        
                      //  console.log('got here 1');
                        if(targets.length > 0) 
                        {
                            var closest =  creep.pos.findClosestByPath(targets);
                        
                      //  console.log('closest ' + closest);
                      
                            var myVar = creep.transfer(closest, RESOURCE_ENERGY);
                            
                            
                          //  console.log(myVar);
                
                            if(creep.transfer(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                            {
                              //  console.log('got here 2');
                                creep.moveTo(closest);
                                return;
                            }
                            
                           // console.log('got here 3');
                            return;
                        }
                        
                      //  console.log('got here 4');
                        return;
                    }
                    
                   
                    
                 //   console.log ('oxygen = ' + creep.carry[RESOURCE_OXYGEN]);
                    
                    if(creep.carry[RESOURCE_OXYGEN] > 1)
                    {
                        if(creep.transfer(creep.room.terminal , RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE) 
                        {
                           // console.log('going to terminal9');
                            creep.moveTo(creep.room.terminal);
                            return;
                        }
                    }
                    else
                    {
                        if(creep.withdraw(targetObject, RESOURCE_OXYGEN) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(targetObject);
                           // console.log(creep.name + ' moving to withdraw');
                        
                            return;
                        }
                    }
                    
                    
                    return;
                    
                    return;
                }
                
                
                return;
            }
            else
            {
                creep.memory.action = 'charge';
                
                console.log(creep.name + ' no job ');
                
                if(creep.recycleMe() == 2)
                {
                    return;
                }
            }
            return;
        }
	}
	
	/*
	, 
	
	
	doCharge: function(resource, myCreep)
    {
      //  console.log(myCreep.name + ' charging with ' +  resource) 
      
      myCreep.depositMineralsToTerm();
    //  return;
       

        myCreep.chargeFromClosestContainerOrLinkOrTerm();
    }
	
	*/
	
	
	/*
	,
	
	markJob: function(myGuid, creepName)
	{
	    console.log(myGuid);
	    
	    jobsArray = Memory.jobs;
	    var i;
	    
	    for(i=0; i < jobsArray.length; i++)
	    {
	       currentJob = jobsArray[i];
	        
	       if(currentJob.guid == myGuid) 
	       {
	           Memory.jobs[i].droneName = creepName;
	           return ;
	           
	       }
	    }  
	},
	
	getJob: function(creepPos, creepName) 
	{
	    if(Memory.jobs.length == 1)
	    {
	        console.log('one job');
	        return Memory.jobs[0];
	    }
	    
	    jobsArray = Memory.jobs;
	    
	    if (Memory.jobs.length > 0)
	    {
	        var highestPriority  
	        highestPriority = this.getHighestPriority();

	        return this.getAnyJob(highestPriority, creepName); 
	        
	       
	        jobToReturn = this.getClosestJob(highestPriority, creepPos);
	        if(jobToReturn == null)
	        {
	            console.log('Closest is null!!!');
	            jobToReturn = this.getAnyJob(highestPriority); 
	            
	        }
	        
	     //   console.log('returning ' + jobToReturn);
	        return jobToReturn;
	        
	        console.log('!!!!!!!!!!!!!!!!!!!!');
	        
	        console.log('locations.length =' +locations.length);
	        console.log(closest);
	        
	        if(closest == null)
	        {
	            console.log('Closest is null!!!');
	            return Memory.jobs[0];
	            
	        }
	        
	        jobsArray = Memory.jobs;
	        for(i=0; i < jobsArray.length; i++)
	        {
	            currentJob = jobsArray[i];
	            if(currentJob.myLocation.x == closest.x && currentJob.myLocation.y == closest.y && currentJob.roomName == closest.roomName) {return currentJob;}
	        }   

	        return Memory.jobs[0];
	    }
	    return false;    
	} ,
	
	getClosestJob: function(priority, creepPos)
	{
	    var locations = [];
	    jobsArray = Memory.jobs;
	    for(i=0; i < jobsArray.length; i++)
	    {
	        currentJob = jobsArray[i];
	        
	        if(currentJob.priority == priority && currentJob.myLocation.roomName == creepPos.roomName) 
	        {
	            locations.push(new RoomPosition(currentJob.myLocation.x, currentJob.myLocation.y, currentJob.myLocation.roomName));
	        }
	            
	   }    
	        
	   closest = creepPos.findClosestByPath(locations);
	   if (closest == null)
	   {
	       console.log('closest is null');
	       return null;
	   }
	   else
	   {
	        return this.getJobByLocation(closest);
	   }
	   
	},
	
	getAnyJob:function(priority, creepName)
	{
	    
	    console.log(priority);
	    console.log(creepName);
	    
	    
	    jobsArray = Memory.jobs;
	    var i;
	    
	    if (priority > 99)
	    {
	        for(i=0; i < jobsArray.length; i++)
	        {
	            currentJob = jobsArray[i];
	        
	            if(currentJob.priority == priority) 
	            {
	                return currentJob;
	            }
	        } 
	        
	    }
	    for(i=0; i < jobsArray.length; i++)
	    {
	        currentJob = jobsArray[i];
	        
	        if(currentJob.droneName == creepName) 
	        {
	            return currentJob;
	        }
	    } 
	    
	    for(i=0; i < jobsArray.length; i++)
	    {
	        currentJob = jobsArray[i];
	        
	        if(currentJob.priority == priority && currentJob.droneName.length < 2) 
	        {
	            return currentJob;
	        }
	    } 
	    
	    return Memory.jobs[0];
	},
	
	getJobByLocation: function(locationToFind)
	{
	    jobsArray = Memory.jobs;
	    for(i=0; i < jobsArray.length; i++)
	    {
	        currentJob = jobsArray[i];
	        if(currentJob.myLocation.x == locationToFind.x && currentJob.myLocation.y == locationToFind.y && currentJob.roomName == locationToFind.roomName) {return currentJob;}
	    }   

        return Memory.jobs[0];
	},
	
	getHighestPriority: function()
	{

	   var highestPriority = 0;
	        
	   jobsArray = Memory.jobs;
	   for(i=0; i < jobsArray.length; i++)
	   {
	       currentJob = jobsArray[i];
	       if(currentJob.priority > highestPriority) {highestPriority = currentJob.priority;}
	   }
	        
	   return highestPriority ;
	}
	
	*/
	
};

module.exports = roleDrone;
