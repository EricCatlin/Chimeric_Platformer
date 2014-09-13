#pragma strict
var Spawn : GameObject;
var maxSpawn : int = 100;
var maxAliveAtOnce : int = 10;
var spawnFrequency : float = 5;
var nestRange : float;
private var layerMask : int ;


private var alive : float = 0;
private var totalBorn : float=0;
private var lastSpawnTime : float ;
private var SpawnArray : NestSwarmer[];


function Start () {
	layerMask = 1<<8;
	layerMask = ~layerMask;
	lastSpawnTime = Time.time;
	SpawnArray = new NestSwarmer[maxSpawn];
}


function FixedUpdate() {
	if(alive < maxAliveAtOnce && totalBorn < maxSpawn && Time.time > lastSpawnTime + spawnFrequency){
		var newBorn : GameObject = Instantiate(Spawn,transform.position,Quaternion(0,0,0,0));
		var newBornScript : NestSwarmer = newBorn.GetComponent("NestSwarmer");
		SpawnArray[alive] = newBornScript;
		newBornScript.setNest(this.gameObject);
		Physics.IgnoreCollision(newBorn.collider,this.collider);
		lastSpawnTime = Time.time;
	 	
	}
	

}
function Update(){
//if(Input.GetMouseButtonDown(0)){
//	 	print("click");
//	 		
//	 	var cam = GameObject.Find("Camera Rig");
//	 	var pointInWorld = cam.camera.ScreenToWorldPoint(Input.mousePosition);
//	 	pointInWorld.z=0;
//
//	 	
//	 		sendAllTo(pointInWorld);
//	 	}

}
function addOne(baby : NestSwarmer){
	baby.setUniqueId(alive);
	baby.setDestination(assignNewDestination(alive));
	alive++;
	totalBorn++;
}
function sendAllTo(pos:Vector3){
	for (var i:int = 0; i < alive; i++){
		if(SpawnArray[i] != null){
			var subDestination = pos;
			subDestination.x += (i%10)*5;
			SpawnArray[i].setDestination(subDestination);
		}
	
	}
}
function assignNewDestination(id : int) : Vector3{
	var newDestination = transform.position + Random.insideUnitCircle*nestRange;
	if(!Physics.Linecast(transform.position,newDestination,layerMask)){
		//print(id + "   " + newDestination );
		return newDestination;
	}else{
		//print(id + "  tryingagain " + newDestination );
		return assignNewDestination(id);
	}
}
function removeOne(){
	alive--;
}
function ObjectDead(val : int){
	totalBorn = maxSpawn; // stops spawning, thats all
}
function getRange(){
	return nestRange;
}