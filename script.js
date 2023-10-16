let rainSum1
let mult = 0.003
let points = []


function setup(){
  createCanvas(windowWidth, windowHeight)
  apiRequest() 
  
  background(20)
  angleMode(DEGREES) 
  noiseDetail(1)
  
  
  var density = 20; 
  var space = width / density 
  
  //create for loops for width & height to store points 
  for (var x = 0; x < width; x += space){
    for (var y = 0; y< height; y+= space){
  //create an array and push points to the array
      var p = createVector (x+random(-10,10),y+random(-10,10)) 
      points.push(p)
    }
  }
  
}

function draw(){ 
  
  noStroke()

  
  //Acess every number in the array 
 
  if(rainSum1 != undefined) { 
  
    for (let i = 0; i<rainSum1.length; i++) {
     //if rain sum number <1, color pink 
      if (rainSum1[i] <3){ 
     fill(255, 168, 199)
    for (var j = 0; j <366; j++){
  // add a vector to each point based on the angle 
    var angle1 = map(noise(points[j].x * mult, points[j].y * mult),0,1,0,720)
    
    points[j].add(createVector(cos(angle1), sin(angle1)))
    
//draw circle at each point, vary the size of circle based on daily rainSum 
     let size1 = map(rainSum1[i],0,100,0,10)   
    ellipse(points[j].x, points[j].y, size1)
  }
        
        
        
     } else { 
        // if rain sum number > 1, color blue 
     fill(122, 204, 255)
     
      for (var k = 0; k <366; k++){
  // add a vector to each point based on the angle 
    var angle2 = map(noise(points[k].x * mult, points[k].y * mult),0,1,0,720)
    
    points[k].add(createVector(cos(angle2), sin(angle2)))
    
//draw circle at each point, vary the size of circle based on daily rainSum 
     let size1 = map(rainSum1[i],0,100,0,10)   
    ellipse(points[k].x, points[k].y, size1)
  }
    
     }    
    
  }

}

}


async function apiRequest() {
  
let request = await fetch("https://climate-api.open-meteo.com/v1/climate?latitude=40.7143&longitude=-74.006&start_date=2022-10-15&end_date=2023-10-15&models=CMCC_CM2_VHR4,FGOALS_f3_H,HiRAM_SIT_HR,MRI_AGCM3_2_S,EC_Earth3P_HR,MPI_ESM1_2_XR,NICAM16_8S&temperature_unit=fahrenheit&timezone=America%2FNew_York&daily=rain_sum,snowfall_sum") 

console.log(request) 
  
  let data = await request.json() 
  console.log(data) 
  
  let dailyTemps = data.daily 
  console.log(dailyTemps) 
  

rainSum1 = dailyTemps.rain_sum_HiRAM_SIT_HR
console.log(rainSum1)

  
}