#pragma strict

//Use a coroutine that moves from one point to another, inside an infinite loop:

var Forward:boolean = true;
var pointB : Transform;
  var pointA : Vector3 ;
  var speed : float = 500;
  @Range(0.0,1.0)
  var smoothing : float = 0.1;
  
  var last_direction:Vector3 ;
     		var direction : Vector3;


function Start () {
if(!rigidbody){
	gameObject.AddComponent(Rigidbody);
	}
	rigidbody.isKinematic=true;
	rigidbody.useGravity=false;
	
    pointA = new Vector3(this.transform.position.x,this.transform.position.y,this.transform.position.z);
    
    
    if(!pointB){
    	pointB = gameObject.transform.FindChild("Waypoint");
    	
    pointB.transform.parent=null;
    }
    
}

function FixedUpdate () {
   		
   		
   		if(Forward)
   			direction = Vector3.Lerp(last_direction,transform.position- pointB.position,smoothing);
   		else
   			direction = Vector3.Lerp(last_direction,transform.position- pointA,smoothing) ;
   		
   		if((direction.magnitude < 1))
   			Forward = !Forward;
   		
   		last_direction = direction;
   		
   		
   			
       rigidbody.MovePosition(transform.position -direction.normalized/speed);
       //transform.position = Vector3.Lerp(startPos, endPos, i);

     
    
}