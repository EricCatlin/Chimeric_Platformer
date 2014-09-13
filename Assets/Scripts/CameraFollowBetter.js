#pragma strict


private var target : Transform;
var distance : float = -100;
var smooth : boolean = true;
//private var DesiredZoom  : int = 5;
private var startZoom : float;
var startZoomed : boolean;
var smoothingFactorLowerIsMore : float;
private var DesiredZoom: int;
private var player : GameObject;
private var movement : PlayerMovement;
private var FollowPlayer : boolean;
private var followX : boolean;
private var followY : boolean;
private var zoomBeforeEnter : int = -1;
private var cameraLocked : boolean;
private var camLockCenter : Vector2;
private var inCamerasZone: PBCameraZone;
var shiftCamera : boolean;
var shiftAmount : Vector2;
private var cameraPoints: Vector3[] = new Vector3[5];
private var retical : GameObject;
private var followingCameraPoints : boolean;
var startingZoomLevel : int = 10;
private var lookWeight : float = 0.5;
private var lookPos : Vector3;
private var isFolowing3D : boolean = false;



function followRetical(weightOnRetical : float){
		transform.position = Vector3.Lerp((( retical.transform.position-player.transform.position ) * weightOnRetical  ) + player.transform.position, transform.position,.92);
		
}
function set3DLook(bool : boolean ){
	isFolowing3D = bool;

}

//mutlipel points all certain distances from playerer Vector3.distances, camera focuses on midpoint of each Never allowing playerer out of frame 


function lookTowards(pos:Vector3,weight:float){
		transform.position = Vector3.Lerp(((pos-player.transform.position) * weight) + player.transform.position, transform.position,.92);

}


function Start () {

	player = GameObject.Find("Player");
	target = player.transform;
	movement = player.GetComponent(PlayerMovement);
	retical = movement.GetRetical();
	PlayerPrefs.SetInt("DesiredZoom",startingZoomLevel);
	DesiredZoom  = PlayerPrefs.GetInt("DesiredZoom",6);
	FollowPlayer = true;
	if(PlayerPrefs.GetInt("CameraIsOrthographic",1)==1){
		//camera.orthographic = true;
	}else{
		//camera.orthographic = false;
	}
	if(camera.isOrthoGraphic){
		startZoom = 30*DesiredZoom;
	}else{
		startZoom = 3*DesiredZoom;
	}
	transform.position = target.transform.position;
	
	if(camera.isOrthoGraphic){
		if(startZoomed){
			camera.orthographicSize = startZoom;
			transform.position.z = 0;
		}	
	}else{
		if(startZoomed){
			transform.position.z = 0;
		}
	}
}

function Update () {


	if(movement.getIsInGameMode()){
	
	if(camera.isOrthoGraphic){
	if(Mathf.Abs(DesiredZoom - camera.orthographicSize) > 10 ){
		camera.orthographicSize -= (camera.orthographicSize - (DesiredZoom*10))*Time.deltaTime;
	}
	}

	if(FollowPlayer){
	if(target){
		if(smooth){
			transform.position.x = transform.position.x  - smoothingFactorLowerIsMore*(transform.position.x - target.transform.position.x)*Time.deltaTime;
			transform.position.y =  transform.position.y  - smoothingFactorLowerIsMore*(transform.position.y - target.transform.position.y-1*DesiredZoom)*Time.deltaTime;
		}else{
			transform.position = target.transform.position;
		}
	}
	}else if(followX||followY){
		if(smooth){
			if(followX){
				transform.position.x =  transform.position.x  - smoothingFactorLowerIsMore*(transform.position.x - target.transform.position.x)*Time.deltaTime;
				transform.position.y =  transform.position.y  - smoothingFactorLowerIsMore*(transform.position.y - camLockCenter.y )*Time.deltaTime;	
			}else if(followY){
				transform.position.x =  transform.position.x  - smoothingFactorLowerIsMore*(transform.position.x-camLockCenter.x)*Time.deltaTime;
				transform.position.y =  transform.position.y  - smoothingFactorLowerIsMore*(transform.position.y - target.transform.position.y)*Time.deltaTime;	
			}
		}else{
			if(followX){
				transform.position.x = target.transform.position.x;
			}
			if(followY){
				transform.position.y = target.transform.position.y;
			}
		}
	}else if(cameraLocked){
		lookTowards(camLockCenter,lookWeight);
		

	}
	if(shiftCamera){
		transform.position.x += shiftAmount.x*Time.deltaTime;
		transform.position.y +=  shiftAmount.y*Time.deltaTime;;
	}
	

	}else if(movement.getIsInAimMode()){
		if(DesiredZoom *10 != camera.orthographicSize){
			camera.orthographicSize -= (camera.orthographicSize - DesiredZoom*10);
		}
			followRetical(0.6);
	}
	transform.position.z = -300;
	if(isFolowing3D){
		aimAtPlayer();
	}else{
		if(transform.rotation.eulerAngles.magnitude > 1){
			transform.rotation = Quaternion.Lerp(transform.rotation,Quaternion.EulerAngles(Vector3(0,0,0)),.05);
		}else {
			transform.rotation=Quaternion.EulerAngles(Vector3(0,0,0));
		}
	}

}

function aimAtPlayer(){
	var playerYPos : Vector3 = player.transform.position;
    transform.LookAt(playerYPos);
}
function setZoomBeforeEnter(zoom : int){
	zoomBeforeEnter = zoom;
}
function getZoomBeforeEnter(){
	return zoomBeforeEnter;
}
function setZoomToZoomBeforeEnter(){
	DesiredZoom = zoomBeforeEnter;
}

function setShiftAmount(shift : boolean, amount : Vector2){
	shiftCamera = shift;
	shiftAmount = amount;
}
function setCameraZoneScript(camZone:PBCameraZone){
	inCamerasZone = camZone;
}
function getInCamerasZone(){
return inCamerasZone;
}
function getDesiredZoom(){
	return DesiredZoom;
}
function setDesiredZoom(val : int){
	DesiredZoom = val;
}
function setFollowPlayer(bool:boolean){
	FollowPlayer = bool;
	if(FollowPlayer){
		followX = false;
		followY = false;
		cameraLocked = false;
	}

}
function setFollowTrack(X:boolean,Y: boolean, Xmid:float, Ymid:float){
	followX = X;
	followY = Y;
	camLockCenter = Vector2(Xmid,Ymid);
	if(X||Y){
		FollowPlayer = false;
		cameraLocked = false;
	}
}
function setCameraLocked(bool : boolean,pos :Vector2, weight:float){
	cameraLocked = bool;
	camLockCenter = pos;
	lookWeight = weight;
	if(cameraLocked){
		FollowPlayer = false;
		followX = false;
		followY = false;
	
	}
}

