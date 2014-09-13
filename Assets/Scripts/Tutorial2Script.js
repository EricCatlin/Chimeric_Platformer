#pragma strict
private var movement : PlayerMovement;
private var cam : Camera;
private var camScript : CameraFollowBetter;

private var timeAtFrame : float;
private var timeAtPreviousFrame : float;

private var T1H : boolean = false;
private var T2H : boolean = false;
private var T3H : boolean = false;
private var T4H : boolean = false;
private var T5H : boolean = false;
private var T6H : boolean = false;
private var T7H : boolean = false;
private var T8H : boolean = false;
private var GUIMessage : int = 0;
private var thisRect : Rect;

function Start () {
	thisRect = Rect(Screen.width/6,Screen.height-Screen.height*.3	,Screen.width-Screen.width/3,Screen.height*.1);
	movement = GameObject.Find("Player").GetComponent("PlayerMovement");
	cam = GameObject.FindObjectOfType(Camera);

}


function SwitchEventRecieved(object: GameObject){
	print(object.name + " hit switch: "+ this.gameObject.name);
	if(object.name.Equals("T1")){
		T1H = true;
		GUIMessage = 1;
	}if(object.name.Equals("T2")){
		T2H = true;
		GUIMessage = 2;
	}if(object.name.Equals("T3")){
		T3H = true;
		GUIMessage = 3;
	}if(object.name.Equals("T4")){
		T4H = true;
		GUIMessage = 4;
	}if(object.name.Equals("T5")){
		T5H = true;
		GUIMessage = 5;
	}if(object.name.Equals("T6")){
		T6H = true;
		GUIMessage = 6;
	}if(object.name.Equals("T7")){
		T7H = true;
		GUIMessage = 7;
	}if(object.name.Equals("T8")){
		T8H = true;
		GUIMessage = 8;
	}
}
function OnGUI(){
if(Screen.currentResolution.width > 1000){
		GUI.skin.label.fontSize = 24;
		GUI.contentColor = Color.green;
		GUI.Box(thisRect,"");

	}else{
		GUI.skin.label.fontSize = 14;
GUI.contentColor = Color.green;
GUI.Box(thisRect,"");


		}
		thisRect = Rect(Screen.width/6,Screen.height-Screen.height*.3	,Screen.width-Screen.width/3,Screen.height*.1);



if(GUIMessage == 0){
	GUI.Label(thisRect, "So you beat tutorial 1? Better keep my eyes on you... ");
}else if(GUIMessage == 1){
	GUI.Label(thisRect, "EQUIP your SAVE SPOT from SELECT KIT in the MENU (ESCAPE)");

}else if(GUIMessage == 2){
	GUI.Label(thisRect, "PLACE a CHECKPOINT with LEFT-CLICK. If you happen to die, you will instantly teleport back to this CHECKPOINT");

}else if(GUIMessage == 3){
	GUI.Label(thisRect, "CHECKPOINTS have a 5 second COOL-DOWN between uses. If you die before the CHECKPOINT is recharged, you have to restart the level");

}else if(GUIMessage == 4){
	GUI.Label(thisRect, "COLLECT COINS. IMPRESS the GENDERS");

}else if(GUIMessage == 5){
	GUI.Label(thisRect, "Always PLACE CHECKPOINTS in SAFE places. But it's like, up to you man...");

}else if(GUIMessage == 6){
	GUI.Label(thisRect, "Remember when I said RED means DANGER");

}else if(GUIMessage == 7){
	GUI.Label(thisRect, "I wasnt lying. RED is dangerous. WHY would I lie to you?");

}else if(GUIMessage == 8){
	GUI.Label(thisRect, "You probably just shouldn't even be here. Its pretty dangerous.");

}else if(GUIMessage == 9){
	GUI.Label(thisRect, "Telling ya, its not worth it. This game's not even that good. Just turn it off now.");
}
}