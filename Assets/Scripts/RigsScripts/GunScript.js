#pragma strict

private var player : GameObject;
private var cameraa : Camera;
private var mousePos : Vector3;
private var targetWorldPoint : Vector3;
private var muzzleTransform : Transform;
var bulletPrefab : Transform;
var shotSpeed : float;
private var nextShotTime : float = 0.0;
var timeBetweenShots : float = 1.0;
private var isShooting : boolean;
private var soundSource : AudioSource;
var FireSound : AudioClip;
private var currSpeed : Vector3;
private var currRotation : Quaternion;
private var AimDirection : Vector3;
private var hit : RaycastHit;
private var marker : GameObject;
private var isDrawingLine : boolean = false;
private var lineDuration: float;
var line : LineRenderer;
private var lineStart: Vector3;
var markerObject : GameObject;
private var isShooting2 : boolean;
private var holdShoot2 : float;
private var markerUnlocked : boolean = false;
private var movement : PlayerMovement;
private var retical : GameObject;
private var aimingArea : AimArea;
private var touchAimingPosition : Vector3;
private var isPaused : boolean;
private var readyToShoot2 : boolean;



function Start () {

//retical = GameObject.Find("TargetingRetical");
	if(PlayerPrefs.GetInt("TrackingDartUnlocked",0)==1){
		markerUnlocked = true;
	}
	aimingArea = GameObject.Find("AimArea").GetComponent("AimArea");
	soundSource = gameObject.AddComponent(AudioSource);
	soundSource.rolloffMode = AudioRolloffMode.Linear;
	cameraa = Component.FindObjectOfType(Camera);
	muzzleTransform = transform.Find("Barrel/Muzzle");
	player = GameObject.Find("Player");
	line.SetVertexCount(2);
	movement = player.GetComponent("PlayerMovement");
	retical = movement.GetRetical();

}

function aim(){

   if(!movement.GetReticalActive()){
    		movement.SetReticalActive(true);
    	}
    	AimDirection = movement.getAimSpot()-transform.position;
		AimDirection.z = 0;  

    if(AimDirection.Equals(Vector3(0,0,0))){
    }else{
    	transform.rotation = Quaternion.LookRotation(AimDirection);
	}
    
}
function GetState(){
	if(movement){
	isPaused = movement.getGameIsPaused();
	}
	//YOU ARE TRYING TO FIND WHY MACHING GUN THROWS ERROR when equipped and Also setting up Echo's for when a kit is equipped. 
	//It must be Selected in Menu- Then Equipped For AimingMode - then Usable by GameMode - Then If it has background Application it Must have a Resting State!(HookShot,Wings)
}

function Update () {
	if(!readyToShoot2 && !movement.getIsFire2ing()){
		readyToShoot2 = true;
		holdShoot2 = 0;
	}
	
	currRotation = transform.rotation;
	//currSpeed = player.rigidbody.velocity;
	getInputs();
	aim();	
	if(isShooting && nextShotTime <= Time.time){
		Shoot();
	}		
	if(isShooting2){
		Shoot2();
		isShooting2 = false;
	}
	if(holdShoot2 != 0 ){
		if(holdShoot2 + 1 < Time.time ){
			if(GameObject.Find("markerObject(Clone)")){
				Destroy(GameObject.Find("markerObject(Clone)"));
			}
		holdShoot2 = 0;
		}
	}
	if(marker){
	if(isDrawingLine){
		if(lineDuration +0.5 < Time.time){
			isDrawingLine = false;
			line.enabled=false;
		}else{
			line.SetPosition(0,lineStart);
			line.SetPosition(1,marker.transform.position);
			line.SetWidth(1,lineDuration+0.5 - Time.time);
			line.enabled=true;
		}
	}
	}
}

function getInputs(){

	

	if(movement.getIsFire1ing() ){
		isShooting = true;
		
	}else{
		isShooting = false;
	}
	//if(Input.GetButtonDown("Fire2")){
	if(movement.getIsFire2ing()){
		if(markerUnlocked && readyToShoot2){
			isShooting2 = true;
			readyToShoot2 = false;
			holdShoot2 = Time.time;
		}
	}
}
function Shoot(){
	nextShotTime = Time.time + timeBetweenShots;
    var bullet = Instantiate(bulletPrefab, muzzleTransform.position, Quaternion.identity);
    bullet.rigidbody.AddForce(transform.forward * shotSpeed);
   // bullet.rigidbody.AddForce(player.rigidbody.velocity*0.5,ForceMode.Impulse);
    soundSource.PlayOneShot(FireSound);
   
   	
}
function Shoot2(){
	var layerMask = 1 << 8;
	layerMask = ~layerMask;
	var spot : Vector3;
	var norm : Vector3;
	if(Physics.Raycast(muzzleTransform.position,transform.forward,hit,400,layerMask)){
			spot= hit.collider.ClosestPointOnBounds(hit.point);
			norm = hit.normal;
			spot+=norm;
			spot.z=0;
			
			if(GameObject.Find("markerObject(Clone)")){
				Destroy(GameObject.Find("markerObject(Clone)"));
			}

			marker = Instantiate(markerObject,spot,Quaternion.LookRotation(norm));
			marker.transform.parent = hit.collider.gameObject.transform;
			isDrawingLine = true;
			lineStart = muzzleTransform.position;
			lineDuration = Time.time;
		}
}




