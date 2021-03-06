#pragma strict

public var walkSpeed     : float = 35.0;
public var runSpeed      : float = 35.0;
public var accel         : float = 1;
public var walkJump      : float = 35;
public var runJump       : float = 35;
public var gravity       : float = 65.0;
public var lethalSpeed   : float = 75;
public var pushPower     : float = 3;
public var score = 0;

var PortalRig : GameObject;
var GunRig : GameObject;
var CheckPointRig : GameObject;
var HookShotRig : GameObject;
var RunSoundSource : AudioSource;
var JumpSoundSource : AudioSource;
var jumpClip : AudioClip;
var wallJumpClip : AudioClip;
var collideSoundClip : AudioClip;
var runClip : AudioClip;
var FailSound : AudioClip;
var deathAnim : Transform;
var WinSound : AudioClip;
var teleportingSound : AudioClip;
var WingFlap : AudioClip;
var retical : GameObject;
var PCDebugging : boolean = true;
var line_material :Material;

public var isPressingLeft : boolean;
public var isPressingRight : boolean;
public var isPressingDown : boolean;
public var isPressingUp : boolean;
public var isFire1ing : boolean;
public var isFire2ing : boolean;
public var aimSpot : Vector3;
public var gameControls : GameObject;
public var isInAimMode : boolean;
public var isInMenuMode : boolean;
public var isInGameMode :boolean;

public var floor_ray : RaycastHit = new RaycastHit() ;

public var left_ray : RaycastHit = new RaycastHit() ;
public var right_ray : RaycastHit = new RaycastHit() ;
public var	staticFrame : Vector3;

//Portals
public var isTeleportingTo1 : boolean;
public var isTeleportingTo2 : boolean;
public var Portal1Normal : Vector3;
public var Portal2Normal: Vector3;
public var teleportedVelocity : Vector3;
public var applyingTeleportVelocity : boolean;
public var isTeleporting : boolean = false;
public var timeAtTeleport : float = 0;

//checkpoints
public var hasCheckpoint : boolean;
public var checkPointLocation : Vector3;
public var checkPointScript : CheckPointSetter;
public var startingCheckPointFlag : boolean;
public var checkPointTimer : float=0;

//HookShot
public var hookShotIsStuck: boolean;
public var hookShotLocation: Vector3;
public var hookShotLength: float;
public var isHanging : boolean;
public var tipScript : HookShotTipScript;
public var hook : HookShotScript;
public var dust : ParticleSystem;

public var WingsEquipped : boolean;
public var wingHops : int;
//public var Wings : WingScript;
 var wings : GameObject;
 var LeftWing : GameObject;
 var RightWing : GameObject;

public var timeAtKillPlayer : float;

public var currSpeed : Vector3;
public var moveDirection : Vector3 = Vector3.zero;
public var isStillJumping: boolean;
public var isJumping : boolean;
public var letGoOfJump : boolean;
public var isRunning : boolean;
public var isAirborn : boolean;
public var isOnLeftWall : boolean = false;
public var isOnRightWall : boolean = false;
public var isWallJumping : boolean = false;
public var jumpingTime : float;
public var lastTimeOnWall : float;
public var timeTouchingSomething : float;
public var timeTouchingTheFloor : float;
public var isTouchingFloor  :boolean;
public var isTouchingSomething : boolean;
public var collisionPoints :Array = new Array();
public var speedMax: float = 0;
public var jumpMax :float = walkJump;
public var horizontalInput : float;
public var verticalInput : float;
public var totalSpeed: float;
//public var movementJoy : MovementJoystick;


//MenuSystem
public var showMenu : boolean = false;
public var showWeaponMenu : boolean = false;
public var endOfLevelText : String ="";
public var isQuickSelecting : boolean;
public var pauseVelocity : Vector3;
public var isExitingPause  : int = 0;
public var gameIsPaused : boolean = false;
public var showGUI : boolean = false;
public var menuContextDebug :boolean = false;
public var menuContextRigSelect : boolean = false;
public var menuContextLevelOptions : boolean = false;
public var menuContextGameOptions : boolean = false;

public var showTimer : boolean = false;
public var showEnd : boolean = false;
public var dead : boolean = false;
public var finnished : boolean = false;
public var time : float;
public var timeAtStart : float;
public var tryingToLetGoOfJump : boolean;


public var invuln : int = 0;
//BodyComponents
public var controller : Rigidbody;
public var GUIController : ControllerUI;
public var score_display : GUIText;
public var trail : TrailRenderer;
public var body : Transform;
public var bodyLight : Light;
public var body_main_color = Color.Lerp(Color.green,Color.black,0.9);
public var body_active_color = Color.green;

//
public var speedArray : float[] = new float[4];
public var vectorArray: Vector3[] = new Vector3[4];
public var speedCounter:int = 1;

public var rigid : Rigidbody;
public var soundLoopTime : float = 0;
public var messageRect : Rect;
public var  endOfLevelBox : Rect ;



