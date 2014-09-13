#pragma strict

var showGUI : boolean = false;
private var time : float;

function OnTriggerEnter(other : Collider){
	if(other.gameObject.name == "Player"){
		showGUI = true;
		time = Time.realtimeSinceStartup
;
	}

}

function OnGUI() { 
    if (showGUI) { 
        GUI.Box (Rect (Screen.width/2-100,Screen.height/2,400,200), "Finished");

   
   		 GUI.Label (Rect (Screen.width/2,Screen.height/2+80,200,50), "You did it in " + time );

	

  
    
	}
}