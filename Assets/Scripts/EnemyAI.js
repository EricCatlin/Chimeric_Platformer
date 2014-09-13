#pragma strict

private var x : float = 0;


function Start () {

}

function FixedUpdate () {
	rigidbody.AddForce(x/10,0,0,ForceMode.Impulse);
}


function OnTriggerEnter (other : Collider) {
	
	if(other.gameObject.tag.Contains("Player")){
		 print("enter2");
		
	}
}
function OnTriggerStay (other : Collider) {
 	
	if(other.gameObject.tag.Contains("Player")){
		x = transform.position.x -other.transform.position.x ;
		
	}
}
function OnTriggerExit (other : Collider) {
	
	if(other.gameObject.tag.Contains("Player")){
		 x = 0;
		
	}
}