function Start(){
	if (Application.platform == RuntimePlatform.Android)
        PCDebugging=false;
    else
    	PCDebugging = true;
	print(Application.loadedLevelName);
	dust = GameObject.Find("Dust").GetComponent(ParticleSystem);
	messageRect	= Rect(Screen.width/2-200,0,400,200);
	hook = HookShotRig.GetComponent("HookShotScript");
	Time.timeScale=1;
	GUIController = GameObject.Find("Level Essentials").GetComponent("ControllerUI");
	score_display = GameObject.Find("Level Essentials").GetComponent("GUIText");
	timeAtStart = Time.time;
	controller = GetComponent(Rigidbody);
	trail = GameObject.Find("Trail").GetComponent(TrailRenderer);
	rigid = GetComponent(Rigidbody);
	body = GameObject.Find("PlayerBody").transform;
	bodyLight = body.GetComponent(Light);
	gameControls  = GameObject.Find("Level Essentials");
	GUIController.setNoFireNoAim();
	CheckPointRig.SetActive(true);
	checkPointScript = CheckPointRig.GetComponent("CheckPointSetter");
	startingCheckPointFlag = true;
	endOfLevelBox = Rect(0,Screen.height - Screen.height*.33,Screen.width,Screen.height*.33);
	EnterGameMode();
}
function FixedUpdate() {
	if(invuln>0)invuln--;
	body.renderer.material.color = Color.Lerp(body_main_color,body.renderer.material.color,0.92f);
	score_display.text = "SCORE: "+score;
	checkForFlags(); // flags are one time use conditions to be run before the update so sayeth me
	if(!gameIsPaused){
	transform.position.z=0;
	currSpeed = controller.velocity;  //1:Get Velocity going into this frame
	populateSpeedArray();
	getInputs();//3:Get what the user is trying to do this frame
	whatAmITouching();
	applyGravity();
	DoAnimation();

	handleHorizontal(); //4:Apply LeftRight Movements
	handleJumps();//5: Apply Up down movements
	if(!dead){
   	 	if((isTeleportingTo1 || isTeleportingTo2) && applyingTeleportVelocity){
   	 		applyingTeleportVelocity = false;
   	 		currSpeed = teleportedVelocity;
   		 	moveDirection = teleportedVelocity;
			isTeleporting = true;
   	 	}
   	 	if(isTeleporting){
   	 		if(hookShotIsStuck){
   	 			LetGoHookShot();
				hook.letGo();
			}
   	 		trail.time = 0;
   	 		JumpSoundSource.PlayOneShot(teleportingSound);
   	 		isTeleporting = false;
   	 		isTouchingFloor = false;
   	 		isAirborn = true;
   		}else{
			currSpeed.z=0;
   	 		moveDirection = currSpeed;
		}
		if(isHanging){ 
			moveDirection = HangMovementTransformation(moveDirection);
		}
		if(isExitingPause>0){
			moveDirection = pauseVelocity;
			isExitingPause--;
		}
		moveDirection = transform.TransformDirection( moveDirection );
   	 	controller.rigidbody.velocity =(moveDirection);
    }
    
    }
    staticFrame = Vector3.zero;
}
function DoAnimation(){
	if(WingsEquipped){
  	  doWingAnimation();
  	  LeftWing.transform.localScale.x = ((wingHops+1)/7.0);
      RightWing.transform.localScale.x = ((wingHops+1)/7.0);
    }
    if(isAirborn){
            body.rotation.eulerAngles.z = 0;
    }else if(isTouchingFloor){
        body.rotation.eulerAngles.z = 0;
    }else if(isOnLeftWall){
    	if(isOnRightWall){
    	 	body.rotation.eulerAngles.z = 0;
    	}else{
    	 	body.rotation.eulerAngles.z = -left_ray.normal.x*60- (rigid.velocity.y/jumpMax * 30);
    	}
    }else if(isOnRightWall){
    	body.rotation.eulerAngles.z = -right_ray.normal.x*60+ (rigid.velocity.y/jumpMax * 30);;
    }
    if(isTouchingFloor && Mathf.Abs(currSpeed.x-staticFrame.x) > 0.3 ){
	    var line = new GameObject();
		var rend :  LineRenderer = 	line.AddComponent(LineRenderer);
		rend.material = line_material;
		rend.SetVertexCount(2);
		rend.SetWidth(0.1,0.1);
		rend.SetPosition(0, transform.position);
		rend.SetColors(Color.green,Color.clear);
		rend.SetPosition(1, transform.position -transform.up*2 -rigidbody.velocity.normalized);
		Destroy(line.gameObject,.4);
	}
}

function doWingAnimation(){
	if(isStillJumping){
		LeftWing.transform.rotation = Quaternion.RotateTowards(LeftWing.transform.rotation, Quaternion.EulerAngles(0,0,90),5*wingHops+5);
		RightWing.transform.rotation = Quaternion.RotateTowards(RightWing.transform.rotation, Quaternion.EulerAngles(0,0,-90),5*wingHops+5);
		}else{
		LeftWing.transform.rotation = Quaternion.RotateTowards(LeftWing.transform.rotation, Quaternion.EulerAngles(0,0,45),10);
		RightWing.transform.rotation = Quaternion.RotateTowards(RightWing.transform.rotation, Quaternion.EulerAngles(0,0,-45),10);
		}
		
}




function handleJumps(){
	
	jumpMax = walkJump+ (System.Math.Abs(currSpeed.x)+1)*0.4 ;

	if(isJumping){
	
	if ( isTouchingFloor || isOnLeftWall || isOnRightWall) {
		jumpingTime=Time.time;

    	isStillJumping = true;
		currSpeed += body.transform.up*jumpMax;
       	JumpSoundSource.PlayOneShot(jumpClip);
       	dust.emissionRate=getHighestSpeed()*2;
    	dust.Play();
		body.renderer.material.color = body_active_color;

    }else if(isAirborn && WingsEquipped &&isJumping &&  Time.time - timeTouchingSomething > 0.1 ){
    	if(  wingHops > 0 ){
    		currSpeed.y += ((jumpMax/7) * (wingHops)) + Mathf.Abs(currSpeed.x)/10;
    		wingHops--;
			JumpSoundSource.PlayOneShot(WingFlap);
		}
    	isStillJumping = true;
    }
    }
   	if(letGoOfJump  && !(isOnLeftWall||isOnRightWall)&&(Time.time - jumpingTime > .2)){
   		letGoOfJump = false;
   		isStillJumping = false;

    	if(currSpeed.y > 5){
   			currSpeed.y -= Mathf.Min(currSpeed.y/2, jumpMax/2);
   		}
   	}
   	isJumping = false;
   	if(isStillJumping)		body.renderer.material.color = body_active_color;

}


