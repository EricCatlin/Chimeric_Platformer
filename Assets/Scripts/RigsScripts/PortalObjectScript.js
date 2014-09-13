#pragma strict

private var playerMovement : PlayerMovement;
private var rigid : Rigidbody;
private var Port1 : GameObject;
private var spot :Vector3;
private var norm : Vector3;
private var hit : RaycastHit;
public var Recieving_Portal :PortalObjectScript;




function Start () {
rigid = GetComponent(Rigidbody);
playerMovement = GameObject.Find("Player").GetComponent(PlayerMovement);
//Physics.IgnoreCollision(gameObject.collider,GameObject.Find("Player").GetComponent(CharacterController),true);

if(GameObject.Find("Portal2(Clone)") !=null)
GameObject.Find("Portal2(Clone)").GetComponent(PortalObjectScript).establish_connection(this.GetComponent(PortalObjectScript));

if(GameObject.Find("Portal1(Clone)") !=null)
GameObject.Find("Portal1(Clone)").GetComponent(PortalObjectScript).establish_connection(this.GetComponent(PortalObjectScript));

}

function Update () {
	

		
	
}
function establish_connection(other_portal : PortalObjectScript ){
Recieving_Portal = other_portal;
other_portal.Recieving_Portal = this.GetComponent(PortalObjectScript);

}
function OnTriggerEnter(hit:Collider){
	
}



