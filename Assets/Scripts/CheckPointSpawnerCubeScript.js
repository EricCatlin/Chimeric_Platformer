#pragma strict
private var movement :PlayerMovement ;
function Start () {
movement = GameObject.Find("Player").GetComponent("PlayerMovement");
}

function Update () {

}
function OnTriggerEnter(other:Collider){
	if(other.gameObject.name.Equals("Player")){
		
		movement.makeSetCheckPoint();
		movement.SetCheckPointIsReady();
		
	}
}	