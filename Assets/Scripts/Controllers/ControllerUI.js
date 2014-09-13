#pragma strict

private var movement : PlayerMovement;
 var up			: GameObject;
 var down 		: GameObject;
 var left 		: GameObject;
 var right		: GameObject;
 var jump 		: GameObject;
 var fire1 		: GameObject;
 var fire2 		: GameObject;
 var aimArea 	: GameObject;
 var joyStick   : GameObject;
 var AimState   : GameObject;
 var GameState  : GameObject;
 var MenuState  : GameObject;
 





function getFire1(){
return fire1;
}

function getFire2(){
return fire2;
}
function getAimPad(){
return joyStick;
}
function getDownButton(){
return down;
}
function getUpButton(){
	return up;
}
function getLeftButton(){
	return left;
}
function getRightButton(){
	return right;
}
function Start () {
	movement = GameObject.Find("Player").GetComponent("PlayerMovement");
	MenuState.SetActive(true);
	AimState.SetActive(!movement.getPCDebugging());	
	GameState.SetActive(!movement.getPCDebugging());	
	
	MenuState.guiTexture.pixelInset.x=Screen.width-(Screen.height/3);
	MenuState.guiTexture.pixelInset.y=Screen.height-(Screen.height/6);
	MenuState.guiTexture.pixelInset.width=(Screen.height/3);
	MenuState.guiTexture.pixelInset.height=(Screen.height/6);
	//MenuState.guiText.pixelOffset.x = MenuState.guiTexture.pixelInset.x;
	//MenuState.guiText.pixelOffset.y = Screen.height;
	//MenuState.guiText.material.color=Color.black;	
			
	GameState.guiTexture.pixelInset.x=Screen.width-(Screen.height/3*3);
	GameState.guiTexture.pixelInset.y=Screen.height-(Screen.height/6);
	GameState.guiTexture.pixelInset.width=(Screen.height/3);
	GameState.guiTexture.pixelInset.height=(Screen.height/6);	
	GameState.guiText.pixelOffset.x = GameState.guiTexture.pixelInset.x;
	GameState.guiText.pixelOffset.y = Screen.height;
	GameState.guiText.material.color=Color.black;
	GameState.guiText.text="";

	AimState.guiTexture.pixelInset.x=Screen.width-(Screen.height/3*2);
	AimState.guiTexture.pixelInset.y=Screen.height-(Screen.height/6);
	AimState.guiTexture.pixelInset.width=(Screen.height/3);
	AimState.guiTexture.pixelInset.height=(Screen.height/6);	
	//AimState.guiText.material.color=Color.black;
	//AimState.guiText.pixelOffset.x = AimState.guiTexture.pixelInset.x;
	//AimState.guiText.pixelOffset.y = Screen.height;


}

