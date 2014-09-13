#pragma strict

public var Level_Name  = "";
public var Prev_Level   = "";
public var Next_Level   = "";

function Start () {
	if(Prev_Level.Equals("") || PlayerPrefs.GetInt("Beat "+Prev_Level,0)){
		this.gameObject.SetActive(true);
	}else{
			this.gameObject.SetActive(false);

	}
	
	if(Level_Name.Equals("") || PlayerPrefs.GetInt("Beat "+Level_Name,0)){
		this.gameObject.renderer.material.color = Color.green;
	}else{
		this.gameObject.renderer.material.color=Color.blue;
		}
}

function Update () {

}
function OnTriggerEnter(hit : Collider){
	//print(hit);
	if(hit.gameObject.tag.Equals("Player")){
		Application.LoadLevel(Level_Name);
	}
}