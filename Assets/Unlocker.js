public var unlocks : String = "none";
public var message_text : String ="put message text here";
private var Display_Message : boolean = false;
private var MessageConfirmed : boolean = false;
public var Particles : ParticleSystem;
public var movement : PlayerMovement;

	private var	thisRect : Rect =  Rect(Screen.width/10,Screen.height-Screen.height*.5	,Screen.width-Screen.width/5,Screen.height*.1);
	private var	buttonRect : Rect =  Rect(Screen.width/2.2,Screen.height-Screen.height*.5+Screen.height*.1	,Screen.width/10,Screen.height*.1);

function Start(){
movement = GameObject.FindGameObjectWithTag("Player").GetComponent("PlayerMovement");
	if(PlayerPrefs.GetInt(unlocks+"RigUnlocked",0)==1){
	Destroy(this);
	}
}
function OnTriggerStay(collider:Collider){
if(!Display_Message){
 if(collider.tag=="Player"){
if(PlayerPrefs.GetInt(unlocks+"RigUnlocked",0)==0){
	Display_Message = true;
}

}}
}

function Update(){

	
	if(Display_Message) {
	if(Time.timeScale>0.2){
	
	
Time.timeScale=Time.timeScale*0.99;
}}
	if(   MessageConfirmed ){
	if(Time.timeScale<1){
	Time.timeScale*=1.03;
	for(var i : int = 0 ; i < transform.childCount;i++){
	if(transform.GetChild(i).renderer!=null){
	transform.GetChild(i).renderer.material.color = Color.Lerp(transform.GetChild(i).renderer.material.color,Color.black,0.1);
	}}
	}else{
	Time.timeScale=1;
	Destroy(this);
	}
	  }  
}
function OnDestroy(){
if(Particles){
Particles.Stop();

}
for(var i : int = 0 ; i < transform.childCount;i++){
transform.GetChild(i).renderer.material.color = Color.black;
}
}

function OnGUI(){
		GUI.contentColor = Color.green;
		GUI.color = Color.green;
		GUI.backgroundColor = Color.black;
if(Display_Message){
	 GUI.Label(thisRect, message_text);
    if(GUI.Button(buttonRect, "OK")) {
    
    	PlayerPrefs.SetInt(unlocks+"RigUnlocked",1);
    		movement.setRig(unlocks+"Rig");
	movement.ActivateRig();

        Display_Message = false;
       MessageConfirmed=true;

    }
}
}