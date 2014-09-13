#pragma strict
private var movement : PlayerMovement;
function Start () {
	movement = GameObject.Find("Player").GetComponent("PlayerMovement");
}
function Update() {
	//if(movement.getIsInGameMode){
	if(movement.getPCDebugging()){
    if(Input.GetMouseButtonDown(0)){
   		movement.setIsFire1ing(true);
    }
    if(Input.GetMouseButtonUp(0)){
    	movement.setIsFire1ing(false);
    }
    }else{
	var misses : int = 0;
    var count : int = Input.touchCount;
   	 for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(guiTexture.HitTest(touch.position)){
        	if(touch.phase == TouchPhase.Began){
            	movement.setIsFire1ing(true);
        	}else if(touch.phase == TouchPhase.Ended){
        		movement.setIsFire1ing(false);
        	}
   		 }else{
   		 	misses++;
   		 }
    }
   

    if(movement.getIsFire1ing() && misses==count){
    	movement.setIsFire1ing(false);
    
    }
    }
    
   

    if(movement.getIsFire1ing()){
    	guiTexture.color = Color.gray;
    	guiTexture.color.a = .35;
     }else{
    	guiTexture.color = Color.gray;
    	guiTexture.color.a = .15;
     }


    
}