function handleHorizontal(){
if(Time.time - jumpingTime > .2){
	var initialSpeed : Vector3 = currSpeed;
	if (isRunning){
    	speedMax = runSpeed + staticFrame.x;
    }else{
   		speedMax = walkSpeed + staticFrame.x;
    }
	if(!isAirborn){
		if(Mathf.Abs(horizontalInput)  > 0.1){
			//Touching something and adding input
			if(isTouchingFloor){
			if( horizontalInput < 0 && currSpeed.x >staticFrame.x){
					currSpeed +=  Vector3.Cross(floor_ray.normal,Vector3.forward)*horizontalInput * accel*5;
					dust.emissionRate=getHighestSpeed()*10;
    				dust.Play();
			}else if(horizontalInput > 0 && currSpeed.x <staticFrame.x ){
					currSpeed +=  Vector3.Cross(floor_ray.normal,Vector3.forward)*horizontalInput * accel*5;
					dust.emissionRate=getHighestSpeed()*10;
    		dust.Play();
			}else if((currSpeed - staticFrame).magnitude <= speedMax){
				currSpeed += Vector3.Cross(floor_ray.normal,Vector3.forward)*horizontalInput * accel;
			}
			}else{
				if( horizontalInput < 0 && currSpeed.x >staticFrame.x){
					currSpeed +=  Vector3.Cross(floor_ray.normal,Vector3.forward)*horizontalInput * accel*5;
					dust.emissionRate=getHighestSpeed()*10;
    				dust.Play();
			}else if(horizontalInput > 0 && currSpeed.x <staticFrame.x ){
					currSpeed +=  Vector3.Cross(floor_ray.normal,Vector3.forward)*horizontalInput * accel*5;
					dust.emissionRate=getHighestSpeed()*10;
    		dust.Play();
			}else if((currSpeed - staticFrame).magnitude <= speedMax){
				currSpeed += Vector3.Cross(floor_ray.normal,Vector3.forward)*horizontalInput * accel;
			}
			}
		
		}else{ //Stopping from no input
		 if(currSpeed.x-staticFrame.x >2){
   			currSpeed.x -= (currSpeed.x-staticFrame.x) * 0.5;
   		}else if(currSpeed.x-staticFrame.x <-2){
   			currSpeed.x -= (currSpeed.x-staticFrame.x) * 0.5;
   		}else{
    		currSpeed.x = staticFrame.x;
   		}
   		}
	}else {
		
		if(Mathf.Abs(horizontalInput)  > 0.1){
			if(currSpeed.x > 0 && horizontalInput < 0 ){
				currSpeed.x += horizontalInput * accel*1.3;
			}else if(currSpeed.x < 0 && horizontalInput > 0){
				currSpeed.x += horizontalInput * accel*1.3;
			}else if(isStillJumping && Mathf.Abs(currSpeed.x) < speedMax/2 +.1*-currSpeed.y){
				currSpeed.x += horizontalInput*accel/2;
			}else if(Mathf.Abs(currSpeed.x) < speedMax/2){
				currSpeed.x += horizontalInput*accel/2;
   			}
   		}
   		
   	}
   	}
   	if(isTouchingFloor){
    	if(Time.time - soundLoopTime > 6/Mathf.Abs(currSpeed.x)){
    		RunSoundSource.PlayOneShot(runClip);
    		soundLoopTime = Time.time;
    		dust.emissionRate=getHighestSpeed()/2;

    		dust.Play();
    	}
   	}else{
   	}
		
		trail.time = (trail.time + Mathf.Max(getHighestSpeed()/200,.5))/5;
		trail.transform.position = transform.position + transform.up*0.5 + Random.insideUnitSphere*trail.time;
	//bodyLight.intensity=getHighestSpeed()/55;

	trail.renderer.material.color = Color.Lerp(Color.black,Color.green,getHighestSpeed()/75);

}

function getInputs(){

	//isGrounded = controller.isGrounded;
	//////////////////////print(isGrounded);
	horizontalInput = Input.GetAxis("Horizontal");
	if(horizontalInput < -0.1){
		isPressingLeft = true;
	}else if(horizontalInput>0.1){
		isPressingRight = true;
	}
	if(isPressingLeft){
		horizontalInput = -1;
	}else if(isPressingRight){
		horizontalInput = 1;
	}
	//horizontalInput = movementJoy.position.x;
	verticalInput = Input.GetAxis("Vertical");
	if(isPressingDown){
		verticalInput = -1;
	}else if(isPressingUp){
		verticalInput = 1;
	}
	//verticalInput = movementJoy.position.y;
	if (Input.GetButton("Run")){
		isRunning = true;
	}else{
		isRunning = false;
	}
	if(verticalInput >0.1){
		isPressingUp=true;
	}else{
		isPressingUp=false;
	}
	if(verticalInput <-0.1){
		isPressingDown = true;
	}else{
		isPressingDown=false;
	}

	if(Input.GetKeyDown(KeyCode.Alpha1)){
		if(PlayerPrefs.GetInt("CheckPointRigUnlocked",0)==1){
			setRig("CheckPointRig");
				ActivateRig();

		}
	}
	if(Input.GetKeyDown(KeyCode.Alpha2)){
		if(PlayerPrefs.GetInt("GunRigUnlocked",0)==1){
			setRig("GunRig");
				ActivateRig();

		}
	}
	if(Input.GetKeyDown(KeyCode.Alpha3)){
		if(PlayerPrefs.GetInt("PortalRigUnlocked",0)==1){
			setRig("PortalRig");
				ActivateRig();

		}
	}
	if(Input.GetKeyDown(KeyCode.Alpha4)){
		if(PlayerPrefs.GetInt("HookShotRigUnlocked",0)==1){
			setRig("HookShotRig");
				ActivateRig();

		}
	}
	if(Input.GetKeyDown(KeyCode.Alpha5)){
		if(PlayerPrefs.GetInt("WingRigUnlocked",0)==1){
			setRig("WingRig");
				ActivateRig();

		}
	}
if(hookShotIsStuck){
		if(Vector3.Distance(transform.position,hookShotLocation)>=hookShotLength){
			isHanging = true;
		}else{
			isHanging = false;
		}
	}else{
		isHanging = false;
	}
}

