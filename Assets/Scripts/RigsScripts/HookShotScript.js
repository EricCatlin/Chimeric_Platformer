#pragma strict
import System.Collections.Generic;

private var cameraa : Camera;
private var mousePos : Vector3;
private var targetWorldPoint : Vector3;
private var muzzleTransform : Transform;
private var isPaused : boolean = false; // probably same as isNotMainSelection
private var isMainSelection : boolean = true; // use if you need background processes(ie hanging while selected on machine gun)

//var Portal2 : GameObject;
var shotSpeed : float;
 @Range(0.0,1.0)
var line_width :float = .05;
 @Range(0.0,1.0)
var min_middle_proximity  :float = .1;
var hit_slack_distance   :float = 0.5;

private var nextShotTime : float = 0.0;
//var timeBetweenShots : float = 1.0;
private var timeAtLastMouseMove : float ;
private var isShooting : boolean;
private var isAimingMouse : boolean;
private var isAimingStick : boolean;
private var timeAtLastManualAim : float;
private var soundSource : AudioSource;
var FireSound : AudioClip;
//private var currSpeed : Vector3;
private var currRotation : Quaternion;
private var AimDirection : Vector3;
private var line : LineRenderer;
private var trail : TrailRenderer;
private var bulletLive : boolean;
private var bullet :GameObject;
private var movement : PlayerMovement;


private var tipScript : HookShotTipScript;
var HookShotTip : GameObject;
var maxLengthOfRope : float;
var hookIsStuck : boolean;
var hookIsShooting : boolean;
var hookIsRetracting : boolean;
private var hangingRope:float;
private var totalRopeLength : float; // the total amount of rope out from wall to player. Be sure to add nonHangingRope to it to make it full
private var nonHangingRope : float; // the amount of rope out from the wall to the SwingAxis, but not to the player
private var desiredLengthOfRope : float;
var RopeVertexes : List.<Transform> = new  List.<Transform>();
private var hit : RaycastHit;
private var timeAtShot : float;
private var trailPositions : Array = new Array();
private var replayCounter : int = 0;
private var aimLocationForLine : Vector3;
private var retical : GameObject;
private var readyToRetract : boolean = false;
private var readyToFire : boolean = true;
public var hookTip :Transform;
public var desired_hanging_rope : float = 0;


function letGo(){
	hookIsStuck = false;
	line.enabled = false;
	movement.LetGoHookShot();
	nonHangingRope = 0;
	KillBulletProcess();
}


function SetHookIsStuck(bool : boolean,swingAxis: Transform, length : float){
	if(!hookIsStuck)	desiredLengthOfRope = length;

	hookIsStuck = bool;
	hookTip = swingAxis;
	movement.SetHookShotIsStuck(bool,swingAxis.position,length);
	//totalRopeLength = length;
	//hangingRope = length;
	RopeVertexes.Clear();
	RopeVertexes.Add(swingAxis);
	if(bool){
		line.enabled=true;
	}
}

function GetState(){
	isPaused = movement.getGameIsPaused();
}

function setPaused(bool : boolean){
	print("hookShotIsPaused");
	isPaused = bool;
}

function setIsMainSelection(bool : boolean){
	isMainSelection = bool;
	isPaused = false;
}

