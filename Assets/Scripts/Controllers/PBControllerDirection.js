#pragma strict
private var movement : PlayerMovement;

function Start () {
	movement = GameObject.Find("Player").GetComponent("PlayerMovement");
}

function Update() {
	
    var count : int = Input.touchCount;
    var misses : int = 0;
   	 for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(guiTexture.HitTest(touch.position)){
        	if(touch.phase == TouchPhase.Began){
        		movement.setIsPressingLeft(false);
            	movement.setIsPressingRight(false);
            	movement.setIsPressingDown(false);
            	movement.setIsPressingUp(false);
        	}else if(touch.phase == TouchPhase.Moved ){
        		if(touch.deltaPosition.x > 3){
        			movement.setIsPressingRight(true);
        			movement.setIsPressingLeft(false);
        		}else if(touch.deltaPosition.x < -3){
            		movement.setIsPressingLeft(true);
            		movement.setIsPressingRight(false);
            	}
            	if(touch.deltaPosition.y < -3){
            		movement.setIsPressingDown(true);
            		movement.setIsPressingUp(false);
            	}else if(touch.deltaPosition.y > 3){
            		movement.setIsPressingDown(false);
            		movement.setIsPressingUp(true);
            	}
        	}else if(touch.phase == TouchPhase.Ended){
        		movement.setIsPressingDown(false);
        		movement.setIsPressingLeft(false);
        		movement.setIsPressingRight(false);
        		movement.setIsPressingUp(false);
        	}
   		 }else{
   		 	misses++;
   		 }
    }
    if(misses == count){
    	movement.setIsPressingDown(false);
        movement.setIsPressingLeft(false);
        movement.setIsPressingRight(false);
        movement.setIsPressingUp(false);
    }
}