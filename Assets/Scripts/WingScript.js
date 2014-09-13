#pragma strict
private var WingBeatTime : float = 10;
 var rotateBy : Vector3;

function Start () {

}

function Update () {

}
function beatWings(){
	 var pointA = transform.position;
	 var beat : boolean = true;
   	 while (beat) {
        yield MoveObject(transform, pointA,rotateBy, WingBeatTime);
        yield MoveObject(transform, rotateBy, pointA, WingBeatTime);
        beat = false;
    }
}

function MoveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) {
    var i = 0.0;
    var rate = 1.0/time;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        transform.rotation = Quaternion.LookRotation(transform.position, Vector3.right);
        yield; 
    }
}