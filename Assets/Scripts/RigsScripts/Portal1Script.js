#pragma strict

private var playerMovement : PlayerMovement;
private var rigid : Rigidbody;
var Portal : GameObject;
private var Port1 : GameObject;
private var spot :Vector3;
private var norm : Vector3;
private var hit : RaycastHit;




function Start () {
rigid = GetComponent(Rigidbody);
playerMovement = GameObject.Find("Player").GetComponent(PlayerMovement);
Physics.IgnoreCollision(gameObject.collider,GameObject.Find("Player").GetComponent(CharacterController),true);



}

function Update () {
	
	if(Physics.Linecast(transform.position, transform.position + rigid.velocity/50,hit) && !hit.collider.gameObject.name.Equals("Player") && spot == Vector3(0,0,0) && !hit.collider.gameObject.name.Equals("Portal2(Clone)")&& !hit.collider.gameObject.name.Equals("Portal1(Clone)")){
		if(!hit.collider.tag.Equals("1DMG")){

		if(GameObject.Find("Portal1(Clone)")){
			Destroy(GameObject.Find("Portal1(Clone)"));

		}

		
		spot = (hit.collider.ClosestPointOnBounds(hit.point));

		norm = (hit.normal);
		spot.z = 0;

		spot += norm;
		playerMovement.Portal1Normal = norm;

		Port1  = Instantiate(Portal, spot, Quaternion.LookRotation(norm));
	
	
		
			Port1.transform.parent = hit.collider.transform; 
		
	}
	Destroy(this.gameObject);	

		
	}
		
	
}

function OnCollisionEnter(hit:Collision){
	if(!hit.collider.gameObject.name.Equals("Player")&& (!hit.collider.tag.Equals("1DMG"))){
		if(GameObject.Find("Portal1(Clone)")){
			Destroy(GameObject.Find("Portal1(Clone)"));
		}	
			spot = (hit.collider.ClosestPointOnBounds(hit.contacts[0].point));

			norm = (hit.contacts[0].normal);
			spot.z = 0;
			spot += norm*3;
			playerMovement.Portal1Normal = norm;
			Port1  = Instantiate(Portal, spot, Quaternion.LookRotation(norm));
			if(hit.collider.gameObject.GetComponent("MovingPlatformPhysicsHack")){
				Port1.transform.parent = hit.collider.transform; 
			}
				
	Destroy(this.gameObject);	
	}
}

