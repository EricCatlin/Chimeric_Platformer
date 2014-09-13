#pragma strict
private var movement : PlayerMovement;
function Start () {
	movement = GameObject.Find("Player").GetComponent("PlayerMovement");
}

function Update() {
	var misses : int = 0;
    var count : int = Input.touchCount;
   	 for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(guiTexture.HitTest(touch.position)){
        	if(touch.phase == TouchPhase.Began){
        	if(movement.getGameIsPaused() && movement.getIsInGameMode()){
        			movement.ExitPauseMode();
        	} 
            	movement.setIsJumping(true);
            	movement.setLetGoOfJump(false);
            	 		
        	}else if(touch.phase == TouchPhase.Ended){
        		movement.setLetGoOfJump(true);
        	}
   		 }else{
   		 	misses++;
   		 }
    }
    if(movement.getIsPressingJump() && misses == count){
    	movement.setLetGoOfJump(true);
    }
    if(movement.getPCDebugging()){
    if(Input.GetButtonDown("Jump")){
    	movement.setIsJumping(true);
    	movement.setLetGoOfJump(false);
    }
   	if(Input.GetButtonUp("Jump")){
   		movement.setLetGoOfJump(true);
   	}
   	}
    if(movement.getIsPressingJump() || movement.getIsStillJumping()){
    	guiTexture.color = Color.grey;
    	guiTexture.color.a = .35;
    }else if(movement.getIsInGameMode() && movement.getGameIsPaused()){
    	guiTexture.color = Color.green;
    	guiTexture.color.a = 0.35;
    }else{
    	guiTexture.color = Color.gray;
     	guiTexture.color.a = .15;
     }


}     