function whatAmITouching(){
	
	
 	Debug.DrawLine(transform.position-transform.up*.75,transform.position-transform.up*.75+transform.right*.55,Color.green,2);
 	if(Physics.Linecast(transform.position-transform.up*.75,transform.position-transform.up*.75+transform.right*.55,right_ray)){
 		isOnRightWall=true;
 		//print("Right ray: "+right_ray.normal);
 	}else{
 	isOnRightWall = false;
 	}
 	Debug.DrawLine(transform.position-transform.up*.75,transform.position-transform.up*.75-transform.right*.55,Color.red,2);
 	if(Physics.Linecast(transform.position-transform.up*.75,transform.position-transform.up*.75-transform.right*.55,left_ray)){
 	isOnLeftWall=true;
 	 	 	 		//print("Left ray: "+left_ray.normal);

 	}else{
 	 	isOnLeftWall=false;

 	}
 	Debug.DrawLine(transform.position,transform.position-transform.up*1.1,Color.blue,2);
 	if(Physics.Linecast(transform.position,transform.position-transform.up*1.5,floor_ray)){
 		isTouchingFloor=true;

 		 
wingHops = 5;
 	}else{
 	 		isTouchingFloor=false;

 	}
 	 isAirborn=(!isTouchingFloor && !isOnLeftWall && !isOnRightWall);

 	
}
function OnCollisionEnter(hit: Collision){
	if(isAirborn){
		dust.emissionRate=getHighestSpeed()*2;
		JumpSoundSource.PlayOneShot(collideSoundClip);
		dust.Play();
		
	}
	if(hit.gameObject.rigidbody && hit.gameObject.rigidbody.mass * hit.rigidbody.velocity.magnitude>25){
		setStaticFrame((hit.gameObject.rigidbody.velocity));
	}
	if(hit.gameObject.tag.Equals("1DMG")){
		if(!dead && invuln < 1){
			killPlayer();
		}
	}
}


function OnCollisionStay (hit : Collision){
	

	if(hit.gameObject.rigidbody && hit.rigidbody.mass*hit.rigidbody.velocity.magnitude> rigidbody.mass*rigidbody.velocity.magnitude){
		setStaticFrame((hit.gameObject.rigidbody.velocity));
	}
	if(hit.gameObject.tag.Equals("1DMG")){
		if(!dead && invuln < 1){
			killPlayer();
		}
	}
}


function sendBackToCheckPoint(){
		invuln = 10;
		transform.position = checkPointLocation;
		checkPointTimer = Time.time;
		isTeleporting = true;
		trail.time = 0;
		checkPointScript.animateCoolDown(true);
		checkPointScript.playRespawnSound();
		if(hookShotIsStuck){
   	 			LetGoHookShot();
				hook.letGo();
			}
 }

function setStaticFrame(outsideAction : Vector3){
	staticFrame = outsideAction;

 }

function setIsFire1ing(bool : boolean){
	isFire1ing = bool;
 }
function setIsFire2ing(bool:boolean){
 	isFire2ing = bool;
 }
 function getIsFire1ing(){
	return isFire1ing;
 }
function getIsFire2ing(){
 	return isFire2ing;
 }
 function setIsPressingUp(bool:boolean){
 	isPressingUp = bool;
 }
 function getIsPressingUp(){
 	return isPressingUp;
 }
 function getCheckPointTimer(){
 	return checkPointTimer;
 }

function SetCheckPointIsReady(){
	checkPointTimer = 0;
}
function killPlayer(){
	if(invuln <1){
	timeAtKillPlayer = Time.time;
	var velocityAtDeath = currSpeed;
	if(hasCheckpoint && (timeAtKillPlayer > checkPointTimer+5)){
		sendBackToCheckPoint();
	}else{
		dead = true;
    	JumpSoundSource.PlayOneShot(FailSound);
		var deadParts = Instantiate(deathAnim, transform.position, Quaternion.identity);
	for (var child : Transform in deadParts) {
		child.rigidbody.AddForce(velocityAtDeath, ForceMode.Impulse);
		child.rigidbody.AddExplosionForce(1000,transform.position , 2, 0.0);
	}
	EnterDeadMode();
	showGUI = true;
//	controller.enabled=false;

	}
	}
}
function OnTriggerStay(other : Collider){
	if(other.gameObject.tag.Equals("1DMG")){
		if(!dead && invuln < 1){
			killPlayer();
		}
	}
}
function OnTriggerExit(other : Collider){
	if(isTeleportingTo1 && other.tag.Equals("Portal1")){
		isTeleportingTo1 = false;
	}else if(isTeleportingTo2 && other.tag.Equals("Portal2")){
		isTeleportingTo2 = false;
	}
}
function OnTriggerEnter(other : Collider){
	if(other.tag.Equals("1DMG") && !isTeleporting && Time.time > timeAtKillPlayer +0.1){
		if(other.gameObject.tag.Equals("1DMG")){
		if(!dead && invuln < 1){
			killPlayer();
		}
	}

	}else if(other.tag.Equals("Portal2")&&!isTeleportingTo2){
		var high1 : float = 0;

		high1 = getHighestSpeed();
		var Portal1Location = GameObject.Find("Portal1(Clone)");
		if(Portal1Location){
		 	teleportedVelocity = Portal1Normal *  high1;
		 	transform.position = Portal1Location.transform.position + Portal1Normal;
		 	isTeleportingTo1= true;
		 	applyingTeleportVelocity = true;
		}
	}else if(other.tag.Equals("Portal1") && !isTeleportingTo1){
		var high2 : float = 0;

		high2 = getHighestSpeed();
		var Portal2Location = GameObject.Find("Portal2(Clone)");
		if(Portal2Location){
			teleportedVelocity = Portal2Normal * high2;
			transform.position = Portal2Location.transform.position +Portal2Normal;
			isTeleportingTo2= true;
			applyingTeleportVelocity = true;
		}
	}

	if(other.gameObject.tag.Contains("Finish") && !dead){
		finnished = true;
		showGUI = true;
		time = Time.time - timeAtStart;
		RunSoundSource.PlayOneShot(WinSound);
	}
}

