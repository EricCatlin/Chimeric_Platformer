#pragma strict
private var startingPos: Vector3;
private var moveLeft:boolean;
private var moveRight:boolean;
private var moveUp:boolean;
private var moveDown:boolean;
private var player :PlayerMovement;


var range : float = 20;
var move_dist : float = 0.5;
function Start(){
	startingPos = transform.position;
	player = GameObject.Find("Player").GetComponent("PlayerMovement");
}

function FixedUpdate () {
	var distance = Vector3.Distance(transform.position,startingPos);
	if(moveLeft && distance < range ){
		rigidbody.velocity = Vector3.Lerp(rigidbody.velocity,Vector3(-move_dist,0,0),0.1);
		moveLeft = false;
	}else if(moveRight&&distance<range){
		rigidbody.velocity = Vector3.Lerp(rigidbody.velocity,Vector3(move_dist,0,0),0.1);
		moveRight=false;
	}else if(moveUp && distance<range){
		rigidbody.velocity = Vector3.Lerp(rigidbody.velocity,Vector3(0,move_dist,0),0.1);
		moveUp=false;

	}else if(moveDown && distance<range){
		rigidbody.velocity = Vector3.Lerp(rigidbody.velocity,Vector3(0,-move_dist,0),0.1);
		moveDown=false;


	}
	 if(distance>1){
		var direction = (this.transform.position - startingPos);
		rigidbody.velocity = Vector3.Lerp(rigidbody.velocity,-direction,0.9);
	}else{
		//rigidbody.velocity = Vector3.Lerp(rigidbody.velocity,Vector3.zero,0.1);
	}
	
}

function SwitchEventRecieved(object:GameObject){
	if(object.name.Equals("MoveLeft")){
			moveLeft = true;
	}else if(object.name.Equals("MoveRight")){
		moveRight = true;
	}else if(object.name.Equals("MoveUp")){
		moveUp = true;
	}else if(object.name.Equals("MoveDown")){
		moveDown = true;
	}


}