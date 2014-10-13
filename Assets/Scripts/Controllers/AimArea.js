#pragma strict
private var movement : PlayerMovement;
private var cam : Camera;
private var camScript : CameraFollowBetter;
private var reticalScript : ReticalScript;
private var GUIController : ControllerUI;
private var retical : GameObject;
private var readyToExitAim:boolean;
private var timeAtFrame : float;
private var timeAtPreviousFrame : float;
private var menuButton : GameObject;
private var gameButton : GameObject;
private var aimButton : GameObject;
private var upButton : GameObject;
private var leftButton : GameObject;
private var rightButton : GameObject;
private var aimPad : GameObject;
private var downButton : GameObject;
private var fire1 : GameObject;
private var fire2 : GameObject;
private var AimInterceptor : GameObject;




private var hitsArray : int[] = new int[2];

function Start () {
	movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();
	retical = movement.GetRetical();
	reticalScript = retical.GetComponent.<ReticalScript>();
	GUIController = GameObject.Find("Level Essentials").GetComponent.<ControllerUI>();
	cam = GameObject.FindObjectOfType(Camera);
	camScript = cam.GetComponent.<CameraFollowBetter>();
	gameButton = GameObject.Find("GameButton");
	menuButton = GameObject.Find("MenuButton");
	AimInterceptor = GameObject.Find("AimInterceptor");

	
	aimButton = GameObject.Find("AimButton");
	leftButton = GUIController.getLeftButton();

	rightButton = GUIController.getRightButton();

	upButton = GUIController.getUpButton();

	downButton = GUIController.getDownButton();

	aimPad = GUIController.getAimPad();
	fire1 = GUIController.getFire1();
	fire2 = GUIController.getFire2();;



}

function Update() {
	timeAtFrame = Time.realtimeSinceStartup;
	
	if(movement.getPCDebugging()){
	 	if(!movement.getIsInMenuMode() ){
	 
	 	var hit: RaycastHit;
		var ray = cam.ScreenPointToRay(Input.mousePosition);
		Debug.DrawRay(ray.origin,ray.origin+ray.direction*5000);
		
		if (AimInterceptor.collider.Raycast(ray, hit,5000)) {
				
//			print(hit.point + "     HP");
  			reticalScript.MousePos(hit.point);
   		}
   	}
  }else{
  
  
  
	var hits : int = 0;
	hitsArray = new int[2];
    var count : int = Input.touchCount;
   	for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if((!movement.getIsInMenuMode()// && guiTexture.HitTest(touch.position)) 
     //   && !(menuButton.guiTexture.HitTest(touch.position) 
     //   || gameButton.guiTexture.HitTest(touch.position)
       // || aimButton.guiTexture.HitTest(touch.position) 
       // || (leftButton.active 	&& leftButton.guiTexture.HitTest(touch.position)) 
       // || (rightButton.active 	&& rightButton.guiTexture.HitTest(touch.position)) 
       // || (upButton.active 	&& upButton.guiTexture.HitTest(touch.position)) 
        //|| (downButton.active 	&& downButton.guiTexture.HitTest(touch.position))
        //|| (aimPad.active 		&& aimPad.guiTexture.HitTest(touch.position))
       // || (fire1.active 		&& fire1.guiTexture.HitTest(touch.position))
       // || (fire2.active 		&& fire2.guiTexture.HitTest(touch.position))
        )){
        	hits++;
        	if(hitsArray[0] == null){
        		hitsArray[0]=i;
        	}else if(hitsArray[1] == null){
        		hitsArray[1]=i;
        	}
        }
      }
      if(hits == 1){
      	touch = Input.GetTouch(hitsArray[0]);
        if(touch.phase == TouchPhase.Began){
        	//reticalScript.setGUITextureIO(true);
        	reticalScript.setReticalLockedAtPoint(cam.ScreenToWorldPoint(touch.position));
        	if(!movement.getIsInAimMode()){
         		movement.EnterAimMode();
         	}
   		}else if(touch.phase == TouchPhase.Moved && movement.getIsInAimMode()){
        		reticalScript.setReticalLockedAtPoint(cam.ScreenToWorldPoint(touch.position));
        }else if(touch.phase == TouchPhase.Ended){
   			//////////////////////////////////////			
   			//////////////////////////////////////
			movement.EnterGameMode();
    	}
   	}
   	else if(hits > 1){
   		var touch1 = Input.GetTouch(hitsArray[0]);
   		var touch2 = Input.GetTouch(hitsArray[1]);
    }
    timeAtPreviousFrame = timeAtFrame;
    }
  }
  
   
  	

   
