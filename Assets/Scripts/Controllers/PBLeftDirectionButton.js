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
        		movement.setIsPressingLeft(true);
        		if(movement.getGameIsPaused() && movement.getIsInGameMode()){
        			movement.ExitPauseMode();
        		}  
        	}else if(touch.phase == TouchPhase.Moved ){
        		movement.setIsPressingLeft(true);
        	}else if(touch.phase == TouchPhase.Ended){
        		movement.setIsPressingLeft(false);
        	}
   		 }else{
   		 	misses++;
   		 }
    }
    if(movement.getIsPressingLeft()  && misses == count){
    	movement.setIsPressingLeft(false);
    }
    if(movement.getPCDebugging()){
    
    if(Input.GetAxis("Horizontal")<-0.1){
    	movement.setIsPressingLeft(true);
    }
    }
    if(movement.getIsPressingLeft()){
    	guiTexture.color = Color.gray;
    	guiTexture.color.a = .35;
    }else if(movement.getIsInGameMode() && movement.getGameIsPaused()){
    	guiTexture.color = Color.green;
    	guiTexture.color.a = 0.35;
    }else{
    	guiTexture.color = Color.gray;
    	guiTexture.color.a = .15;
     }

}