function setGun(){
	up.SetActive(false);
	down.SetActive(true);
	left.SetActive(true);
	right.SetActive(true);
	jump.SetActive(true);
	fire1.SetActive(true);
	fire2.SetActive(true);
	aimArea.SetActive(true);
	joyStick.SetActive(true);

	//AimArea
	standardAimArea();
	if(!movement.getPCDebugging()){	


	//JumpButton
	jump.guiTexture.pixelInset.x = Screen.width - (0.20*Screen.width);
	jump.guiTexture.pixelInset.width = 0.20*Screen.width;
	jump.guiTexture.pixelInset.y = 0 ;
	jump.guiTexture.pixelInset.height = 0.20*Screen.width;

	/////////////////////
	left.guiTexture.pixelInset.x = 0;
	left.guiTexture.pixelInset.width = (0.15*Screen.width);
	left.guiTexture.pixelInset.y = 0.10*Screen.width;
	left.guiTexture.pixelInset.height =(0.15*Screen.width);

	//right
	right.guiTexture.pixelInset.x = (0.15*Screen.width);
	right.guiTexture.pixelInset.width = (0.15*Screen.width);
	right.guiTexture.pixelInset.y = 0.10*Screen.width;
	right.guiTexture.pixelInset.height = (0.15*Screen.width);

	//down
	down.guiTexture.pixelInset.x = .1*Screen.width;
	down.guiTexture.pixelInset.width = Screen.width*.10;
	down.guiTexture.pixelInset.y = 0;
	down.guiTexture.pixelInset.height = 0.10*Screen.width;


	///////
	joyStick.guiTexture.pixelInset.x = Screen.width*.6 ;
	joyStick.guiTexture.pixelInset.width = Screen.width/5;
	joyStick.guiTexture.pixelInset.y = 0;
	joyStick.guiTexture.pixelInset.height = (0.2*Screen.width);
	///////////
	fire2.guiTexture.pixelInset.x =  0.3*Screen.width;
	fire2.guiTexture.pixelInset.width = (0.15*Screen.width);
	fire2.guiTexture.pixelInset.y = 0;
	fire2.guiTexture.pixelInset.height = (0.15*Screen.width);
	//fire2
	fire1.guiTexture.pixelInset.x = 0.45*Screen.width;
	fire1.guiTexture.pixelInset.width = (0.15*Screen.width);
	fire1.guiTexture.pixelInset.y = 0;
	fire1.guiTexture.pixelInset.height = (0.15*Screen.width);
}else{
		set_controls_hidden();
	}

}

function standardAimArea(){
if(movement!=null){
	if(movement.getPCDebugging()){	
	aimArea.guiTexture.pixelInset.x=0;
	aimArea.guiTexture.pixelInset.y = 0;
	aimArea.guiTexture.pixelInset.width = Screen.width;
	aimArea.guiTexture.pixelInset.height = Screen.height;
	
	}else{
	aimArea.guiTexture.pixelInset.x=Screen.width/3;
	aimArea.guiTexture.pixelInset.y = (Screen.height/4);
	aimArea.guiTexture.pixelInset.width = Screen.width/3;
	aimArea.guiTexture.pixelInset.height = (Screen.height/2);
	}
	}else{
		movement = GameObject.Find("Player").GetComponent("PlayerMovement");
		standardAimArea();
	}

}
function setIsRelativeAiming(){
	aimArea.SetActive(false);
	joyStick.SetActive(true);
	fire1.SetActive(true);
	fire2.SetActive(true);
	joyStick.guiTexture.pixelInset.x = Screen.width*.45 ;
	joyStick.guiTexture.pixelInset.width = Screen.width/5;
	joyStick.guiTexture.pixelInset.y = 0;
	joyStick.guiTexture.pixelInset.height = (0.2*Screen.width);
	
	fire2.guiTexture.pixelInset.x =  0.25*Screen.width;
	fire2.guiTexture.pixelInset.width = Screen.width*.1;
	fire2.guiTexture.pixelInset.y = 0;
	fire2.guiTexture.pixelInset.height = (0.1*Screen.width);
	fire1.guiTexture.pixelInset.x =  0.25*Screen.width;
	fire1.guiTexture.pixelInset.width = Screen.width*.1;
	fire1.guiTexture.pixelInset.y = Screen.width*.1;
	fire1.guiTexture.pixelInset.height = (0.1*Screen.width);





}
function setPortals(){
	up.SetActive(false);
	down.SetActive(true);
	left.SetActive(true);
	right.SetActive(true);
	jump.SetActive(true);
	fire1.SetActive(true);
	fire2.SetActive(true);
	aimArea.SetActive(true);
	joyStick.SetActive(true);

	//AimArea
	standardAimArea();
	if(!movement.getPCDebugging()){	


	//JumpButton
	jump.guiTexture.pixelInset.x = Screen.width - (0.20*Screen.width);
	jump.guiTexture.pixelInset.width = 0.20*Screen.width;
	jump.guiTexture.pixelInset.y = 0 ;
	jump.guiTexture.pixelInset.height = 0.20*Screen.width;


	//left
	left.guiTexture.pixelInset.x = 0;
	left.guiTexture.pixelInset.width = (0.15*Screen.width);
	left.guiTexture.pixelInset.y = 0.10*Screen.width;
	left.guiTexture.pixelInset.height =(0.15*Screen.width);

	//right
	right.guiTexture.pixelInset.x = (0.15*Screen.width);
	right.guiTexture.pixelInset.width = (0.15*Screen.width);
	right.guiTexture.pixelInset.y = 0.10*Screen.width;
	right.guiTexture.pixelInset.height = (0.15*Screen.width);

	//down
	down.guiTexture.pixelInset.x = .1*Screen.width;
	down.guiTexture.pixelInset.width = Screen.width*.10;
	down.guiTexture.pixelInset.y = 0;
	down.guiTexture.pixelInset.height = 0.10*Screen.width;

	//fire1
	joyStick.guiTexture.pixelInset.x = Screen.width*.6 ;
	joyStick.guiTexture.pixelInset.width = Screen.width/5;
	joyStick.guiTexture.pixelInset.y = 0;
	joyStick.guiTexture.pixelInset.height = (0.2*Screen.width);
	///////////
	fire2.guiTexture.pixelInset.x =  0.3*Screen.width;
	fire2.guiTexture.pixelInset.width = (0.15*Screen.width);
	fire2.guiTexture.pixelInset.y = 0;
	fire2.guiTexture.pixelInset.height = (0.15*Screen.width);
	//fire2
	fire1.guiTexture.pixelInset.x = 0.45*Screen.width;
	fire1.guiTexture.pixelInset.width = (0.15*Screen.width);
	fire1.guiTexture.pixelInset.y = 0;
	fire1.guiTexture.pixelInset.height = (0.15*Screen.width);
}else{
		set_controls_hidden();
	}

}

