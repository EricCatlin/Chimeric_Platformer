#pragma strict

private var playerController : Rigidbody;
private var movement : PlayerMovement;

private var cameraa : Camera;
private var mousePos : Vector3;
private var targetWorldPoint : Vector3;
private var muzzleTransform : Transform;
var Portal1 : GameObject;
var Portal2 : GameObject;
//var shotSpeed : float;
private var nextShotTime : float = 0.0;
//var timeBetweenShots : float = 1.0;
private var timeAtLastMouseMove : float ;
private var isShooting : boolean;
private var isAimingMouse : boolean;
private var isAimingStick : boolean;
private var timeAtLastManualAim : float;
private var soundSource : AudioSource;
var FireSound : AudioClip;
private var currSpeed : Vector3;
private var currRotation : Quaternion;
private var AimDirection : Vector3;
private var Portal1A : Array = new Array(1);
private var Portal2A : Array = new Array(1);
private var hit : RaycastHit;
 var line : LineRenderer;
 var line2 : LineRenderer;
 private var shoot1Ready : boolean = true;
 private var shoot2Ready : boolean = true;

private var spot : Vector3;
private var norm : Vector3;
private var isDrawingLine1 : boolean;
private var lineStart1 : Vector3;
private var lineStart2 : Vector3;
private var isDrawingLine2 : boolean;
private var Port1 : GameObject;
private var Port2 : GameObject;
private var retical : GameObject;




//private var retical : GameObject;




private var durationOfLine1: float = 0.5;
private var durationOfLine2: float = 0.5;









function Start () {
	//retical = GameObject.Find("TargetingRetical");


	movement = GameObject.Find("Player").GetComponent("PlayerMovement");
	soundSource = gameObject.AddComponent(AudioSource);
	soundSource.rolloffMode = AudioRolloffMode.Linear;
	cameraa = GameObject.Find("Camera Rig").GetComponent("Camera");
	muzzleTransform = transform.Find("Muzzle");
	//line = GetComponent(LineRenderer);
	line.SetVertexCount(2);
	retical = movement.GetRetical();
}
function aim(){
	
  
     if(!movement.GetReticalActive()){
    		movement.SetReticalActive(true);
    	}
    	AimDirection = movement.getAimSpot()-transform.position;
			AimDirection.z = 0;  

    if(AimDirection.Equals(Vector3.zero)){
    }else{
    	transform.rotation = Quaternion.LookRotation(AimDirection);
	}

}
function Update () {
	if(!shoot1Ready && !movement.getIsFire1ing()){
		shoot1Ready = true;
	}
	if(!shoot2Ready && !movement.getIsFire2ing()){
		shoot2Ready = true;
	}

	currRotation = transform.rotation;
	currSpeed = movement.rigidbody.velocity;
	getInputs();
	aim();	
	if(isShooting){
		Shoot();
		isShooting = false;
	}		
	if(isDrawingLine1){
		if(durationOfLine1+0.5 < Time.time){
			isDrawingLine1 = false;
			line.enabled=false;
		}else{
			line.SetColors(Color.red,Color.yellow);
			line.SetPosition(0,lineStart1);
			line.SetPosition(1,Port1.transform.position);
			line.SetWidth(0.2,durationOfLine1+0.5 - Time.time);

			line.enabled=true;
		}
	}
	if(isDrawingLine2){
		if(durationOfLine2+0.5 < Time.time){
			isDrawingLine2 = false;
			line2.enabled=false;
		}else{
			line2.SetColors(Color.blue,Color.green);
			line2.SetPosition(0,lineStart2);
			line2.SetPosition(1,Port2.transform.position);
			line2.SetWidth(0.2,durationOfLine2+0.5 - Time.time);

			line2.enabled=true;
		}

	}
}

function getInputs(){
	mousePos = Input.mousePosition;

	//moving mouse
	if((Mathf.Abs(Input.GetAxisRaw("Mouse X"))>0.1||Mathf.Abs(Input.GetAxis("Mouse Y"))>0.1)){
		timeAtLastMouseMove  = Time.time;
		////print("Moving");
		isAimingMouse = true;
	}
	/////or joystick
	////print(Input.GetAxis("AimingJoystickVertical") + "  "  +Input.GetAxis("AimingJoystickHorizontal")   );

	if(Mathf.Abs(Input.GetAxis("AimingJoystickHorizontal")) > .1||Mathf.Abs(Input.GetAxis("AimingJoystickVertical")) > .1){
		isAimingStick = true;
		timeAtLastManualAim = Time.time;
	}
	

	
	if(isAimingMouse && (Time.time - timeAtLastMouseMove) > 5){
		////print("LostAimManual");
		isAimingMouse = false;
	}else if(isAimingStick && (Time.time - timeAtLastManualAim) > 15){
		//isAimingStick = false;
	}
	//shooting
	//if(Input.GetButtonDown("Fire1") || Input.GetButtonDown("Fire2")){
	if(movement.getIsFire1ing() && shoot1Ready || movement.getIsFire2ing()&&shoot2Ready){
		isShooting = true;
		
	}else{
		isShooting = false;
	}

}
function Shoot(){
	//nextShotTime = Time.time + timeBetweenShots;
	var layerMask = 1 << 8;
	layerMask = ~layerMask;
	if(Physics.Raycast(muzzleTransform.position,transform.forward,hit,400,layerMask) && !hit.collider.tag.Equals("1DMG")){
			 soundSource.PlayOneShot(FireSound);

			spot= hit.collider.ClosestPointOnBounds(hit.point);
			norm = hit.normal;
			spot+=norm;
			spot.z=0;
		//if(Input.GetButtonDown("Fire1")){
		if( movement.getIsFire1ing()){
			//movement.setIsFire1ing(false);
			Destroy(GameObject.Find("Portal1(Clone)"));
			Port1 = Instantiate(Portal1,spot,Quaternion.LookRotation(norm));
			shoot1Ready = false;
				Port1.transform.parent = hit.collider.transform; 
			
			movement.Portal1Normal = norm;
			isDrawingLine1 = true;
			lineStart1 = muzzleTransform.position;
			durationOfLine1 = Time.time;
		}else if(movement.getIsFire2ing()){
			//movement.setIsFire2ing(false);
			Destroy(GameObject.Find("Portal2(Clone)"));
			Port2 = Instantiate(Portal2,spot,Quaternion.LookRotation(norm));
			shoot2Ready = false;
				Port2.transform.parent = hit.collider.transform; 
			
			movement.Portal2Normal = norm;
			isDrawingLine2 = true;
			lineStart2 = muzzleTransform.position;
			durationOfLine2 = Time.time;
		}
    }  
   
}







