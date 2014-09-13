#pragma strict
private var player : GameObject;
private var movement : PlayerMovement;
private var cam : Camera;
private var camScript : CameraFollowBetter;
private var zoomBeforeEnter : int = -1;


 
var lookTowards : boolean;
var lookLocation : Vector2;
var lookWeight : float;
var followX:boolean;
var followY:boolean;
var shiftCamera : boolean;
var shiftAmount : Vector2;
var Isozone : boolean;
var ZoomLevel:int;

function Start () {
	player = GameObject.Find("Player");
	movement = player.GetComponent("PlayerMovement");
	cam    = GameObject.FindObjectOfType(Camera);
	camScript = cam.GetComponent("CameraFollowBetter");
}

function Update () {

}
function OnTriggerStay(other:Collider){
	if(other.gameObject.name.Equals("Player")){
		camScript.setCameraZoneScript(this);
		if(camScript.getZoomBeforeEnter() == -1){
			camScript.setZoomBeforeEnter(camScript.getDesiredZoom());
		}
		if(followX||followY){
			camScript.setFollowTrack(followX,followY,transform.position.x,transform.position.y);
		}
			camScript.setDesiredZoom(ZoomLevel);
		if(lookTowards){
			camScript.setCameraLocked(true, transform.position + lookLocation,lookWeight);
		}	
		if(shiftCamera){
			camScript.setShiftAmount(shiftCamera, shiftAmount);
		}
		
			camScript.set3DLook(Isozone);
		
	}
}

//make it so one camera has control at a time, and can be checked if you are it.
function OnTriggerExit(other:Collider){
	if(other.gameObject.name.Equals("Player") && camScript.getInCamerasZone()==this){
		camScript.setFollowPlayer(true);
		if(camScript.getZoomBeforeEnter() != -1){
			camScript.setDesiredZoom(camScript.getZoomBeforeEnter());
			camScript.setZoomBeforeEnter(-1);
		}if(shiftCamera){
			camScript.setShiftAmount(false,Vector2.zero);
		}
	}

}