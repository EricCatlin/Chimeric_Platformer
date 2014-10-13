#pragma strict

//Use a coroutine that moves from one point to another, inside an infinite loop:

var Forward:boolean = true;
var pointB : Transform;
  var pointA : Vector3 ;
  var rewind_ratio : float = 1;
  
  var const_speed : boolean = true;
  var const_time : boolean = false;
  var speed : float = 5;
  var allowed_to_move : boolean = false;
  var at_destination : boolean = true;
  var switchable : boolean = false;
   var auto_reset : boolean = true;
   var playOnForward : AudioClip;
      var playOnReverse : AudioClip;
      var playOnReachDestination:AudioClip;

   

  
  
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
   		var this_speed = speed;
   		
   		var distance = 0f;
   		if(Forward){
   			direction = (transform.position- pointB.position).normalized;
   			
   			distance = Vector3.Distance(transform.position, pointB.position);
		}
   		else{
   			direction = (transform.position- pointA).normalized ;
   			   			distance = Vector3.Distance(transform.position, pointA);
   			   			this_speed *=rewind_ratio;

   		}
   		if(!at_destination && distance <this_speed ){
   			at_destination = true;	
   		}
   		if(at_destination){
   		if(this.audio !=null && playOnReachDestination !=null){
   				audio.PlayOneShot(playOnReachDestination,1);
   			}
   			if(!switchable){
   				  Forward = !Forward;
   				  if(Forward){
   				  	   	if(audio!=null && playOnForward!=null) audio.PlayOneShot(playOnForward,1);
   				  }else	{
						if(audio!=null && playOnReverse!=null) audio.PlayOneShot(playOnReverse,1);
				  }
   				  at_destination = false;
   			}else if(auto_reset && Forward){
   				Forward = false;
   				if(audio!=null && playOnReverse!=null) audio.PlayOneShot(playOnReverse,1);
   				at_destination = false;

   			}
   		}	
   		else{
       		rigidbody.MovePosition(transform.position - (direction*(this_speed))); 
      }
}

function SwitchEventRecieved(object: GameObject){
	if(at_destination){
		  Forward = !Forward;
		   if(Forward)
   				  	   	if(audio!=null && playOnForward!=null) audio.PlayOneShot(playOnForward,1);
   				  else	
						if(audio!=null && playOnReverse!=null) audio.PlayOneShot(playOnReverse,1);
		  at_destination = false;
	}
}

