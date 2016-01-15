var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});


var image = gm('./resources/blueprint.jpg').noProfile().resize(1000,1000,"!").fontSize(10);
//var rooms = [
//]
/*var features = {
  "center":[
    {"name": "house","ammount":[20,30],"size":[[10,30],[10,30]]},
    {"name": "garden","ammount":[5,10],"size":[[10,30],[10,30]]}
  ],
  "wall":[
    {"name":"tower","expand":10}
  ]
}*/
var features = [ // list of building groups
  {
    "name": "Castle",
    "size": new Size(300,700,300,700),
    "ammount": new Ammount(1,2),
    "subgroups": [
      {
        "name": "Village",
        "size": new Size(50,100,50,100),
        "ammount": new Ammount(1,5),
        "subgroups": [
          {
            "name": "House", // third subgroup layer has graphical trouble caused by Y2 position being NAN
            "size": new Size(10,20),
            "ammount": new Ammount(10,20),
            "subgroups": []
          }
        ]
      }
    ]
  }
]
var rooms = [ // TODO this should probably end up being a class with a .draw()
  //{"name": "Castle", "position": {"x":2,"y":2,"x2":10,"y2":50}, "subgroups": []} // subgroups position is NOT relative to main group position
]
function log(){
  // TODO uncomment the line below to enable logging to console (too lazy to add --verbose)
  //console.log.apply(undefined,arguments)
}
function generateSubgroup(bg,arr,w,h){ // Generate a group of building, for example the main castle or villages
  log("Generating Subgroup ", bg);
  bg.forEach(function(building){
    var ammount = building.ammount.get();
    log("Parsing Building ", building);
    log(ammount + " of " + building.name + " will be created");
    for(var i = 0;i < ammount;i++){
      var endall = false;
      log("Creating building "+ i);
      var size = building.size.get();
      var pos = randPos(size,w,h);
      var wi = 0;
      while(testCollision(arr,pos.x,pos.y,pos.x2,pos.y2) != 0){
        log("Random position was not valid. Trying again (" + wi +"/19 times)");
        wi++;
        if(wi > 20){
          console.log("Could not solve position, you may be missing a building");
          endall = true;
          break;
        }
        pos = randPos(size,w,h);
      }
      if(!endall)
      {generateSubgroup(
        building.subgroups,
        registerRoom(arr,building.name,pos.x,pos.y,pos.x2,pos.y2),
        pos.x2-pos.x,
        pos.y2-pos.y
      );}
    }
  });
}

function randPos(size,w,h){
  log("Creating building of ",size, " with constraints " + w + " " + h);
  var ans ={"x": randi(0,w-size.w),"y": randi(0,h-size.h)};
  ans.x2 = ans.x + size.w;
  ans.y2 = ans.y + size.h;
  log("Random position for building is ", ans);
  return(ans);
}

function registerRoom(arr,name,x,y,x2,y2,drawCallback,nameCallback){
  var sg = [];
  var toPush ={"name": name, "position": {"x": x, "y": y, "x2": x2,"y2":y2},"subgroups":sg};
  if(drawCallback) toPush.draw = drawCallback;
  if(nameCallback) toPush.name = nameCallback();
  arr.push(toPush);
  return sg;
}

function testCollision(arr,x,y,x2,y2){
  var count = 0;
  arr.forEach(function(pos){
    var cx = pos.position.x;
    var cy = pos.position.x;
    var cx2 = pos.position.x2;
    var cy2 = pos.position.y2;
    if(x >= cx && y >= cy && x2 <= cx2 && y2 <= cy2){
      count += 1;
    }
  });
  return count;
}

function Size(w,w2,h,h2){
  this.w = w;this.w2 = w2;this.h = h;this.h2 = h2;
}
Size.prototype.get = function(){
  return {"w": randi(this.w,this.w2), "h": randi(this.h,this.h2)};
};
function Ammount(a,b){
  this.ammount = [a,b]
}
Ammount.prototype.get = function(){
  return randi(this.ammount[0],this.ammount[1])
}

function drawRoom(name,x,y,w,h){
  log(name,x,y,w,h);
  image.stroke("#ffffff").fill('none')
    .drawRectangle(x,y,x+w,y+h)
  //  .drawText(((w/2)+x)-500,((h/2)+y)-500,name,'Center');
  drawCenteredText(name,(w/2)+x,(h/2)+y);
}
function drawCenteredText(text,x,y){
  image.fill('#ffffff').drawText(x-500,y-500,text,'Center');
}
function save(){
  image//.blur(1,1)
    .write('./output.jpg', function (err) {
      if (err) throw err;
      console.log('done');
    });
}
function addRoom(name,x1,y1,x2,y2){
  rooms.push({"name":name,"x":x1,"y":y1,"x2":x2,"y2":y2})
}
function randi(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
function drawCastle(data,origx,origy){
  data.forEach(function(room){
    var roomDraw = drawRoom;
    if(room.drawCallback) roomDraw = drawCallback;
    var x = room.position.x + origx;
    var y = room.position.y + origy;
    var w = room.position.x2 - room.position.x; // can't just use x/y because they include the orig changes
    var h = room.position.y2 - room.position.y;
    roomDraw(room.name,x,y,w,h);
    drawCastle(room.subgroups,x,y);
  });
}
generateSubgroup(features,rooms,1000,1000);


log(JSON.stringify(rooms));
drawCastle(rooms,0,0);
save();
//log(randi(0,50));
