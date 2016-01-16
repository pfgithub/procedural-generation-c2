var fs = require('fs')
  , gm = require('gm').subClass({imageMagick: true});

var  arr1 = [
    "Fire",
    "Hut",
    "Ice",
    "Townspeople",
    "Forceful",
    "Bacon",
    "Boom",
    "Howling",
    "Ghost",
    "Epic",
    "Roman",
    "Sweet",
    "Money",
    "Strong",
    "Fiver",
    "Wobbly",
    "Power",
    "Empire",
    "Mega",
    "Ultra",
    "Edge",
    "Wolfen",
    "Gruber",
    "Monkey"
  ];
var  arr2 = [
    "wolf",
    "tech",
    "ingham",
    "verse",
    "star",
    "dragon",
    "stein",
    "birds",
    "limit",
    " Edge",
    "farmers"
  ]
var  arr3 = [
    " Rock",
    " Empire",
    " Fort",
    " Castle",
    " Union",
    " Commonwealth",
    " Saga",
    " Universe",
    " Port"
  ]
var arr4= [
  " Hut",
  " Town",
  " Fort",
  " Village",
  " Block"
]

// trading post names
var tp1 = [
  "Shell",
  "Quick",
  "Cheap",
  "Sale",
  "Snail",
  "Fast",
  "Zippy",
  "Flash",
  "Speedy",
  "Trade",
  "Music"
]
var tp2 = [
  "tastrophe",
  "mainia",
  "zapper",
  "mail",
  "male",
  "zop",
  "bash",
  "boom"
]
var tp3 = [
  " Shoppee",
  " Grocer",
  " Shop",
  " Guard",
  " Barraster",
  " Library",
  " School",
  " Horse Rental",
  " Armory",
  " Leatherworkers",
  " Bros. Shoppee"
]
var pk1 = [ // park name bot
  "Saint ",
  "St. ",
  "Emperor ",
  "King ",
  "Squire ",
  "Overlord ",
  "Priest ",
  "Prince ",
  ""
];
var pk2 = [
  "James ",
  "Jhon Ung ",
  "E. ",
  "Constantine ",
  "Bill ",
  "Edward ",
  "Leer ",
  "Great ",
  "Mink ",
  "Lewis ",
  "Mane "
];
var pk3 = [
  "II",
  "I",
  "III",
  "V",
  "IV",
  "M.",
  "G.",
  "Rowling",
  "A.",
  "S.",
  "R.",
  "T."
];
var pk4 = [
  " Park",
  " Preserve",
  " Green",
  " Square",
  " Block"
];

var image = gm('./resources/blueprint.jpg').noProfile().resize(1000,1000,"!").fontSize(14);
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
var houseJson = {
  "name": "House", // how to fail json
  "size": new Size(30,50,30,50),
  "ammount": new Ammount(10,20),
  "draw": function(name,x,y,w,h){
    log(name,x,y,w,h);
    var halfupdown = (h/2)+y
    var halfleftright = (w/2)+x
    var housein = 10;

    image.stroke("#ffffff").fill('none')
      //.drawRectangle(x,y,x+w,y+h) // debug
      .drawLine(x,halfupdown,halfleftright,y) // roof / line
      .drawLine(x+w,halfupdown,halfleftright,y) // roof \ line
      .drawLine(x+w,halfupdown,x,halfupdown) // roof _ line
      .drawRectangle(x+housein,halfupdown,x+w-housein,y+h); // building
  },
  "subgroups": []
};


var tpJson = {
  "name": "Trading Post",
  "size": new Size(60,110,60,110),
  "ammount": new Ammount(1,4),
  "nameCallback": function(){
    return tp1[randi(0,tp1.length - 1)] + tp2[randi(0,tp2.length - 1)] + tp3[randi(0,tp3.length - 1)];
  },
  "subgroups": []
};

var treeJson = {
  "name": "Tree", // how to fail json
  "size": new Size(10,30,10,30),
  "ammount": new Ammount(10,20),
  "draw": function(name,x,y,w,h){
    log(name,x,y,w,h);
    var halfupdown = (h/2)+y
    var halfleftright = (w/2)+x
    var housein = 10;

    image.stroke("#ffffff").fill('none')
      //.drawRectangle(x,y,x+w,y+h) // debug
      .drawLine(x,halfupdown,halfleftright,y) // roof / line
      .drawLine(x+w,halfupdown,halfleftright,y) // roof \ line
      .drawLine(x+w,halfupdown,x,halfupdown) // roof _ line
      .drawLine(x,y+h,halfleftright,halfupdown) // roof / line
      .drawLine(x+w,y+h,halfleftright,halfupdown) // roof \ line
      .drawLine(x,y+h,x+w,y+h); // roof _ line
  },
  "subgroups": []
};

var parkJson = {
  "name": "Park",
  "size": new Size(60,110,60,110),
  "ammount": new Ammount(1,4),
  "draw": drawPark,
  "nameCallback": function(){
    return pk1[randi(0,pk1.length - 1)] + pk2[randi(0,pk2.length - 1)] + pk3[randi(0,pk3.length - 1)] + pk4[randi(0,[pk4].length - 1)];
  },
  "subgroups": [
    treeJson
  ]
};

