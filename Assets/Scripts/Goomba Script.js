#pragma strict

var walkSpeed     : float = 35.0;
var runSpeed      : float = 35.0;
var accel         : float = 1;
var walkJump      : float = 20;
var runJump       : float = 20;
var gravity       : float = 20.0;
var lethalSpeed   : float = 75;
var pushPower     : float = 3;
var chaseColor    : Color;





private var distanceToPlayer : float;
var range : float = 60;

var Player : Transform;
//private var currSpeedX: float = 0;
//private var currSpeedY: float = 0;
private var currSpeed : Vector3;
private var moveDirection : Vector3 = Vector3.zero;
private var isStillJumping: boolean;
private var isJumping : boolean;
private var isRunning : boolean;
private var isAirborn : boolean;
private var collisionAngle : Vector3 = Vector3(0,1,0);
private var isOnLeftWall : boolean = false;
private var isOnRightWall : boolean = false;
private var isWallJumping : boolean = false;
private var lastTimeOnWall : float;
private var timeTouchingSomething : float;
private var timeTouchingTheFloor : float;
private var isTouchingFloor  :boolean;
private var isTouchingSomething : boolean;
private var speedMax: float = 0;
private var jumpMax :float = walkJump;
private var horizontalInput : float;
private var totalSpeed: float;
private var deadIsSet : boolean = false;




private var lightOnGoomba : Light;
private var controller : CharacterController;



function Start () {
	controller = GetComponent(CharacterController);
	lightOnGoomba  = GetComponent(Light);
	Player = GameObject.Find("Player").transform;
	//for(var child : Transform in this){
	//	Physics.IgnoreCollision(controller.collider, child.collider);
	//}


}

function Update () {
	
	transform.position.z=0;

	if(!this.tag.Contains("DissabledEnemy")){
		if(lightOnGoomba){
			light.color =(Color.green);
		}
		distanceToPlayer = Vector3.Distance(transform.position, Player.transform.position);
			

			if(isTouchingSomething){
			isStillTouchingSomething();
		}
		currSpeed = controller.velocity;

		getInputs();
		handleHorizontal();
		handleJumps();
		applyGravity();
   		moveDirection = currSpeed;
   		moveDirection = transform.TransformDirection(moveDirection);
   		controller.Move(moveDirection * Time.deltaTime);
		

		}else{
			if(!deadIsSet){
			horizontalInput = 0;
			isJumping = false;
				if(lightOnGoomba){
					light.color =(Color.magenta);
					light.intensity = 1;
					Destroy(GetComponent(CharacterController));
					GetComponent(Rigidbody).useGravity = true;
					GetComponent(Rigidbody).isKinematic = false;
					gameObject.AddComponent(SphereCollider);
					var sphere : SphereCollider = gameObject.GetComponent(SphereCollider);
					Destroy(gameObject,5);
					//sphere.radius = 4;
				}
			
			
			deadIsSet = true; // code that sets enemy to dead state only runs once.
			}
		}
		
		
   		//////print(currSpeed);
    
}
function applyGravity(){
	if(isStillJumping){
		
    	currSpeed.y -= 0.5*gravity* Time.deltaTime;
    }else if(isOnLeftWall||isOnRightWall){
    	if(currSpeed.y < -10){
    		currSpeed.y = currSpeed.y/1.02;
    	}else if(isOnLeftWall){
    		currSpeed -= Vector3.Cross(collisionAngle,Vector3.back)*0.7* gravity * Time.deltaTime;
		}else if(isOnRightWall){
    		currSpeed -= Vector3.Cross(collisionAngle,Vector3.forward)*0.7* gravity * Time.deltaTime;
		}
    //apply gravityies
    }else{
    	currSpeed.y -= gravity * Time.deltaTime;
    }
   
    
}


