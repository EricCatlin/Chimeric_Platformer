#pragma strict
private var movement : PlayerMovement;
private var ready : boolean = false;
function Start () {
	movement = GameObject.Find("Player").GetComponent("PlayerMovement");
}
function Update() {

 if(movement.getPCDebugging()){
    if(guiTexture.HitTest(Input.mousePosition)&&Input.GetMouseButtonDown(0) && movement.getIsInAimMode()){ 
    	 movement.EnterGameMode();
   }else if(guiTexture.HitTest(Input.mousePosition)&&Input.GetMouseButtonDown(0) && movement.getIsInGameMode() && movement.getGameIsPaused()){
    	movement.ExitPauseMode();
     } 
     }
else{
	if(ready && Input.touchCount == 0){
		ready = true;
	}
	var misses : int = 0;
    var count : int = Input.touchCount;
   	 for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(guiTexture.HitTest(touch.position)){
        	if(touch.phase == TouchPhase.Began){
        		if(!movement.getIsInGameMode()){
        			movement.EnterGameMode();
        		}else if(movement.getIsInGameMode() && movement.getGameIsPaused()){
        			movement.ExitPauseMode();
        		}
        	}
   		 }
    }
   }


    if(movement.getIsInGameMode() && !movement.getGameIsPaused()){
     	guiTexture.color = Color.grey;
    	guiTexture.color.a = .10;
    		
		guiText.text="";

    }else if(movement.getIsInGameMode() && movement.getGameIsPaused()){
    	guiTexture.color = Color.green;
    	guiTexture.color.a = .35;
   ;	
		guiText.text="Un-pause";
    }else if(!movement.getIsInGameMode()){
    	guiText.text="Return To Game";

    	guiTexture.color = Color.yellow;
    	guiTexture.color.a = .35;
	
     }
}