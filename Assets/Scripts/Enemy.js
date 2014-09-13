#pragma strict

 var distance : float;
    var target : Transform;    
    var lookAtDistance :float= 30.0;
    var attackRange : float= 25.0;
    var moveSpeed :float= 10.0;
    var madSpeed : float = 15.0;
    private var move : float;
    var madDistance : float = 10;
    //these dont have to be distances
    var damping :float= 6.0;
    private var isAttacking  : boolean = false;
    private var isLooking    : boolean = false;
    private var isMad        : boolean = false;


    private var lightColor : Light;
    

	function Start(){
		lightColor = GetComponent(Light);
	}

    function Update () {
    
    distance = Vector3.Distance(target.position, transform.position);
    
    if(distance < lookAtDistance){
    	isLooking = true;
    	if(distance < attackRange ){
    		isAttacking = true;
    		if(distance < madDistance){
    			isMad = true;
    		}else{
    			isMad = false;
    		}
    	}else{
    		isAttacking = false;
    	}
    }else{
    	isLooking = false;
    }
	
	
	if(isLooking){
		lookAt();
		if(isAttacking){
			attack();
			if(isMad){
				move = madSpeed;
			}else{
				move = moveSpeed;
			}
		}
	}
    
}


function lookAt (){
	var rotation = Quaternion.LookRotation(target.position - transform.position);
	transform.rotation = Quaternion.Slerp(transform.rotation, rotation, Time.deltaTime *damping);
}

function attack ()
{
    isAttacking = true;
    renderer.material.color = Color.red;

    transform.Translate(Vector3.forward * move *Time.deltaTime);
}