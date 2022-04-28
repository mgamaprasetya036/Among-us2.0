let vs = []
function setup() {
  createCanvas(600, 600);
  v = new Vehicle(300,300);
}

function draw() {
  
  background('purple');

  
  v.display()
  v.edges()
  v.update();
  v.wander();
  
}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(10,10);
    this.acceleration = createVector(0,0);
    this.l = 20.0;
    this.maxspeed = 5;
    this.maxforce = 0.2;
    this.wanderTheta = PI/8;
  }
  
  wander(){
    let projVector = this.velocity.copy(); 
    projVector.setMag(100);     
    let projPoint = projVector.add(this.location);
    let wanderRadius = 50;
    let theta = this.wanderTheta + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);

    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar,yBar));
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    this.wanderTheta += random(-0.3 , 0.3);
    
    let debug = true;
    if(debug){
      push()
      noStroke();
      fill(255,0,0); 
      
      strokeWeight(1)
    fill(0)
    rect(projPoint.x+85,projPoint.y+20,25,5)
    rect(projPoint.x+80,projPoint.y+25,5,5)
    rect(projPoint.x+75,projPoint.y+30,5,5)
    rect(projPoint.x+70,projPoint.y+35,5,5)
    rect(projPoint.x+65,projPoint.y+40,5,20)
    rect(projPoint.x+70,projPoint.y+60,5,5)
    rect(projPoint.x+75,projPoint.y+65,10,5)
    rect(projPoint.x+80,projPoint.y+60,5,5)
    rect(projPoint.x+85,projPoint.y+55,5,5)
    rect(projPoint.x+90,projPoint.y+50,25,5)
    rect(projPoint.x+115,projPoint.y+55,5,5)
    rect(projPoint.x+120,projPoint.y+60,10,5)
    rect(projPoint.x+130,projPoint.y+40,5,20)
    rect(projPoint.x+125,projPoint.y+35,5,5)
    rect(projPoint.x+120,projPoint.y+30,5,5)
    rect(projPoint.x+110,projPoint.y+25,10,5)
    rect(projPoint.x+70,projPoint.y+70,15,5)
    rect(projPoint.x+65,projPoint.y+75,5,45)
    rect(projPoint.x+70,projPoint.y+120,10,5)
    rect(projPoint.x+80,projPoint.y+75,5,65)
    rect(projPoint.x+85,projPoint.y+140,10,5)
    rect(projPoint.x+95,projPoint.y+125,5,15)
    rect(projPoint.x+100,projPoint.y+120,10,5)
    rect(projPoint.x+110,projPoint.y+125,5,15)
    rect(projPoint.x+115,projPoint.y+140,10,5)
    rect(projPoint.x+125,projPoint.y+85,5,55)
    rect(projPoint.x+105,projPoint.y+85,20,5)
    rect(projPoint.x+100,projPoint.y+70,5,15)
    rect(projPoint.x+105,projPoint.y+65,25,5)
    rect(projPoint.x+130,projPoint.y+70,5,15)
      
      strokeWeight(0)
      //tas
      fill(0,0,255)
    rect(projPoint.x+70,projPoint.y+75,10,45)
      //body
      fill(255,0,0)
    rect(projPoint.x+85,projPoint.y+60,5,80)
    rect(projPoint.x+90,projPoint.y+55,5,85)
    rect(projPoint.x+95,projPoint.y+55,5,70)
    rect(projPoint.x+100,projPoint.y+55,15,5)
    rect(projPoint.x+100,projPoint.y+60,20,5)
    rect(projPoint.x+100,projPoint.y+65,5,5)
    rect(projPoint.x+100,projPoint.y+85,5,35)
    rect(projPoint.x+105,projPoint.y+90,5,30)
    rect(projPoint.x+110,projPoint.y+90,5,35)
    rect(projPoint.x+115,projPoint.y+90,10,50)
      
      //mata
      fill ('white')
    rect(projPoint.x+105,projPoint.y+70,25,15)
      //rambut
      fill(255,128,0)
    rect(projPoint.x+85,projPoint.y+25,25,25)
    rect(projPoint.x+85,projPoint.y+50,5,5)
      fill(255,153,20)
    rect(projPoint.x+80,projPoint.y+30,5,30)
    rect(projPoint.x+75,projPoint.y+35,5,30)
    rect(projPoint.x+70,projPoint.y+40,5,20)
      fill(204,102,0)
    rect(projPoint.x+110,projPoint.y+30,10,20)
    rect(projPoint.x+115,projPoint.y+50,5,5)
    rect(projPoint.x+120,projPoint.y+35,5,25)
    rect(projPoint.x+125,projPoint.y+40,5,20)
    
      
      noFill();
      stroke('black')
      console.log(wanderRadius)
      circle(projPoint.x, projPoint.y,wanderRadius*2)
     
      pop()
    }
  }
  
  seek(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
      
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }

    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    stroke(0);
    translate(this.location.x, this.location.y)
    rotate(theta+20)
    
//mata mata    
    fill('white')
ellipse(this.l+20,this.l+20,40,20)
    fill('black')
ellipse(this.l+20,this.l+20,10,10)
    fill('white')
ellipse(this.l+80,this.l+20,40,20)
    fill('black')
ellipse(this.l+80,this.l+20,10,10)
 
    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }

}