var lillyJson = {
  "name": "Lilly Pad", // how to fail json
  "size": new Size(10,30,10,30),
  "ammount": new Ammount(10,20),
  "draw": function(name,x,y,w,h){
    log(name,x,y,w,h);

    image.stroke("#ffffff").fill('#2DC41A')
      .drawEllipse(x+(w/2),y+(h/2),w/2,h/2);
  },
  "subgroups": []
};

var pondJson = {
  "name": "Pond",
  "size": new Size(60,110,60,110),
  "ammount": new Ammount(1,4),
  "draw": drawPond,
  "nameCallback": function(){
    return pk1[randi(0,pk1.length - 1)] + pk2[randi(0,pk2.length - 1)] + pk3[randi(0,pk3.length - 1)] + pk4[randi(0,[pk4].length - 1)];
  },
  "subgroups": [
    lillyJson
  ]
};

var features = [ // list of building groups

  {
    "name": "Castle",
    "size": new Size(300,700,300,700),
    "ammount": new Ammount(1,4),
    "nameCallback": function(){
      return arr1[randi(0,arr1.length - 1)] + arr2[randi(0,arr2.length - 1)] + arr3[randi(0,arr3.length - 1)];
    },
    "subgroups": [
      {
        "name": "Blacksmith",
        "size": new Size(50,100,50,100),
        "ammount": new Ammount(1,2),
        "nameCallback": function(){
          return tp1[randi(0,tp1.length - 1)] + tp2[randi(0,tp2.length - 1)] + " Blacksmith";
        },
        "subgroups": []
      },
      {
        "name": "Tower",
        "size": new Size(50,100,50,100),
        "ammount": new Ammount(1,2),
        "nameCallback": function(){
          return arr1[randi(0,arr1.length - 1)] + arr2[randi(0,arr2.length - 1)] + " Tower";
        },
        "subgroups": []
      },
      tpJson,
      houseJson,
      parkJson,
      pondJson
    ]
  },
  {
    "name": "Village",
    "size": new Size(100,300,100,300),
    "ammount": new Ammount(1,10),
    "nameCallback": function(){
      return arr1[randi(0,arr1.length - 1)] + arr2[randi(0,arr2.length - 1)] + arr4[randi(0,arr4.length - 1)];
    },
    "subgroups": [
      houseJson,
      tpJson
    ]
  },
  pondJson,
  treeJson,
  tpJson,
  parkJson
]
var rooms = [ // TODO this should probably end up being a class with a .draw()
  //{"name": "Castle", "position": {"x":2,"y":2,"x2":10,"y2":50}, "subgroups": []} // subgroups position is NOT relative to main group position
]
function log(){
  // TODO uncomment the line below to enable logging to console (too lazy to add --verbose)
  //console.log.apply(undefined,arguments)
}
function generateSubgroup(bg,arr,w,h){ // Generate a group of buildings, for example the main castle or villages
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
        registerRoom(arr,building.name,pos.x,pos.y,pos.x2,pos.y2, building.draw ? building.draw : undefined, building.nameCallback ? building.nameCallback : undefined),
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
    var cy = pos.position.y;
    var cx2 = pos.position.x2;
    var cy2 = pos.position.y2;
    if(
      x < cx2 &&
      x2 > cx &&
      y < cy2 &&
      y2 > cy
    ){
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
function drawPark(name,x,y,w,h){
  drawRoom(name,x,y,w,h,undefined,"#02B505");
}
function drawRoom(name,x,y,w,h,borderColor,fillColor){
  log(name,x,y,w,h);
  var bc = "#ffffff";
  var fc = 'none';
  if(borderColor) bc = borderColor;
  if(fillColor) fc = fillColor;
  image.stroke(bc).fill(fc)
    .drawRectangle(x,y,x+w,y+h)
  //  .drawText(((w/2)+x)-500,((h+10)+y)-500,name,'Center');
  drawCenteredText(name,(w/2)+x,(h+20)+y);
}
function drawPond(name,x,y,w,h){
  log(name,x,y,w,h);
  image.stroke('#ffffff').fill('#00C8FF')
    .drawEllipse(x+(w/2),y+(h/2),w/2,h/2);
  //  .drawText(((w/2)+x)-500,((h+10)+y)-500,name,'Center');
  drawCenteredText(name,(w/2)+x,(h+20)+y);
}
function drawCenteredText(text,x,y){
  image.fill('#ffffff').stroke('#ffffff').drawText(x-500,y-500,text,'Center');
}
function save(){
  image
    .write('./output.png', function (err) {
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
    if(room.draw) roomDraw = room.draw;
    var x = room.position.x + origx;
    var y = room.position.y + origy;
    var w = room.position.x2 - room.position.x; // can't just use x/y because they include the orig changes
    var h = room.position.y2 - room.position.y;
    roomDraw(room.name,x,y,w,h);
    drawCastle(room.subgroups,x,y);
  });
}
generateSubgroup(features,rooms,1000,1000);


//console.log(JSON.stringify(rooms));
drawCastle(rooms,0,0);
save();
//log(randi(0,50));