function AddVertexInRope(pos:Transform,index:int){	
	var newRope : List.<Transform> = new List.<Transform>();
	for(var i : int = 0; i<index;i++){
		newRope.Add(RopeVertexes[i]);
	}
	newRope.Add(pos);
	for(var j : int = index; j<RopeVertexes.Count;j++){
	newRope.Add(RopeVertexes[j]);
	
	}
	RopeVertexes= newRope;
	calculateRopeLengths();
	movement.UpdateRope(hangingRope,(RopeVertexes[RopeVertexes.Count-1]).position);
}
function LookForCollisions(){
var direction:Vector3 = new Vector3();
		direction = (movement.transform.position-RopeVertexes[RopeVertexes.Count-1].position);
	if(direction.magnitude>10){

	if(Physics.Linecast(movement.transform.position,RopeVertexes[RopeVertexes.Count-1].position+direction/10,hit)){

			if(hit.collider.tag.Equals("1DMG")){
				tipScript.letGo();
			}else{
			if(!hit.collider.tag.Equals("Pickup")){
				var  newPoint2 : GameObject = new GameObject();
				newPoint2.transform.position = 	hit.collider.ClosestPointOnBounds(hit.point)  ;
				newPoint2.transform.parent=hit.collider.gameObject.transform;
				newPoint2.transform.position += newPoint2.transform.localPosition.normalized;
				AddVertexInRope(newPoint2.transform,RopeVertexes.Count);

				} 
				}
			}
			}
	for( var x : int = 0; x < RopeVertexes.Count-1 ; x++){
	direction = (RopeVertexes[x].position-RopeVertexes[x+1].position);
		if(direction.magnitude>10){

			

	//Debug.DrawLine(RopeVertexes[x+1].position+direction/10,RopeVertexes[x].position-direction/10);
		if(Physics.Linecast(RopeVertexes[x+1].position+direction/10,RopeVertexes[x].position-direction/10,hit)){

			if(hit.collider.tag.Equals("1DMG")){
				tipScript.letGo();
			}else{
			if(!hit.collider.tag.Equals("Pickup")){
				var  newPoint : GameObject = new GameObject();
				newPoint.transform.position = 	hit.collider.ClosestPointOnBounds(hit.point+direction.normalized   ) ;
				newPoint.transform.parent=hit.collider.gameObject.transform;
				AddVertexInRope(newPoint.transform,x+1);
				} 
			}
	}
	}
	}
}
function LookForRemovals(){
var direction:Vector3 = new Vector3();
		
			var point1 : Vector3 =new Vector3();
			var point2 : Vector3 =new Vector3();
			var point3 : Vector3 =new Vector3();
			
			 var total_dist : float;
			 var min_dist :float;
			
	if(RopeVertexes.Count > 2){
		
		for( var i : int = RopeVertexes.Count-1 ; i > 0;i--){
			if(i == (RopeVertexes.Count-1)){
				  point1 = movement.transform.position;
				  point2 = RopeVertexes[i].position;
				  point3 = RopeVertexes[i-1].position;
				  direction = (point1 - point3);
				  
				  total_dist = Vector3.Distance(point1,point2) + Vector3.Distance(point2,point3);
				  min_dist = Vector3.Distance(point1,point3);
				  if(Mathf.Abs(total_dist-min_dist) < (total_dist*min_middle_proximity )){

				  //Debug.DrawLine(point1 - direction/10,point3,Color.black,1);

			if((!Physics.Linecast(point1,point3+direction.normalized*2,hit ) || Vector3.Distance(hit.point,point3)<hit_slack_distance)){
				Destroy(RopeVertexes[i].gameObject);
				RopeVertexes.RemoveAt(i);

				
			}
			}
			
			
			}else{
				 point1 = RopeVertexes[i+1].position;
				 point2 = RopeVertexes[i].position;
				 point3  = RopeVertexes[i-1].position;
				 direction = (point1 - point3);
				 total_dist = Vector3.Distance(point1,point2) + Vector3.Distance(point2,point3);
				 min_dist = Vector3.Distance(point1,point3);
				 if(Mathf.Abs(total_dist-min_dist) < (total_dist*min_middle_proximity ) ){

				 //Debug.DrawLine(point1 - direction/10,point3,Color.yellow,1);
			if( ( (!Physics.Linecast(point1,point3+direction.normalized*2,hit ) || Vector3.Distance(hit.point,point3)<hit_slack_distance) )  ){

					//print("Removing 3");

				Destroy(RopeVertexes[i].gameObject);
				RopeVertexes.RemoveAt(i);

				////Debug.DrawLine(point1,point2,Color.red,4);
				
			}
			}
			
			}
			}}
		
	
	
	 if(RopeVertexes.Count == 2){
	
			point1  = movement.transform.position;
			point2  = RopeVertexes[1].position;
			point3  = RopeVertexes[0].position;
			total_dist = Vector3.Distance(point1,point2) + Vector3.Distance(point2,point3);
			min_dist = Vector3.Distance(point1,point3);
			direction = (point1 - point3);
if(Mathf.Abs(total_dist-min_dist) < (total_dist*min_middle_proximity ) ){
				  				//Debug.DrawLine(point1 - direction/10,point3,Color.green,1);
	if(  (!Physics.Linecast(point1  - direction/10,point3,hit )|| Vector3.Distance(hit.point,point3)<hit_slack_distance)){
	
				Destroy(RopeVertexes[1].gameObject);
			RopeVertexes.RemoveAt(1);
			////Debug.DrawLine(point1,point2,Color.blue,4);
			calculateRopeLengths();

		}
	
	}
	}
	 
}

function lookForRopeIntercepts(){	
		LookForCollisions();
		LookForRemovals();
			
	
}

function calculateRopeLengths(){
	totalRopeLength = 0;
	var Point1:Vector3;
	var Point2:Vector3;
	for( var i : int = 0 ; i < RopeVertexes.Count-1;i++){
		Point1 = RopeVertexes[i].position;
		Point2 = RopeVertexes[i+1].position;
		
		totalRopeLength+=Vector3.Distance(Point1,Point2);
	} 
	hangingRope =Vector3.Distance(RopeVertexes[RopeVertexes.Count-1].position,movement.transform.position);
	 
	totalRopeLength+=hangingRope;
	nonHangingRope = totalRopeLength - hangingRope;
	desired_hanging_rope = hangingRope - (totalRopeLength - desiredLengthOfRope);
	//print(totalRopeLength);
}