function isShowMenu(){
		GUI.contentColor = Color.white;
		GUI.backgroundColor = Color.black;
		if(Screen.currentResolution.width>1000){
		GUI.skin.button.fontSize=24;
		}else{
		GUI.skin.button.fontSize=12;

		}
		if(GUI.Button (Rect (0,Screen.height-Screen.height/8,Screen.width/4,Screen.height/8), "Select Kit")){
			menuContextRigSelect = !menuContextRigSelect;
			menuContextDebug = false;
			menuContextLevelOptions = false;
			menuContextGameOptions=false;

		}
		if(GUI.Button (Rect (Screen.width/4,Screen.height-Screen.height/8,Screen.width/4,Screen.height/8), "Debug Options")){
			menuContextRigSelect = false;
			menuContextLevelOptions = false;
			menuContextDebug = !menuContextDebug;
			menuContextGameOptions=false;
		}
		if (GUI.Button (Rect (Screen.width/4*2,Screen.height-Screen.height/8,Screen.width/4,Screen.height/8), "Game Settings")) {
			 menuContextGameOptions = !menuContextGameOptions;
			 menuContextDebug = false;
			 menuContextRigSelect = false;
			 menuContextLevelOptions = false;
		}

		if (GUI.Button (Rect (Screen.width-Screen.width/4,Screen.height-Screen.height/8,Screen.width/4,Screen.height/8), "Level Options")) {
			 menuContextLevelOptions = !menuContextLevelOptions;
			 menuContextDebug = false;
			 menuContextRigSelect = false;
			 menuContextGameOptions=false;
		}
		if(menuContextGameOptions){
			var musicString = "";
			if(PlayerPrefs.GetInt("NoMusic",0)==1){
				musicString = "Music OFF";
			}else{
				musicString = "Music ON";
			}
			if(GUI.Button(Rect(Screen.width/4*2,Screen.height-Screen.height/8*2,Screen.width/4,Screen.height/8),musicString)){
			var go = GameObject.Find("GameMusic");
				if(PlayerPrefs.GetInt("NoMusic",0)==0){
					PlayerPrefs.SetInt("NoMusic",1);
					go.audio.Stop();

				}else{
					PlayerPrefs.SetInt("NoMusic",0);
					go.audio.Play();

				}
			}

		}
		if(menuContextLevelOptions){
			if (GUI.Button (Rect (Screen.width-Screen.width/4,Screen.height-Screen.height/8*2,Screen.width/4,Screen.height/8), "Level Select")) {
				 Application.LoadLevel("MainMenu");
			}
			if (GUI.Button (Rect (Screen.width-Screen.width/4,Screen.height-Screen.height/8*3,Screen.width/4,Screen.height/8), " Retry")) {
				 Application.LoadLevel(Application.loadedLevelName);
			}
			if (GUI.Button (Rect (Screen.width-Screen.width/4,Screen.height-Screen.height/8*4,Screen.width/4,Screen.height/8), " Quit")) {
				 (Application.Quit());
			}
		}
		if(menuContextDebug){
			if (GUI.Button (Rect (Screen.width/4,Screen.height-Screen.height/8*2,Screen.width/4,Screen.height/8), " Clear Data")) {
				PlayerPrefs.DeleteAll();
			}

			if (GUI.Button (Rect (Screen.width/4,Screen.height-Screen.height/8*3,Screen.width/4,Screen.height/8), " UnlockAllKits")) {
				 PlayerPrefs.SetInt("HookShotRigUnlocked",1);
				 PlayerPrefs.SetInt("PortalRigUnlocked",1);
				 PlayerPrefs.SetInt("CheckPointRigUnlocked",1);
				 PlayerPrefs.SetInt("GunRigUnlocked",1);
				 PlayerPrefs.SetInt("TrackingDartUnlocked",1);
				 PlayerPrefs.SetInt("WingsUnlocked",1);
			}
			if(GUI.Button (Rect (Screen.width/4,Screen.height-Screen.height/8*4,Screen.width/4,Screen.height/8), " UnlockAllLevels")) {
				 for(var i : int = 1; i < 15; i++){
   					PlayerPrefs.SetInt("Beat Level " + (i) , 1);
   				}
			}
		}

		if(menuContextRigSelect){
			var currRigInfo : Rect = Rect(Screen.width-Screen.width/4*3,Screen.height-Screen.height/8*6,Screen.width/4*3,Screen.height/8*5);
			GUI.skin.box.wordWrap=true;
			GUI.skin.box.fontSize=32;
			var kitRect : Rect = Rect(0,Screen.height-Screen.height/8*2,Screen.width/4,Screen.height/8);

			if(PlayerPrefs.GetInt("GunRigUnlocked",0)==1){
				if(PlayerPrefs.GetString("Rig").Equals("GunRig")){
					GUI.color = Color.green;
					GUI.Box(currRigInfo,"Weapon : Press 1 to FIRE a bullet or 2 to FIRE a TRACKING DART(once unlocked). HOLD 2 to erase TRACKING DART");

				}else{
					GUI.color = Color.white;
				}


				if(GUI.Button (kitRect, "Weapon")) {
					setRig("GunRig");
					//EnterPauseMode();
				}
			}
			if(PlayerPrefs.GetInt("HookShotRigUnlocked",0)==1){
			if(PlayerPrefs.GetString("Rig").Equals("HookShotRig")){
				GUI.color = Color.green;
				GUI.Box(currRigInfo,"Rope : Press 1 to FIRE your ROPE. Press 2 to RELEASE.  Press UP/DOWN to extend or retract your rope");


			}else{
				GUI.color = Color.white;
			}
			kitRect.y-=Screen.height/8;
				if(GUI.Button( kitRect, "Rope")) {
					setRig("HookShotRig");
				//En	terPauseMode();
			}
		}
		if( PlayerPrefs.GetInt("PortalRigUnlocked",0)==1){
		if(PlayerPrefs.GetString("Rig").Equals("PortalRig")){
			GUI.color = Color.green;
			GUI.Box(currRigInfo,"PortHoles : Press 1 to FIRE YELLOW. Press 2 to FIRE TEAL.  When you touch either of the PortHoles, you will teleport to the other");


		}else{
			GUI.color = Color.white;
		}
		kitRect.y-=Screen.height/8;

			if(GUI.Button (kitRect, "PortHoles")) {
				setRig("PortalRig");
				//EnterPauseMode();
			}
		}
		if(PlayerPrefs.GetInt("CheckPointRigUnlocked",0)==1){
		if(PlayerPrefs.GetString("Rig").Equals("CheckPointRig")){
			GUI.color = Color.green;
			GUI.Box(currRigInfo,"SaveSpot : Press 1 to SET your CHECKPOINT. Press 2 to WARP back to your CHECKPOINT.  CHECKPOINTS have a 5 second COOLDOWN between uses");


		}else{
			GUI.color = Color.white;
		}
		kitRect.y-=Screen.height/8;

			if(GUI.Button (kitRect, "SaveSpot")) {
				setRig("CheckPointRig");
				//EnterPauseMode();
			}
		}
		if( PlayerPrefs.GetInt("WingsUnlocked",0)==1){

		if(PlayerPrefs.GetString("Rig").Equals("WingRig")){
			GUI.color = Color.green;
			GUI.Box(currRigInfo,"WINGS : Wings give you 5 AIR-JUMPS of decreasing strength which replenish upon touching the ground");


		}else{
			GUI.color = Color.white;
		}
				kitRect.y-=Screen.height/8;
			if(GUI.Button (kitRect, "Wings")) {
				setRig("WingRig");
				//EnterPauseMode();
			}
		}
	}
}
function isShowGUI(){
		//print("isShowGUI");


	if (!finnished && dead) {
	GUIController.hideControls();
	if(Screen.currentResolution.width > 1000){
		GUI.skin.label.fontSize = 26;
		GUI.skin.box.fontSize = 26;
		GUI.skin.button.fontSize=24;

		}else{
		GUI.skin.label.fontSize = 12;
		GUI.skin.box.fontSize = 12;
		GUI.skin.button.fontSize=12;

		}


    GUI.Box (endOfLevelBox, "You Died For Reals");
   		GUI.Label (Rect(Screen.width/2 - Screen.height*.165,Screen.height - Screen.height*.25,Screen.height*.66,Screen.height*.25), " You did it in " + time + " Seconds" );
		if (GUI.Button (Rect (0,Screen.height-Screen.height*.33,Screen.height*.33,Screen.height*.33), " Reload Level")) {
        Application.LoadLevel(Application.loadedLevelName);
    	}
    	if (GUI.Button (Rect (Screen.width-Screen.height*.33,Screen.height-Screen.height*.33,Screen.height*.33,Screen.height*.33), " Main Menu")) {
        Application.LoadLevel("MainMenu");
    	}



	}else if(showGUI && finnished){
		GUIController.hideControls();
		//print(Screen.currentResolution.width + " " + Screen.currentResolution.height + "  "  );
		if(Screen.currentResolution.width > 1000){
		GUI.skin.label.fontSize = 26;
		GUI.skin.box.fontSize = 26;
		GUI.skin.button.fontSize=24;

		}else{
		GUI.skin.label.fontSize = 12;
		GUI.skin.box.fontSize = 12;
		GUI.skin.button.fontSize=12;

		}
		if(time < PlayerPrefs.GetFloat("HighScore"+Application.loadedLevelName,120)){
			PlayerPrefs.SetFloat("HighScore" +Application.loadedLevelName, time);
		}
		if(PlayerPrefs.GetInt("Beat " +Application.loadedLevelName,0) == 0){
			PlayerPrefs.SetInt("Beat " +Application.loadedLevelName, 1);
		}
		GUI.Box (endOfLevelBox, "Finished");
   		GUI.Label (Rect(Screen.width/2 - Screen.height*.165,Screen.height - Screen.height*.25,Screen.height*.66,Screen.height*.25), " You did it in " + time + " Seconds" );
		if (GUI.Button (Rect (0,Screen.height-Screen.height*.33,Screen.height*.33,Screen.height*.33), " Reload Level")) {
        Application.LoadLevel(Application.loadedLevelName);
    	}
    	if (GUI.Button (Rect (Screen.width-Screen.height*.33,Screen.height-Screen.height*.33,Screen.height*.33,Screen.height*.33), " Main Menu")) {
        Application.LoadLevel("MainMenu");
    	}

   	}
}
function playSound(clip : AudioClip){
	JumpSoundSource.PlayOneShot(clip);
}
function OnGUI() {
	if(showGUI){
		isShowGUI();
	}else if(showMenu){
		isShowMenu();
	}else if(isQuickSelecting){
		//quickSelect();
	}else{
	//var timeRect : Rect = Rect(0,0,200,100);
	//GUI.Box (timeRect, "Time:");
	//timeRect.y +=24;
	//GUI.Label (timeRect, "Time: "+ (Mathf.RoundToInt((Time.time) - (timeAtStart))));
	//timeRect.y +=24;
	//GUI.Label (timeRect,"BestTime: " + PlayerPrefs.GetFloat("HighScore"+Application.loadedLevelName,120));
	}
}
function setCheckpoint(pos : Vector3, has : boolean){
	hasCheckpoint = has;
	if(has){
		checkPointTimer = Time.time;
		checkPointLocation = pos;
	}
	//checkPointScript = script;
}

