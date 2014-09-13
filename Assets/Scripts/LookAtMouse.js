#pragma strict


private var worldPos : Vector3;
private var mouseX : int;
private var mouseY :  int;
private var cameraDif :  int;
var fpc : GameObject;

function Start () {

    cameraDif = camera.transform.position.y - fpc.transform.position.y;

}

function Update () {

    mouseX = Input.mousePosition.x;

    mouseY = Input.mousePosition.y;

    worldPos = camera.ScreenToWorldPoint(Vector3(mouseX, mouseY, cameraDif));

    var  turretLookDirection:Vector3 =  Vector3(worldPos.x,  worldPos.y, fpc.transform.position.z);

    fpc.transform.LookAt(turretLookDirection);

}