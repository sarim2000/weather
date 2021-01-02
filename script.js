let inp = document.querySelector('input');
let img = document.querySelector('img');
let frm = document.getElementById('location');
const main = document.getElementById('weather');
const name1 = document.getElementById('name');
const temp = document.getElementById('temp');
let weat = document.createElement('h1');
let namex = document.createElement('h2');
let tempx = document.createElement('h1');

let x = "kolkata";

frm.addEventListener('submit',(e) => {
    e.preventDefault();
    console.log(inp.value);
    x = inp.value;
    inp.value = "";
    weat.innerHTML = "";
    namex.innerHTML = "";
    tempx.innerHTML = "";
    getWeather();
});

let getWeather = async () => {
    let response = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+x+'&appid=cdb3748b80ce6230213173f0d306d0e1');
    if (response.status === 404){
        throwError();
    }
    else{
        const data = await response.json();
        processData(data);
        
    }
};


function processData(weatherData){
    if (weatherData.weather[0].main === "Rain" || weatherData.weather[0].main === "Drizzle" || weatherData.weather[0].main === "Thunderstorm")
    {
        img.src = "images/overcast.jpg";
    }
    else if (weatherData.weather[0].main === "Clouds"){
        img.src = "images/cloudy.jpg";
    }
    else if (weatherData.weather[0].main === "Snow"){
        img.src = "images/snow.jpg";
    }
    else if (weatherData.weather[0].main === "Mist"){
        img.src = "images/mist.jpg";
    }
    else{
        img.src = "images/sunny.jpg";
    }

    
    
    weat.innerHTML = weatherData.weather[0].main;
    main.appendChild(weat);

     
     namex.innerHTML = x;
     name1.appendChild(namex);


    
    tempx.innerHTML =  (weatherData.main.temp - 273.15) + "°C";
    temp.appendChild(tempx);
}
  



function throwError(){
    img.src = 'images/try.jpg';
}
