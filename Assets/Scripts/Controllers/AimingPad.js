#pragma strict
private var movement : PlayerMovement;
private var retical : GameObject;
private var reticalScript : ReticalScript;
private var center : Vector3;
private var GUIControler : ControllerUI; 

function Start () {
	movement = GameObject.Find("Player").GetComponent.<PlayerMovement>();
	retical = movement.GetRetical();
	reticalScript = retical.GetComponent.<ReticalScript>();
	center = Vector3.zero;
	GUIControler = GameObject.Find("Level Essentials").GetComponent.<ControllerUI>();

}
function setCenter(newCenter:Vector3){
	center = newCenter;
}
function FixedUpdate(){
	setCenter(Vector3(guiTexture.pixelInset.x + guiTexture.pixelInset.width/2,guiTexture.pixelInset.y + guiTexture.pixelInset.height/2,0));
}
function Update() {
	var misses 	: int = 0;
    var count 	: int = Input.touchCount;
   	for(var i	: int = 0;i < count; i++){//for multi touch
        var touch : Touch = Input.GetTouch(i);
        if(guiTexture.HitTest(touch.position)){
        	//GUIControler.setIsRelativeAiming();
			

        	var tou = touch.position;
  			tou = tou - center;
  			tou.y *= 2;
  			tou.x*=1.2;
   			reticalScript.adjustPosition(true,(tou)/2);
   			if(movement.getActiveRig().Equals("GunRig")){
        		movement.setIsFire1ing(true);
        	}
        	if(touch.phase == TouchPhase.Ended){
        		//GUIControler.showControls();

        		reticalScript.adjustPosition(true,(tou)/2);
        		if(movement.getActiveRig().Equals("GunRig")){
        			movement.setIsFire1ing(false);
        		}
        	}
   		 }else{
   		 	misses++;
   		 }
    }
    if(misses == count && reticalScript.getAdjusting()){
    	//GUIControler.showControls();

    	if(movement.getActiveRig().Equals("GunRig")){
    	   	movement.setIsFire1ing(false);
    	}
    	reticalScript.adjustPosition(false,(tou)/2);
    }
    if(reticalScript.getAdjusting()){
   		guiTexture.color = Color.gray;
   		guiTexture.color.a = .35;
   	}else{
   		guiTexture.color = Color.gray;
   		guiTexture.color.a = .15;
   	}
   	//if(movement.getPCDebugging()){
  // 	if(guiTexture.HitTest(Input.mousePosition)){
   	   // GUIControler.setIsRelativeAiming();


  	//	var mous = Input.mousePosition;
  	//	mous = mous - center;
  	//	mous.y *=2;
  	//	mous.x*=1.2;
  	//	mous.z=0;
   	//	reticalScript.adjustPosition(true,(mous)/2);
   	//	if(movement.getActiveRig().Equals("GunRig")){
   	//		movement.setIsFire1ing(true);
   	//	}
   		//print("Adjusting Sent");
   	//}else{
   	//	if(movement.getActiveRig().Equals("GunRig")){
   //			movement.setIsFire1ing(false);
   	//	}
   		    	//GUIControler.showControls();


  // 	}
   	//}
   	
}