var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});


var image = gm('./resources/blueprint.jpg').noProfile().resize(1000,1000,"!").fontSize(10);
var rooms = [
]
var features = {
  "center":[
    {"name": "house","ammount":[20,30],"size":[[10,30],[10,30]]},
    {"name": "garden","ammount":[5,10],"size":[[10,30],[10,30]]}
  ],
  "wall":[
    {"name":"tower","expand":10}
  ]
}

function drawRoom(name,x,y,w,h){
  console.log(name,x,y,w,h);
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
function createCastle(){
  // main room
  var center = {
    x:randi(200,500),y:randi(200,500)
  }
  center.x2 = center.x+randi(200,500);center.y2 = center.y+randi(200,500)
  addRoom("",center.x,center.y,center.x2,center.y2);
  features.center.forEach(function(feature){
    var ammount = randi.apply(undefined,feature.ammount);
    for(var i = 0;i <= ammount;i++){
      var featuresize = [randi(feature.size[0][0],feature.size[0][1]),randi(feature.size[1][0],feature.size[1][1])]
      var featurepos = {x:randi(center.x,center.x2-featuresize[0]),y:randi(center.y,center.y2-featuresize[1])};
      featurepos.x2 = featurepos.x + featuresize[0];featurepos.y2 = featurepos.y + featuresize[1];
      addRoom(feature.name,featurepos.x,featurepos.y,featurepos.x2,featurepos.y2)
    }
  });
  var size = {
    wh: randi(25,50)
  }
  addRoom("",center.x - size.wh,center.y - size.wh, center.x2 + size.wh, center.y2 + size.wh);
}
createCastle();
rooms.forEach(function(room){
  drawRoom(room.name,room.x,room.y,room.x2 - room.x,room.y2 - room.y);
});
save();
