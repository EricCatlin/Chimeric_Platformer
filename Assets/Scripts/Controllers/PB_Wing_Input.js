#pragma strict
private var movement : PlayerMovement;
private var isPressingThis : boolean;
//private var thisTouch : Touch;

function Start () {
	movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();
}

function Update() {
if(movement.getPCDebugging()){
   		if(Input.GetMouseButtonDown(0)&& guiTexture.HitTest(Input.mousePosition)){
			isPressingThis=true;
						movement.setIsFire1ing(false);

		}
		if(isPressingThis && Input.GetMouseButton(0) && guiTexture.HitTest(Input.mousePosition)){
									movement.setIsFire1ing(false);

		}
		if(Input.GetMouseButtonUp(0)&& !guiTexture.HitTest(Input.mousePosition)){
		isPressingThis = false;
		}
		

		
   		if(isPressingThis && (Input.GetMouseButtonUp(0)&& guiTexture.HitTest(Input.mousePosition)) && PlayerPrefs.GetInt("WingsUnlocked",0) == 1){
   			movement.setRig("WingRig");
    	movement.ActivateRig(); 
    				movement.setIsFire1ing(false);
      
   		}
   }else{
	var misses : int = 0;
    var count : int = Input.touchCount;
   	 for(var i: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(guiTexture.HitTest(touch.position)){
        	if(touch.phase == TouchPhase.Began){
            	movement.setRig("WingRig");
    			movement.ActivateRig();       
        	}
   		 }else{
   		 	misses++;
   		 }
    }
    }
   
    
     if(movement.getIsInGameMode() &&    PlayerPrefs.GetString("Rig") == "WingRig"){
    	guiTexture.color = Color.green;
    	guiTexture.color.a = 0.35;
    }else if(PlayerPrefs.GetInt("WingsUnlocked",0) == 1){
     	guiTexture.color = Color.gray;
    	guiTexture.color.a = .20;
    	}else{
    	guiTexture.color = Color.gray;
    	guiTexture.color.a = .05;
     }
}