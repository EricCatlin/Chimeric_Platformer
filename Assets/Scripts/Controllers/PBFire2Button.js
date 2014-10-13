#pragma strict
private var movement : PlayerMovement;
function Start () {
	movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();
}

function Update() {
	var misses : int = 0;
    var count : int = Input.touchCount;
   	 for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(guiTexture.HitTest(touch.position)){
        	if(touch.phase == TouchPhase.Began){
            	movement.setIsFire2ing(true);
        	}else if(touch.phase == TouchPhase.Ended){
        		movement.setIsFire2ing(false);
        	}
   		 }else{
   		 	misses++;
   		 }
    }
    if(movement.getIsFire2ing() && misses==count){
    	movement.setIsFire2ing(false);
    }
    if(movement.getPCDebugging()){
    if(Input.GetMouseButton(1)){
  		movement.setIsFire2ing(true);
   	}
   	if(Input.GetMouseButtonUp(1)){
    	movement.setIsFire2ing(false);
    }
    }
    if(movement.getIsFire2ing()){
   		guiTexture.color = Color.gray;
    	guiTexture.color.a = .35;
     }else{
    	guiTexture.color = Color.gray;
    	guiTexture.color.a = .15;
     }
}