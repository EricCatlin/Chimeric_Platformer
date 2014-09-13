#pragma strict
var spawnSpot : GameObject;
private var SpawnPoint : Array = new Array(1);
private var activeSpawnPoint : GameObject;
private var animatingCoolDown : boolean;
private var jumpLocation : Vector3;
private var play : GameObject;
private var movement : PlayerMovement;
var chargedSound : AudioClip;
private var isMainSelection: boolean;
private var Paused : boolean;
var respawnSound : AudioClip;
private var indicator : ObjectLabel;
 
function Start () {
	play = GameObject.Find("Player");
	movement = play.GetComponent(PlayerMovement);
	
	
}

function setCheckPoint(){
	if(GameObject.Find("CheckPoint(Clone)")){
		Destroy(GameObject.Find("CheckPoint(Clone)"));
	}
		var spawn = Instantiate(spawnSpot,transform.position,Quaternion.identity);
		activeSpawnPoint = spawn;
		indicator = activeSpawnPoint.gameObject.GetComponentInChildren(ObjectLabel);
		indicator.target = activeSpawnPoint.transform;
		movement.setCheckpoint(activeSpawnPoint.transform.position,true);
		animateCoolDown(true);
		
		
}
function getIsMainSelection(){
	return isMainSelection;
}
function setIsMainSelection(bool:boolean){
	isMainSelection = bool;
}
function getIsPaused(){
	return Paused;
}
function setIsPaused(bool:boolean){
	Paused = bool;
}
function playRespawnSound(){
	movement.playSound(respawnSound);

}
function Update () {
	if(isMainSelection){
		if(movement.getIsFire1ing() ){
			setCheckPoint();
		}else if(movement.getIsFire2ing() && play.GetComponent(PlayerMovement).isHasCheckpoint()&& (Time.time - movement.getCheckPointTimer()>5)){
			movement.sendBackToCheckPoint();
		}
	}
	if(animatingCoolDown){
		if(Time.time - movement.getCheckPointTimer()<5){
			activeSpawnPoint.renderer.material.color=Color.Lerp(activeSpawnPoint.renderer.material.color,Color.yellow,.005);
		}else{
			activeSpawnPoint.renderer.material.color = Color.green;
			animatingCoolDown = false;
			movement.playSound(chargedSound);
		}
	}
	if(indicator){
		indicator.gameObject.guiTexture.color = activeSpawnPoint.renderer.material.color;

	}
}
function animateCoolDown(bool : boolean){
	
	animatingCoolDown = true;
	activeSpawnPoint.renderer.material.color = Color.red;
}



