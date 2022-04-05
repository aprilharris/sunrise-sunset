// NYC LAT & LNG COORDINATES
// 40.78145545839007, -73.96676055707785

// API URL for NYC
// https://api.sunrise-sunset.org/json?lat=40.78145545839007&lng=-73.96676055707785

//display date
const currentDate = new Date();
document.getElementById("theDate").innerHTML = currentDate.toDateString();

//create xhr object
let request = new XMLHttpRequest();

//store API url in a variable
let url = "https://api.sunrise-sunset.org/json?lat=40.705684&lng=-74.014047";

//prepare request
request.open("GET", url, true);

//build callback function
request.onload = function() {

  //parse json data
  let data = JSON.parse(this.response);

    //validate xhr request
    if (request.status >= 200 && request.status < 400) {

        //update element content
        $("#sunrise").text(convertToEST(data.results.sunrise));
        $("#sunset").text(convertToEST(data.results.sunset));
    }

};

// TIME CONVERSION
  function convertToEST(utc) {

    let utcHours = utc.substr(0, utc.indexOf(":"));
    let utcMinSec = utc.substr(utc.indexOf(":")+1,utc.indexOf(" ")-2);
    let utcAP = utc.substr(utc.indexOf(" ")); 


    //subtract 5hrs if before DST, subtract 4hrs if after DST
    let est = parseInt(utcHours, 10) - 4;
if (est < 0){
           est = 12 +est;
       if (utcAP == " AM"){
             utcAP = "PM"
           }
       else if ( utcAP == " PM"){
             utcAP = "AM"
           }
         }

     if (utcHours >= 12){
       if (utcAP == " AM"){
             utcAP = "PM"
           }
       else if ( utcAP == " PM"){
             utcAP = "AM"
           }

         }

    est += ":" + utcMinSec + utcAP;
    return est;
    
};





//send the request
request.send();



