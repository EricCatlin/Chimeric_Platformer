#pragma strict
private var movement : PlayerMovement;
	movement = GameObject.Find("Player").GetComponent("PlayerMovement");

function Start () {

}

function Update () {

}
function OnTriggerEnter(other : Collider){
	if(other.gameObject.name == "Player"){
		movement.score++;
		audio.Play();
		Destroy(this.gameObject,2);
		Destroy(this.renderer);
		Destroy(this);
	}

}