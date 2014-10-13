#pragma strict
private var wall :GameObject;
private var map : GameObject;

function Start () {

}

function Update () {

}

function OnGUI(){
		GUI.skin.box.fontSize=24;
		GUI.skin.box.wordWrap=true;
		
   		if(PlayerPrefs.GetInt("Beat Tutorial 1",0) == 0){
   			GUI.Box(Rect (Screen.width/2-200,Screen.height/2-Screen.height/4,400,100),"First Time Playing? Try the Tutorial?");
		//	GUI.Label(Rect (Screen.width/2-100,Screen.height/2-Screen.height/4,400,200), "");
			if(GUI.Button(Rect (Screen.width/2-200,Screen.height/2-Screen.height/4+100,200,100),"Play")){
				Application.LoadLevel("Tutorial 1");
			}if(GUI.Button(Rect (Screen.width/2,Screen.height/2-Screen.height/4+100,200,100),"Skip")){
				PlayerPrefs.SetInt("Beat Tutorial 1",1);
				//PlayerPrefs.SetInt("CheckPointRigUnlocked",1);
				Application.LoadLevel(Application.loadedLevel);
			}


   		}


}