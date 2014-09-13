#pragma strict

var target : GameObject;
//var damp : float = 6.0;
var bulletPrefab : Transform;
private var nextShotTime : float = 0.0;
var timeBetweenShots : float = 1.0;
var shotSpeed : float = 5000;
private var distance : float;
var range :float = 100;
private var muzzleTransform : Transform;
public var is_switch : boolean = false;
private var timeTillShoot : float;
private var AimLine : LineRenderer;
private var barrel : GameObject;
public var can_see_player : boolean = false;
public var  SwitchScript : SwitchBehavior;

function Start(){
	target = GameObject.Find("Player");
	nextShotTime = timeBetweenShots;
	muzzleTransform = transform.Find("Barrel/Muzzle");
	barrel = transform.FindChild("Barrel").gameObject;
	AimLine = GetComponent(LineRenderer);
	AimLine.SetVertexCount(2);
	


}
function Update(){

	if(!this.tag.Equals("DissabledEnemy")){
		distance = Vector3.Distance(target.transform.position, transform.position);  
    	if(target){
   		  	if (distance < range ){
        					barrel.renderer.material.color=Color.yellow;


				var layerMask :int = 1<<8 ; 
				layerMask = ~layerMask;
    	  		if (!Physics.Linecast(target.transform.position, muzzleTransform.position,layerMask)){
    	  			//transform.LookAt(Vector3(target.transform.position.x, target.transform.position.y+1, 0));
					transform.rotation = Quaternion.Slerp(transform.rotation,Quaternion.LookRotation(((target.transform.position+Vector3(1,0,0))-transform.position ).normalized),.25);
					barrel.renderer.material.color=Color.red;
              		can_see_player = true;
              		AimLine.enabled  = true;
              		//nextShotTime = Time.time + timeBetweenShots;
          		}else{
          		AimLine.enabled = false;


          		can_see_player = false;
          		
          		//nextShotTime = Time.time + timeBetweenShots;
          		}
    	 	}else{
    	 	AimLine.enabled  = false;
			barrel.renderer.material.color=Color.grey;


    	 	can_see_player = false;

     	}
     	if(can_see_player){
     	
     	
     		nextShotTime -= Time.deltaTime;
     		if(nextShotTime < 0){
     			Shoot();
     			nextShotTime = timeBetweenShots;
     		}else{
     			//audio.PlayOneShot(charging);
     			//AimLine.SetWidth(1,1-(nextShotTime/timeBetweenShots ));
				AimLine.SetWidth(1-(nextShotTime/timeBetweenShots ),.2);


     			AimLine.SetPosition(0,transform.position);
     			//AimLine.SetPosition(1,target.transform.position);
     			AimLine.SetPosition(1,transform.position + transform.forward*Vector3.Distance(transform.position,target.transform.position));
     			
     			
     			
     			

     		}
     	}else if(!can_see_player && nextShotTime < timeBetweenShots){
     		nextShotTime += Time.deltaTime;
     	}
     	}
     }else{
	AimLine.enabled=false;
          }
          
          if(is_switch){
          if(!SwitchScript.TakesInput) SwitchScript.TakesInput =  true;
          if(can_see_player){
     		SwitchScript.INPUT(true);
     		}else{
     		SwitchScript.INPUT(false);
     		}
     	}

}

function Shoot(){
	if(bulletPrefab!=null){
    var bullet = Instantiate(bulletPrefab, muzzleTransform.position, Quaternion.identity);
    audio.Play();
    bullet.rigidbody.AddForce(transform.forward * shotSpeed);
   
   	}
}