function makeSetCheckPoint(){
	checkPointScript.setCheckPoint();
}
function isHasCheckpoint(){
	return hasCheckpoint;
}
function setIsTeleporting(val : boolean){
	isTeleporting = val;
}
function ActivateRig(){
	var rig = PlayerPrefs.GetString("Rig");
	print("Activating rig : " + rig);
	if(rig.Equals("PortalRig")){
		PortalRig.SetActive(true);
		checkPointScript.setIsMainSelection(false);
		GunRig.SetActive(false);
		hook.setIsMainSelection(false);
		SetReticalActive(true);
		setWingsEquipped(false);
	}else if(rig.Equals("CheckPointRig")){
		SetReticalActive(false);
		PortalRig.SetActive(false);
		checkPointScript.setIsMainSelection(true);
		GunRig.SetActive(false);
		SetReticalActive(false);
		hook.setIsMainSelection(false);
		setWingsEquipped(false);
	}else if(rig.Equals("GunRig")){
		SetReticalActive(true);
		PortalRig.SetActive(false);
		checkPointScript.setIsMainSelection(false);
		GunRig.SetActive(true);
		hook.setIsMainSelection(false);
		setWingsEquipped(false);
	}else if(rig.Equals("HookShotRig")){
		PortalRig.SetActive(false);
		checkPointScript.setIsMainSelection(false);
		GunRig.SetActive(false);
		HookShotRig.SetActive(true);
		hook.setIsMainSelection(true);
		SetReticalActive(true);
		setWingsEquipped(false);
	}else if(rig.Equals("WingRig")){
		PortalRig.SetActive(false);
		checkPointScript.setIsMainSelection(false);
		GunRig.SetActive(false);
		hook.setIsMainSelection(false);
		setWingsEquipped(true);
		SetReticalActive(false);
	}else{
		PortalRig.SetActive(false);
		checkPointScript.setIsMainSelection(false);
		GunRig.SetActive(false);
		hook.setIsMainSelection(false);
		setWingsEquipped(false);
		SetReticalActive(false);


	}
		GUIController.showControls();
}