function ExtendRetract(){
		
		if(movement.getIsPressingDown()){
			if(desiredLengthOfRope <totalRopeLength) desiredLengthOfRope = totalRopeLength;
			if(desiredLengthOfRope < maxLengthOfRope){
			 	desiredLengthOfRope +=.5;
			}
		}
		if(movement.getIsPressingUp()){
			if(desiredLengthOfRope >totalRopeLength) desiredLengthOfRope = totalRopeLength;
			 if(desiredLengthOfRope  >5){
			 	desiredLengthOfRope -=.5;
			}
		}
		
}
function FixedUpdate () {
	GetState();
	if(!isPaused){
		if(isMainSelection){	
			getInputs();
			aim();	
			if(isShooting && !bulletLive){
				Shoot();
				isShooting = false;
			}else if(bulletLive){
				if(hookIsStuck){
					calculateRopeLengths();		
					ExtendRetract();	
	
					lookForRopeIntercepts();
					sendRopeDetailsToPlayer();
					line.SetWidth(line_width,line_width);
					line.SetVertexCount(RopeVertexes.Count+1);
					var j : int =0;
					for(j = 0 ; j < RopeVertexes.Count; j++){
						line.SetPosition(j,RopeVertexes[j].position);
    				}
    				line.SetPosition(j, muzzleTransform.position);
				}else{
					line.SetVertexCount(2);
					line.SetPosition(0,muzzleTransform.position);
					line.SetPosition(1,bullet.transform.position);
					line.SetWidth(line_width,line_width);
				}	
			}	
			if(hookIsRetracting && (!bullet || Vector3.Distance(transform.position,bullet.transform.position)<10)){
				KillBulletProcess();
			}
		}else{
			if(hookIsStuck){
				calculateRopeLengths();	
				ExtendRetract();	
				lookForRopeIntercepts();
				sendRopeDetailsToPlayer();
				line.enabled = true;
				line.SetWidth(line_width,line_width);
				line.SetVertexCount(RopeVertexes.Count+1);
				for(j = 0 ; j < RopeVertexes.Count; j++){
					line.SetPosition(j,RopeVertexes[j].position);
    			}
    			line.SetPosition(j, muzzleTransform.position);
			}else{
				KillBulletProcess();
				this.gameObject.SetActive(false);	
			}		
		}
	}	
}

function sendRopeDetailsToPlayer(){
		if(RopeVertexes.Count>0)
		movement.UpdateRope(desired_hanging_rope,RopeVertexes[RopeVertexes.Count-1].position);

}

function getInputs(){
	if(movement.getIsFire1ing()){
		if(readyToFire){
			isShooting = true;
			readyToFire = false;
		}
		if(hookIsStuck && readyToRetract){
			tipScript.letGo();
			readyToRetract = false;
		}
	
	}else if(hookIsStuck || bulletLive){
		readyToRetract = true;
	}
	if(movement.getIsFire2ing() && (bulletLive||hookIsStuck)){
		tipScript.letGo();
		readyToRetract = false;
	}
}
function KillBulletProcess(){
			Destroy(bullet.gameObject);
			bulletLive=false;
			line.enabled = false;
			line.SetVertexCount(0);
			RopeVertexes = new List.<Transform>();
			hookIsRetracting = false;
			hookIsStuck = false;
			hookIsShooting=false;
			movement.SetHookShotIsStuck(false,Vector3.zero,0);
			trailPositions = new Array();
			replayCounter=0;
			readyToFire = true;
}

function Shoot(){
	bullet = Instantiate(HookShotTip, muzzleTransform.position, Quaternion.identity);
	trail = bullet.GetComponent(TrailRenderer);
    bullet.rigidbody.AddForce(transform.forward * shotSpeed,ForceMode.Impulse);
    bulletLive = true;
    line.enabled = true;
    aimLocationForLine = muzzleTransform.position;
	tipScript = bullet.GetComponent.<HookShotTipScript>();
	audio.PlayOneShot(FireSound);
	timeAtShot = Time.time;

	
	

}
function Start () {
	line = gameObject.GetComponent(LineRenderer); 
	line.SetVertexCount(1);
	movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();	
	soundSource = gameObject.AddComponent(AudioSource);
	soundSource.rolloffMode = AudioRolloffMode.Linear;
	cameraa = GameObject.Find("Camera Rig").GetComponent.<Camera>();
	muzzleTransform = transform.Find("Muzzle");
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







