#pragma strict
private var movement : PlayerMovement;
function Start () {
	movement = GameObject.Find("Player").GetComponent("PlayerMovement");
	
}
function Update() {
	
 if(movement.getPCDebugging()){
   		if((Input.GetMouseButtonDown(0)&& guiTexture.HitTest(Input.mousePosition)) || Input.GetKeyDown(KeyCode.Escape)){
   			if(!movement.getIsInMenuMode()){
  				movement.EnterMenuMode();
  			}else{
  				movement.EnterGameMode();
  				movement.ExitPauseMode();
  			}
   		}
   }else{
	var misses : int = 0;
    var count : int = Input.touchCount;
   	 for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(guiTexture.HitTest(touch.position)){
        	if(touch.phase == TouchPhase.Began){
            	if(!movement.getIsInMenuMode()){
        			movement.EnterMenuMode();
        		}
        	}
   		 }else{
   		 	misses++;
   		 }
    }
    }
   
    if(movement.getIsInMenuMode()){
    	guiTexture.color = Color.blue;
    	guiTexture.color.a = .35;
     }else{
    	guiTexture.color = Color.gray;
    	guiTexture.color.a = .10;
     }

}