function setHookShot(){
	up.SetActive(true);
	down.SetActive(true);
	left.SetActive(true);
	right.SetActive(true);
	jump.SetActive(true);
	fire1.SetActive(true);
	fire2.SetActive(true);
	aimArea.SetActive(true);
	joyStick.SetActive(true);
	//AimArea
	standardAimArea();

	if(!movement.getPCDebugging()){	
	//JumpButton
	jump.guiTexture.pixelInset.x = Screen.width - (0.20*Screen.width);
	jump.guiTexture.pixelInset.width = 0.20*Screen.width;
	jump.guiTexture.pixelInset.y = 0 ;
	jump.guiTexture.pixelInset.height = 0.20*Screen.width;


//	up
	up.guiTexture.pixelInset.x = .1*Screen.width;
	up.guiTexture.pixelInset.width = (0.1*Screen.width);
	up.guiTexture.pixelInset.y = (0.25*Screen.width);
	up.guiTexture.pixelInset.height = (0.1*Screen.width);
	//left
	left.guiTexture.pixelInset.x = 0;
	left.guiTexture.pixelInset.width = (0.15*Screen.width);
	left.guiTexture.pixelInset.y = 0.10*Screen.width;
	left.guiTexture.pixelInset.height =(0.15*Screen.width);

	//right
	right.guiTexture.pixelInset.x = (0.15*Screen.width);
	right.guiTexture.pixelInset.width = (0.15*Screen.width);
	right.guiTexture.pixelInset.y = 0.10*Screen.width;
	right.guiTexture.pixelInset.height = (0.15*Screen.width);

	//down
	down.guiTexture.pixelInset.x = .1*Screen.width;
	down.guiTexture.pixelInset.width = Screen.width*.10;
	down.guiTexture.pixelInset.y = 0;
	down.guiTexture.pixelInset.height = 0.10*Screen.width;

	//fire1
	joyStick.guiTexture.pixelInset.x = Screen.width*.6 ;
	joyStick.guiTexture.pixelInset.width = Screen.width/5;
	joyStick.guiTexture.pixelInset.y = 0;
	joyStick.guiTexture.pixelInset.height = (0.2*Screen.width);
	///////////
	fire2.guiTexture.pixelInset.x =  0.3*Screen.width;
	fire2.guiTexture.pixelInset.width = (0.15*Screen.width);
	fire2.guiTexture.pixelInset.y = 0;
	fire2.guiTexture.pixelInset.height = (0.15*Screen.width);
	//fire2
	fire1.guiTexture.pixelInset.x = 0.45*Screen.width;
	fire1.guiTexture.pixelInset.width = (0.15*Screen.width);
	fire1.guiTexture.pixelInset.y = 0;
	fire1.guiTexture.pixelInset.height = (0.15*Screen.width);
	}else{
		set_controls_hidden();
	}

}
function set_controls_hidden(){
//JumpButton
	jump.guiTexture.pixelInset.x =0;
	jump.guiTexture.pixelInset.width = 0;
	jump.guiTexture.pixelInset.y = 0 ;
	jump.guiTexture.pixelInset.height = 0;


//	up
	up.guiTexture.pixelInset.x = 0;
	up.guiTexture.pixelInset.width = 0;
	up.guiTexture.pixelInset.y = 0;
	up.guiTexture.pixelInset.height = 0;
	//left
	left.guiTexture.pixelInset.x = 0;
	left.guiTexture.pixelInset.width = 0;
	left.guiTexture.pixelInset.y = 0;
	left.guiTexture.pixelInset.height =0;

	//right
	right.guiTexture.pixelInset.x = 0;
	right.guiTexture.pixelInset.width = 0;
	right.guiTexture.pixelInset.y =0;
	right.guiTexture.pixelInset.height = 0;

	//down
	down.guiTexture.pixelInset.x = 0;
	down.guiTexture.pixelInset.width = 0;
	down.guiTexture.pixelInset.y = 0;
	down.guiTexture.pixelInset.height = 0;

	//fire1
	joyStick.guiTexture.pixelInset.x =0;
	joyStick.guiTexture.pixelInset.width = 0;
	joyStick.guiTexture.pixelInset.y = 0;
	joyStick.guiTexture.pixelInset.height = 0;
	///////////
	fire2.guiTexture.pixelInset.x =  0;
	fire2.guiTexture.pixelInset.width = 0;
	fire2.guiTexture.pixelInset.y = 0;
	fire2.guiTexture.pixelInset.height = 0;
	//fire2
	fire1.guiTexture.pixelInset.x = 0;
	fire1.guiTexture.pixelInset.width = 0;
	fire1.guiTexture.pixelInset.y = 0;
	fire1.guiTexture.pixelInset.height = 0;
}
function setNoFireNoAim(){
	up.SetActive(false);
	down.SetActive(true);
	left.SetActive(true);
	right.SetActive(true);
	jump.SetActive(true);
	fire1.SetActive(false);
	fire2.SetActive(false);
	aimArea.SetActive(true);
	joyStick.SetActive(false);
	standardAimArea();
	if(!movement.getPCDebugging()){	

	//left
	left.guiTexture.pixelInset.x = 0;
	left.guiTexture.pixelInset.width = (0.15*Screen.width);
	left.guiTexture.pixelInset.y = 0.10*Screen.width;
	left.guiTexture.pixelInset.height =(0.15*Screen.width);

	//right
	right.guiTexture.pixelInset.x = (0.15*Screen.width);
	right.guiTexture.pixelInset.width = (0.15*Screen.width);
	right.guiTexture.pixelInset.y = 0.10*Screen.width;
	right.guiTexture.pixelInset.height = (0.15*Screen.width);

	//down
	down.guiTexture.pixelInset.x = .1*Screen.width;
	down.guiTexture.pixelInset.width = Screen.width*.10;
	down.guiTexture.pixelInset.y = 0;
	down.guiTexture.pixelInset.height = 0.10*Screen.width;

	//Jump
	jump.guiTexture.pixelInset.x = Screen.width - (0.20*Screen.width);
	jump.guiTexture.pixelInset.width = 0.20*Screen.width;
	jump.guiTexture.pixelInset.y = 0 ;
	jump.guiTexture.pixelInset.height = 0.20*Screen.width;

}else{
		set_controls_hidden();
	}
	
}
function setAiming(){
	up.SetActive(false);
	down.SetActive(false);
	left.SetActive(false);
	right.SetActive(false);
	jump.SetActive(false);
	fire1.SetActive(false);
	fire2.SetActive(false);
	aimArea.SetActive(true);
	joyStick.SetActive(false);
	aimArea.guiTexture.pixelInset = Rect(0,0,Screen.width,Screen.height);
}
function showControls(){
	var rig = PlayerPrefs.GetString("Rig");
	if(rig.Equals("HookShotRig")){
		setHookShot();
	}else if(rig.Equals("PortalRig") ){
		setPortals();
	}else if( rig.Equals("GunRig")){
		setGun();
	}else if(rig.Equals("CheckPointRig")){
		setCheckPoint();
	}else{
		setNoFireNoAim();
	}
}

