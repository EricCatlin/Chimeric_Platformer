#pragma strict

private var mousePos : Vector3;
private var player : GameObject ;
private var movement : PlayerMovement;
private var cam : Camera;
//private var reticalTexture: GameObject;
private var reticalIsLockedToWorld : boolean;
private var emptyGameObject : GameObject;
private var reticalFocus:GameObject;
private var Adjustment : Vector3;
private var adjustingPosition:boolean = false;




function OnBecameInvisible(){
	//reticalTexture.SetActive(true);
}
function OnBecameVisible(){
	//reticalTexture.SetActive(false);
}
function Start () {
//	reticalTexture = GameObject.Find("ReticalTexture");
	//	reticalTexture.SetActive(false);


	player = GameObject.Find("Player");
	movement = player.GetComponent("PlayerMovement");
	cam    = GameObject.FindObjectOfType(Camera);
	reticalFocus = GameObject.Find("ReticalZone");	
}

//function Update () {
//	if(movement.getIsInAimMode()){
//		movement.setAimSpot(reticalFocus.transform.position);
//		var touchPos = transform.position;
//		touchPos.z=0;
//		var layerMask : int = 1<<8;
//		layerMask = ~layerMask;
//		var colliders : Collider[] = Physics.OverlapSphere(touchPos, 20,layerMask);
//    	var closest : Collider;
//		for (var hit : Collider in colliders) {
//    		if (!hit){
//    			continue;
//      		}
//    		if (hit.collider && !hit.tag.Equals("1DMG")&& !hit.tag.Equals("Pickup")){
//    			if(closest == null ||Vector3.Distance(touchPos, hit.ClosestPointOnBounds(touchPos))< Vector3.Distance(touchPos,closest.ClosestPointOnBounds(touchPos))){
//					closest = hit;
//    				
//   				}
//   			}
//   		}
//   		if(closest){
//   			reticalFocus.transform.position = closest.ClosestPointOnBounds(touchPos);
//    		reticalFocus.transform.position-=cam.transform.forward*30;
//	  	}else{
//	  		touchPos.z=-30;
//	  		reticalFocus.transform.position = touchPos;
//   		}
//		
//	}
//}
function FixedUpdate(){
	if(!movement.getIsInAimMode()){
		movement.setAimSpot(reticalFocus.transform.position);
		var touchPos = transform.position;
		touchPos.z=0;
		var layerMask : int = 1<<8;
		layerMask = ~layerMask;
		var colliders : Collider[] = Physics.OverlapSphere(touchPos, 20,layerMask);
    	var closest : Collider;
		for (var hit : Collider in colliders) {
    		if (!hit){
    			continue;
      		}
    		if (hit.collider && !hit.tag.Equals("1DMG") && !hit.tag.Equals("Pickup") && !hit.transform.root.tag.Equals("Player")){
    			if(closest == null ||Vector3.Distance(touchPos, hit.ClosestPointOnBounds(touchPos))< Vector3.Distance(touchPos,closest.ClosestPointOnBounds(touchPos))){
					closest = hit;
   				}
   			}
   		}
   		if(closest){
   			reticalFocus.transform.position = closest.ClosestPointOnBounds(touchPos);
	  	}else{
	  		touchPos.z=-30;
	  		reticalFocus.transform.position = touchPos;
   		}
		if(adjustingPosition){ 
		//print("AdjustingApplied");
			transform.position =  player.transform.position + Adjustment;	
			adjustingPosition = false;
		}
	}
}
function getAdjusting(){
	return adjustingPosition;
}

function setGUITextureIO(bool:boolean){
	//reticalTexture.SetActive(bool);
}
function EnterLockedMode(pos : Vector3){
	transform.parent = null;
	reticalIsLockedToWorld= true;
}
function EnterFollowMode(){
	reticalIsLockedToWorld= false;
	transform.parent = player.transform;
}
function MousePos(vec : Vector3){
	transform.position = vec;
	
}
function setReticalLockedAtPoint(pos:Vector3){
	if(gameObject.active){
		if(!reticalIsLockedToWorld){
			EnterLockedMode(pos);
		}
		transform.position = pos;
	}
}
function setReticalPosition(){

}
function getReticalIsLocked(){
	return reticalIsLockedToWorld;
}

function adjustPosition(bool : boolean, vector : Vector3){
	//print("Adjusting recieved" + vector);
	if(reticalIsLockedToWorld){
		EnterFollowMode();
	}
	adjustingPosition = true;
	Adjustment = vector;
}