function setRig(rig:String){
	print("Setting rig : " + rig);
	if(!PlayerPrefs.GetString("Rig").Equals(rig)){
		if(rig.Equals("PortalRig")){
			PlayerPrefs.SetString("Rig", "PortalRig");
		}else if(rig.Equals("CheckPointRig")){
			PlayerPrefs.SetString("Rig", "CheckPointRig");
		}else if(rig.Equals("GunRig")){
			PlayerPrefs.SetString("Rig", "GunRig");
		}else if(rig.Equals("HookShotRig")){
			PlayerPrefs.SetString("Rig", "HookShotRig");
		}else if(rig.Equals("WingRig")){
			PlayerPrefs.SetString("Rig", "WingRig");
		}else if(rig.Equals("Pause")){
		}
	}

}
function UpdateRope(length : float, pos: Vector3){
	hookShotLength = length;
	hookShotLocation = pos;

}
function SetHookShotIsStuck(bool : boolean, pos : Vector3, distOfRope : float){
	hookShotIsStuck = bool;
	hookShotLocation = pos;
	hookShotLength = distOfRope;
}
function SetHookShotSwingAxis(pos:Vector3){
	hookShotLocation = pos;
}
function LetGoHookShot(){
	hookShotIsStuck = false;
}
function GetReticalActive(){
	return retical.active;
}
function SetReticalActive(bool : boolean){
	retical.SetActive(bool);
}
function setAimSpot(pos: Vector3){
	aimSpot = pos;
}
function getAimSpot(){
	return aimSpot;
}

//add zoom setting to player prefs
function OnDestroy () {
	dead = true;
	showGUI = true;
}
function checkForUnlocks(){
	

	if(Application.loadedLevelName.Equals("Level 2") && PlayerPrefs.GetInt("PortalRigUnlocked",0)==0){
			endOfLevelText =  "Unlocked: Portals! ";
		PlayerPrefs.SetInt("PortalRigUnlocked",1);
	
	}if(Application.loadedLevelName.Equals("Level 4")  && PlayerPrefs.GetInt("TrackingDartUnlocked",0)==0){
			endOfLevelText =  "Gun Upgrade: Tracking Darts! ";
		PlayerPrefs.SetInt("TrackingDartUnlocked",1);
	}if(Application.loadedLevelName.Equals("Level 5") && PlayerPrefs.GetInt("WingsUnlocked",0)==0){
			endOfLevelText =  "Unlocked: FlappyWings!";
		PlayerPrefs.SetInt("WingsUnlocked",1);
	}

	if(!endOfLevelText.Equals("")){
		var unlockBox = endOfLevelBox;
		unlockBox.y +=Screen.height/5;
		unlockBox.x +=Screen.width/4;
		unlockBox.width=Screen.width/2;
			//GUI.color = Color.black;

		GUI.contentColor = Color.white;

		if(Screen.currentResolution.width>1000){
		GUI.skin.label.fontSize=48;
		}else{
		GUI.skin.label.fontSize=48;

		}
		GUI.Box(unlockBox,"");
		GUI.Label(unlockBox,endOfLevelText);
	}
}
function setIsJumping(val :boolean){
   	isJumping = val;
 	//setToJumping = true;
}
function setIsPressingDown(bool:boolean){
	isPressingDown = bool;
}
function getIsPressingDown(){
	return isPressingDown;
}
function getIsStillJumping(){
	return isStillJumping;
}
function getMessageRect(){
	return messageRect;
}

function setWingsEquipped(bool:boolean){
	if(bool){
		WingsEquipped = true;
		wings.SetActiveRecursively(true);


	}else{

		WingsEquipped = false;
		wings.SetActiveRecursively(false);


	}
}
function isMenu(){
	return showMenu;
}
function EnterDeadMode(){
	if(isInAimMode){
		ExitAimMode();
	}else if(isInMenuMode){
		ExitMenuMode();
	}
}

