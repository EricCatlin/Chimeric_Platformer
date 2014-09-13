#pragma strict

//Use a coroutine that moves from one point to another, inside an infinite loop:

var MoveBy : Vector3;
var time : float = 3;
var offset : float = 0;
private var startLocation : Vector3;
private var isActive : boolean;
var positional : boolean;
private var inPosition1 : boolean = true;
private var inPosition2 : boolean = false;


function Start () {
	startLocation = transform.position;
	var offsetDelay = Time.time + offset;
	while(Time.time < offsetDelay){
		yield;
	}
    
    
}

function FixedUpdate(){
	
	if(isActive && !inPosition2){
		runCoroutineTo2();
		inPosition1=false;
      	inPosition2 = true;
	}else if(!isActive && !inPosition1){
		runCoroutineTo1();
		inPosition1=true;
        inPosition2 = false;  
	}  	
}
function runCoroutineTo2(){
	
 		yield MoveObject(transform, startLocation, startLocation + MoveBy, time);
		

}
function runCoroutineTo1(){
	
       	yield MoveObject(transform, startLocation + MoveBy, startLocation, time);
		 

}

function MoveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) {
    var i = 0.0;
    var rate = 1.0/time;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        gameObject.rigidbody.MovePosition(Vector3.Lerp(startPos, endPos, i));

       // thisTransform.position = Vector3.Lerp(startPos, endPos, i);
        yield; 
    }
}


function SwitchEventRecieved(object: GameObject){
 	var other : GameObject = object; 
 	var otherScript : SwitchBehavior = other.GetComponent("SwitchBehavior");
	isActive = otherScript.GetState();
	print(isActive);
	
}