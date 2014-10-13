#pragma strict




private var RightRunCubeHit : boolean = false;
private var RightRunJumpCubeHit: boolean = false;
private var LeftRunCubeHit: boolean = false;
private var RightJumpCubeHit: boolean = false;
private var LeftJumpCubeHit: boolean = false;
private var RightWallJumpCubeHit: boolean = false;
private var LeftWallJumpCubeHit: boolean = false;
private var EndOfSection1Hit :boolean =false;
private var LastSlideCubeHit : boolean = false;
private var HighWallJumpCubeHit : boolean = false;
private var InvisibleCubeHit : boolean = false;
private var FiftyFiveHit : boolean = false;

private var HighWallJumpCube2Hit : boolean = false;
private var LeftJumpCube : GameObject;
private var RightJumpCube : GameObject;
private var RightRunJumpCube : GameObject;
private var LeftWallJumpCube : GameObject;
private var RightWallJumpCube : GameObject;
private var FiftyFive : GameObject;

private var Plug : GameObject;

private var EndOfSection1 : GameObject;
private var SecondRightWall : GameObject;
private var HighWallJumpCube : GameObject;
private var HighWallJumpCube2 : GameObject;
private var firstWall : GameObject;
private var SafteyNet : GameObject;
private var thisRect : Rect;
private var GUIMessage : int = 0;

private var event_recieved :boolean = false;

function Start () {
		thisRect = Rect(Screen.width/6,Screen.height-Screen.height*.3	,Screen.width-Screen.width/3,Screen.height*.1);
		firstWall = GameObject.Find("FirstWall");
		LeftJumpCube = GameObject.Find("LeftJumpCube");
		RightJumpCube = GameObject.Find("RightJumpCube");
		RightRunJumpCube = GameObject.Find("RightRunJumpCube");
		LeftWallJumpCube = GameObject.Find("LeftWallJumpCube");
		RightWallJumpCube = GameObject.Find("RightWallJumpCube");
		EndOfSection1= GameObject.Find("EndOfSection1");
		SecondRightWall = GameObject.Find("SecondRightWall");
		FiftyFive = GameObject.Find("5");

		HighWallJumpCube = GameObject.Find("HighWallJumpCube");
		HighWallJumpCube2 = GameObject.Find("HighWallJumpCube2");
		Plug = GameObject.Find("Plug");
		SafteyNet = GameObject.Find("SafteyNet");
		LeftJumpCube.SetActive(false);
		RightJumpCube.SetActive(false);
		LeftWallJumpCube.SetActive(false);
		RightWallJumpCube.SetActive(false);
		RightRunJumpCube.SetActive(false);
		EndOfSection1.SetActive(false);
		HighWallJumpCube.SetActive(false);
		SafteyNet.SetActive(false);
		HighWallJumpCube2.SetActive(false);
		SecondRightWall.SetActive(false);
		
}