// Pause Mode is when Everything is frozen. Time Stops. Simulation Pauses...;
function EnterPauseMode(){
	print("EnteringPauseMode");
	pauseVelocity = getHighestVector();
	Time.timeScale = 0;
	gameIsPaused = true;
}
function EnterMenuMode(){
	print("EnteringMenuMode");
	if(isInGameMode){
		ExitGameMode();
	}else if(isInAimMode){
		ExitAimMode();
	}
	GUIController.hideControls();
	isInMenuMode = true;
	showMenu = true;

}
function ExitMenuMode(){
	print("ExitMenuMode");
	isInMenuMode = false;
	showMenu = false;
	//ActivateRig();
}
function ExitPauseMode(){
	print("ExitPauseMode");
	Time.timeScale = 1;
	isExitingPause  = 3;
	gameIsPaused = false;
	if(isInGameMode){
		//ActivateRig();
	}
}
//GameMode is when you move, enemies move, clock ticks;
function EnterGameMode(){
	print("EnteringGameMode");
	ActivateRig();
	if(isInMenuMode){
		ExitMenuMode();
	}else if(isInAimMode){
		ExitAimMode();
	}
	isInGameMode = true;
}
function ExitGameMode(){
	print("ExitGameMode");
	if(!gameIsPaused){
		EnterPauseMode();
	}
	isInGameMode = false;
}
//AimMode should be paused, but allow you to aim curser, but you dont move and enemies dont move
function EnterAimMode(){
	print("EnteringAimMode");
	SetReticalActive(true);
	if(isInGameMode){
		ExitGameMode();
	}else if(isInMenuMode){
		ExitMenuMode();
	}
	GUIController.setAiming();
	isInAimMode = true;
}

function ExitAimMode(){
	print("ExitAimMode");
	isInAimMode = false;
}

function getGameIsPaused(){
	return gameIsPaused;
}
function getIsInMenuMode(){
	return isInMenuMode;
}
function getIsInGameMode(){
	return isInGameMode;
}
function getIsInAimMode(){
	return isInAimMode;
}

function getHighestSpeed(){
	return Mathf.Max(speedArray);
}

function getActiveRig(){
	return PlayerPrefs.GetString("Rig");
}
function populateSpeedArray(){
 	if(speedCounter == 1){
    	speedCounter = 2;
    }else if(speedCounter == 2){
    	speedCounter = 3;
    }else{
    speedCounter = 1;
    }
    if(vectorArray == null || vectorArray.Length<4) vectorArray = new Vector3[4];
    vectorArray[speedCounter] = currSpeed;
     if(speedArray == null || speedArray.Length<4) speedArray = new float[4];
    speedArray[speedCounter] = currSpeed.magnitude;
}

function getHighestVector(){
	var highest : float = 0;
	var indexOfHighest: float = 0;
	for (var i : int = 0; i < 4; i++){
		if(highest < vectorArray[i].magnitude){
			indexOfHighest = i;
			highest = vectorArray[i].magnitude;
		}
	}
	return vectorArray[indexOfHighest];
}

function checkForFlags(){
	if(startingCheckPointFlag){
		checkPointScript.setCheckPoint();
		startingCheckPointFlag = false;
	}

}
function getPCDebugging(){
	return PCDebugging;
}

function setIsPressingLeft(bool:boolean){
	isPressingLeft = bool;
}
function getIsPressingLeft(){
	return isPressingLeft;
}
function getIsPressingRight(){
	return isPressingRight;
}
function setIsPressingRight(bool:boolean){
	isPressingRight = bool;
}
function getIsPressingJump(){
	return isJumping;
}
function SetIsHanging(bool : boolean){
	isHanging = bool;
}

function GetRetical(){
	return retical;

}

function HangMovementTransformation(direction : Vector3){
	var newDirection :Vector3 = Vector3.zero;
	var distance = Vector3.Distance(transform.position,hookShotLocation);
	var swinging : boolean = false;
	if(distance > hookShotLength+2){
		newDirection -= ((transform.position - hookShotLocation).normalized  * ((distance-hookShotLength)));
		swinging = true;	
	}
	if(swinging||(Vector3.Distance(transform.position + direction,hookShotLocation)) >= hookShotLength+2){
		var between = ((transform.position) - hookShotLocation).normalized;
		var rDirection = Vector3.Cross(Vector3.forward,between);
					//Debug.DrawLine(transform.position,transform.position + rDirection*5,Color.black,2);

		newDirection += Vector3.Project(direction,rDirection);
		if(newDirection.magnitude > runSpeed){
			newDirection.Scale(Vector3(1,.995,0));
		}
	swinging = true;
	}
		
	if(newDirection==Vector3.zero) return direction;
	return newDirection;
}
function setIsQuickSelecting(bool: boolean){
	isQuickSelecting = bool;
	if(isQuickSelecting){
		EnterAimMode();
	}else{
		ExitAimMode();
	}
}
function getIsQuickSelecting(){
	return isQuickSelecting;
}
function setLetGoOfJump(bool : boolean){
	letGoOfJump = bool;


	if(bool){
		isStillJumping = false;
	}
}

function applyGravity(){
	if(currSpeed.y > -140){

    if(isOnLeftWall||isOnRightWall){
    	if(currSpeed.y < -10){
    		currSpeed.y = currSpeed.y/1.02;
    	}else if(isOnLeftWall){
    		currSpeed -= Vector3.Cross(left_ray.normal,Vector3.back)*0.6* gravity * Time.fixedDeltaTime;
		}else if(isOnRightWall){
    		currSpeed -= Vector3.Cross(right_ray.normal,Vector3.forward)*0.6* gravity * Time.fixedDeltaTime;
		}
    //apply gravityies
    }else if(isStillJumping){
    	currSpeed.y -= 0.6*gravity * Time.fixedDeltaTime;

    }else{
    	currSpeed.y -= gravity * Time.fixedDeltaTime;
    }
    //add extra gravity if user wants it
    if(isPressingDown){
    	currSpeed.y -= gravity * Time.fixedDeltaTime;
    }

    }else{
    //////////print(currSpeed.y);
    }
}

function SetWarpTo1(value : boolean){
	isTeleportingTo1 = value;
}
function SetWarpTo2(value : boolean){
	isTeleportingTo2 = value;
}