function setCheckPoint(){
	up.SetActive(false);
	down.SetActive(true);
	left.SetActive(true);
	right.SetActive(true);
	jump.SetActive(true);
	fire1.SetActive(true);
	fire2.SetActive(true);
	aimArea.SetActive(true);
	joyStick.SetActive(false);
	if(!movement.getPCDebugging()){	

	//JumpButton
	jump.guiTexture.pixelInset.x = Screen.width - (0.20*Screen.width);
	jump.guiTexture.pixelInset.width = 0.20*Screen.width;
	jump.guiTexture.pixelInset.y = 0 ;
	jump.guiTexture.pixelInset.height = 0.20*Screen.width;

	//left
	left.guiTexture.pixelInset.x = 0;
	left.guiTexture.pixelInset.width = (0.15*Screen.width);
	left.guiTexture.pixelInset.y = 0.10*Screen.width;
	left.guiTexture.pixelInset.height =(0.15*Screen.width);

	//right
	right.guiTexture.pixelInset.x = (0.15*Screen.width);
	right.guiTexture.pixelInset.width = (0.15*Screen.width);
	right.guiTexture.pixelInset.y = 0.10*Screen.width;
	right.guiTexture.pixelInset.height = (0.15*Screen.width);

	//down
	down.guiTexture.pixelInset.x = .1*Screen.width;
	down.guiTexture.pixelInset.width = Screen.width*.10;
	down.guiTexture.pixelInset.y = 0;
	down.guiTexture.pixelInset.height = 0.10*Screen.width;
	
	//fire1
	fire2.guiTexture.pixelInset.x =  0.3*Screen.width;
	fire2.guiTexture.pixelInset.width = (0.15*Screen.width);
	fire2.guiTexture.pixelInset.y = 0;
	fire2.guiTexture.pixelInset.height = (0.15*Screen.width);
	//fire2
	fire1.guiTexture.pixelInset.x = 0.45*Screen.width;
	fire1.guiTexture.pixelInset.width = (0.15*Screen.width);
	fire1.guiTexture.pixelInset.y = 0;
	fire1.guiTexture.pixelInset.height = (0.15*Screen.width);
}else{
		set_controls_hidden();
	}
	standardAimArea();

}


function hideControls(){
	up.SetActive(false);
	down.SetActive(false);
	left.SetActive(false);
	right.SetActive(false);
	jump.SetActive(false);
	fire1.SetActive(false);
	fire2.SetActive(false);
	aimArea.SetActive(false);
	joyStick.SetActive(false);
}