function Update () {
	if(RightRunCubeHit && LeftRunCubeHit){
		LeftRunCubeHit = false;
		LeftJumpCube.SetActive(true);
		RightJumpCube.SetActive(true);
		
		GUIMessage = 1;
		
	}
	if(LeftJumpCubeHit){
		LeftJumpCubeHit = false;
		firstWall.SetActive(false);
	}
	if(RightJumpCubeHit){
		RightJumpCubeHit = false;
		RightRunJumpCube.SetActive(true);
		GUIMessage = 2;
	}
	if(FiftyFiveHit){
	FiftyFiveHit = false;
		
		GUIMessage = 2;
	}
	if(RightRunJumpCubeHit){
		RightRunJumpCubeHit = false;
		Plug.SetActive(false);
		LeftWallJumpCube.SetActive(true);
		RightWallJumpCube.SetActive(true);
		GUIMessage = 3;
	}
	if(RightWallJumpCubeHit && LeftWallJumpCubeHit){
		LeftWallJumpCubeHit = false;
		EndOfSection1.SetActive(true);
		//End.SetActive(true);
		GUIMessage = 4;
	
	}
	if(EndOfSection1Hit){
		EndOfSection1Hit = false;
		SecondRightWall.SetActive(true);
		GameObject.Find("FirstRightWall").SetActive(false);
		GUIMessage = 5;
	}
	if(LastSlideCubeHit){
		LastSlideCubeHit = false;
		HighWallJumpCube.SetActive(true);
		GUIMessage = 6;
	}
	if(HighWallJumpCubeHit){
		HighWallJumpCubeHit  = false;
		HighWallJumpCube2.SetActive(true);
		GUIMessage = 7;
	}
	if(InvisibleCubeHit){
		InvisibleCubeHit = false;
		SafteyNet.SetActive(true);
		GUIMessage = 8;

	}
	if(HighWallJumpCube2Hit){
		HighWallJumpCube2Hit  = false;
	//	End.SetActive(true);
		GUIMessage = 9;
	}
}
function SwitchEventRecieved(object: GameObject){
event_recieved = true;
gameObject.audio.Play();
if(object.name.Equals("RightRunCube")){
	RightRunCubeHit = true;
}else if(object.name.Equals("LeftRunCube")){
	LeftRunCubeHit = true;
}else if(object.name.Equals("RightJumpCube")){
	RightJumpCubeHit = true;
}else if(object.name.Equals("LeftJumpCube")){
	LeftJumpCubeHit = true;
}else if(object.name.Equals("RightRunJumpCube")){
	RightRunJumpCubeHit = true;
}else if(object.name.Equals("LeftWallJumpCube")){
	LeftWallJumpCubeHit = true;
}else if(object.name.Equals("RightWallJumpCube")){
	RightWallJumpCubeHit = true;
}else if(object.name.Equals("EndOfSection1")){
	EndOfSection1Hit = true;
}else if(object.name.Equals("LastSlideCube")){
	LastSlideCubeHit = true;
}else if(object.name.Equals("HighWallJumpCube")){
	HighWallJumpCubeHit = true;
}else if(object.name.Equals("InvisibleSaftey")){
	InvisibleCubeHit = true;
}else if(object.name.Equals("HighWallJumpCube2")){
	HighWallJumpCube2Hit = true;
}else if(object.name.Equals("5")){
	FiftyFiveHit = true;
}
	
}

function OnGUI(){

if(event_recieved){
	GUI.contentColor = Color.red;
	event_recieved = false;
}


if(Screen.currentResolution.width > 1000){
		GUI.skin.label.fontSize = 26;
		
		
		
		GUI.Box(thisRect,"");

	}else{
		GUI.skin.label.fontSize = 14;
		GUI.Box(thisRect,"");


		}
		GUI.contentColor = Color.Lerp(GUI.contentColor,Color.green,0.71);


if(GUIMessage == 0){
	GUI.Label(thisRect, "Welcome to GenericPlatformer! Press LEFT and RIGHT to RUN. Ram Into The BLUEBOXES to advance.");
}else if(GUIMessage == 1){
	GUI.Label(thisRect, "TAP JUMP to HOP, HOLD JUMP to JUMP higher. RUN to JUMP even higher. ");

}else if(GUIMessage == 2){
	GUI.Label(thisRect, "You can WALL JUMP. You can only wall jump while touching the wall, so JUMP before moving away from the wall");

}else if(GUIMessage == 3){
	GUI.Label(thisRect, "As you progress, you will UNLOCK lots of cool tools that add abilities.");

}else if(GUIMessage == 4){
	GUI.Label(thisRect, "Righto, now go up to the left to advance");

}else if(GUIMessage == 5){
	GUI.Label(thisRect, "SLIDE DOWN the WALL, pressing AGAINST the wall will slow your fall to a SLIDE");

}else if(GUIMessage == 6){
	GUI.Label(thisRect, "WALL JUMPS take TIMING. HOLD JUMP after JUMPING to maintain upward momentum. RELEASE JUMP only after contacting the wall");

}else if(GUIMessage == 7){
	GUI.Label(thisRect, "RED means DANGER! Clear this gap by running and holding JUMP");

}else if(GUIMessage == 8){
	GUI.Label(thisRect, "If this were not a test you would be DEAD");

}else if(GUIMessage == 9){
	GUI.Label(thisRect, "YOU ARE WINNER!");
}
}