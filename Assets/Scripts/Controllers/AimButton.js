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
        		if(!movement.getIsInAimMode()){
        			movement.EnterAimMode();
        		}
        	}
   		 }
    }
    if(movement.getPCDebugging()){
   if(guiTexture.HitTest(Input.mousePosition)&&Input.GetMouseButtonDown(0)){
   	        			movement.EnterAimMode();
   }
   }

    if(movement.getIsInAimMode()){
   	 	guiTexture.color = Color.blue;
    	guiTexture.color.a = .35;
     }else{
    	guiTexture.color = Color.gray;
    	guiTexture.color.a = .10;
     }
}