function handleJumps(){
	if (isRunning){
		jumpMax = runJump + System.Math.Abs(currSpeed.x)*0.3;
	}else{
		jumpMax = walkJump+ System.Math.Abs(currSpeed.x)*0.3;
	}
	
	if (isJumping && isTouchingFloor) {
	
    	isStillJumping = true;
    	isTouchingFloor = false;
    	isAirborn = true;
    	isJumping = false;
		currSpeed += collisionAngle*jumpMax;
       //	JumpSoundSource.PlayOneShot(jumpClip);
       

///////////////////////////Horizontal Aspect of Wall Jump
    }else if(isJumping  && isOnLeftWall){
    	isWallJumping = true;
    	isOnLeftWall = false;
    	if(currSpeed.y < 0){
    		currSpeed.y = 0;
    		currSpeed += Vector3.Lerp(collisionAngle,Vector3.up,0.4)*jumpMax;
			
    	}else{
    		currSpeed += Vector3.Lerp(collisionAngle,Vector3.up,0.5)*jumpMax;
    		currSpeed.x = jumpMax;
    	}
    }else if(isJumping && isOnRightWall){
    	isWallJumping = true;
    	isOnRightWall = false;
    	if(currSpeed.y < 0){
    		currSpeed.y = 0;
    		currSpeed += Vector3.Lerp(collisionAngle,Vector3.up,0.4)*jumpMax;
    	}else{
    		currSpeed += Vector3.Lerp(collisionAngle,Vector3.up,0.5)*jumpMax;
    		currSpeed.x = -jumpMax;
		}
    }
    if(isWallJumping){
		//////////////////////////Vertical PArt
    //	JumpSoundSource.PlayOneShot(jumpClip);
    	isStillJumping = true;
    	isWallJumping = false;
    	isJumping = false;

    }
   
}
	

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function handleHorizontal(){
		//	Debug.DrawRay (transform.position, collisionAngle*10, Color.green);
		//	Debug.DrawRay (transform.position, Vector3.right*10, Color.green);
		//	Debug.DrawRay (transform.position, Vector3.Lerp(collisionAngle,Vector3.left,0.5)*10, Color.black);
		//	Debug.DrawRay (transform.position, Vector3.Cross(collisionAngle,Vector3.forward)*10, Color.red);
		//	Debug.DrawRay (transform.position, Vector3.Lerp(collisionAngle,Vector3.up,0.5)*10, Color.blue);

	if (isRunning){
    	speedMax = runSpeed;
    }else{
   		speedMax = walkSpeed;
    }
	if(isTouchingFloor){
	//print(horizontalInput);

	//////print("acting as if touching floor");
		if(Mathf.Abs(horizontalInput)  > 0.1){
			if(currSpeed.magnitude < speedMax){
				currSpeed += Vector3.Cross(collisionAngle,Vector3.forward)*horizontalInput * accel;
			}else if(currSpeed.magnitude >= speedMax){
				if(currSpeed.x > 0 && horizontalInput < 0){
					currSpeed +=  Vector3.Cross(collisionAngle,Vector3.forward)*horizontalInput * accel;
				}else if(currSpeed.x < 0 && horizontalInput > 0){
					currSpeed +=  Vector3.Cross(collisionAngle,Vector3.forward)*horizontalInput * accel;
				}	
			}
		}else if(Mathf.Abs(currSpeed.x) > 2){
   			currSpeed.x = currSpeed.x * .75;
   		}else{
    		currSpeed.x = 0;
   		}



			//////////////print("1");
				
		
			
	}else if(isAirborn){
	//////////print("airborn");
	isJumping = false;

		if(Mathf.Abs(horizontalInput)  > 0.1){
			if(Mathf.Abs(currSpeed.x) < speedMax){
				currSpeed.x += horizontalInput*accel;
   			}else if(currSpeed.x > 0 && horizontalInput < 0){
				currSpeed.x += horizontalInput * accel;
			}else if(currSpeed.x < 0 && horizontalInput > 0){
				currSpeed.x += horizontalInput * accel;
			}	
   		}
   	}else if(isOnLeftWall||isOnRightWall){
   			
   	////////////print("touching a wall");
   		if(Mathf.Abs(horizontalInput)  > 0.1){
   			currSpeed.x +=  horizontalInput;

   		}
   	}
   	
   	
   	
   	// if(isTouchingFloor){
    	//if(Time.time - soundLoopTime > 6/Mathf.Abs(currSpeed.x)){
    	//	RunSoundSource.PlayOneShot(runClip);
    	//	soundLoopTime = Time.time;
    	//}
    	//trail.time = (System.Math.Abs(currSpeed.x) + System.Math.Abs(currSpeed.y))/60;
   //	}else{
   	//	trail.time = System.Math.Max(System.Math.Abs(currSpeed.x) + System.Math.Abs(currSpeed.y)/60,1);

   //	}

}
function getInputs(){
	if(distanceToPlayer < range){
	//	lightOnGoomba.color = Color.Lerp(Color.yellow, chaseColor,1/distanceToPlayer*10);
	lightOnGoomba.color = chaseColor;

		if(Player.transform.position.x - transform.position.x < 0){
			horizontalInput = -1;
		}else if(Player.transform.position.x - transform.position.x > 0){
			horizontalInput = 1;
		}
	//////print(horizontalInput);
		if(Player.transform.position.y - transform.position.y > -5){
    		isJumping = true;
    	}else{
    		isStillJumping = false;
    	}
    
    }else{
    	horizontalInput = 0; 
    	isJumping = false;
    }
    

}
//physics hack to detect collision exit from walls
function isStillTouchingSomething(){
	if(isOnLeftWall || isOnRightWall){
		if(Time.time - lastTimeOnWall > .4){
			isOnLeftWall = false;
			isOnRightWall = false;
		}else{
			isAirborn = false;
			//isStillJumping = false;

		}	
	}else if(isTouchingFloor){
		if(Time.time-timeTouchingTheFloor  > 0.1){
			isTouchingFloor = false;
		}else{
			isAirborn = false;
			//isStillJumping = false;

		}
	}else if(isTouchingSomething){
		if(Time.time - timeTouchingSomething > 0.1){
			isTouchingSomething = false;
			isAirborn = true;
			//isStillJumping = false;

		}
	}	
}

function whatAmITouching(){
	if(collisionAngle.x > .9){
		isOnLeftWall = true;
		isOnRightWall = false;
		isTouchingFloor = false;
		lastTimeOnWall = Time.time;
		//if(Player.transform.position.y - transform.position.y < -20){
		//	isJumping = true;
		//}
		//////////print("touchingLeft");
	}else if(collisionAngle.x < -.9){
		isOnRightWall = true;
		isOnLeftWall = false;
		isTouchingFloor = false;
		lastTimeOnWall = Time.time;
		//if(Player.transform.position.y - transform.position.y < -20){
		//isJumping = true;
		//}
		//////////print("touchingRight");
	}else if(Mathf.Abs(collisionAngle.x) < 0.9){
		isOnLeftWall = false;
		isOnRightWall = false;
		isTouchingFloor  = true;
		timeTouchingTheFloor = Time.time;
		//////////print("touchingFloor");
	} if(collisionAngle.y < -.1 ){
		isOnLeftWall = false;
		isOnRightWall = false;
		isTouchingFloor  = false;
		isJumping = false;

		//////////print("touchingCeiling");
	}
}



function OnControllerColliderHit (hit : ControllerColliderHit) {
	isTouchingSomething = true;
	isStillJumping = false;
	timeTouchingSomething = Time.time;
	collisionAngle = hit.normal;
	whatAmITouching();
	
	

	////print(hit.gameObject.name);
}//tell physics to ignore own colliders!
	
