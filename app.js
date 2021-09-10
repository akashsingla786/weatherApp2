const form=document.querySelector('form');
const input=document.getElementById('inp');
const info=document.getElementById('information');
const body=document.querySelector('body');


const apiKey='adc6eca57412ce5289933fb185fdf99b';

const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const months=['January','February','March','April','May','June','July','August','September','October','November','December'];



function getWeather(text){
    info.innerHTML="";
const url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}`

fetch(url).then((res)=>{
    return res.json();
})
.then((data)=>{
    var temp=data.main.temp -273.15;
    var tempMin=data.main.temp_min-273.15;
    var tempMax=data.main.temp_max-273.15;
    var currentdate=new Date();
    const content=`<h3>${data.name}, ${data.sys.country}</h3>
    <h3>${currentdate.getDate()} ${months[currentdate.getMonth()]} (${days[currentdate.getDay()]}), ${currentdate.getFullYear()}</h3>
    <br>
    <h2>${temp.toFixed(0)}&#176; C</h2>
    <p>${tempMin.toFixed(0)}&#176C (min)/ ${tempMax.toFixed(0)}&#176C (max)</p>
    <p>${data.wind.speed} <i class="fas fa-wind"></i></p>
   <h4>${data.weather[0].description} </h4>
    `

    if(data.weather[0].description.includes('mist'))
    {
        // body.style.backgroundImage=url(''./images/brokenclouds.jpg');
        
        body.style.backgroundImage="url('images/mist.jpg')";
        body.style.backgroundSize='cover';
    }
    else if(data.weather[0].description.includes('cloud'))
    {
        body.style.backgroundImage="url('images/brokenclouds.jpg')";
        body.style.backgroundSize='cover';
    }
    else if(data.weather[0].description.includes('rain')){
        body.style.backgroundImage="url('images/lightrain.jpg')";
        body.style.backgroundSize='cover';
    }
    else if(data.weather[0].description.includes('snow')){
        body.style.backgroundImage="url('images/snow.jpg')";
        body.style.backgroundSize='cover';
    }
    else if(data.weather[0].description.includes('haze') ||data.weather[0].description.includes('smoke'))
    {
        body.style.backgroundImage="url('images/haze.jpg')";
        body.style.backgroundSize='cover';
    }
else{
    body.style.backgroundImage="url('images/clearsky.jpg')";
    body.style.backgroundSize='cover';
}


    info.innerHTML=content;
    console.log(data);
})
.catch((err)=>{
    console.log(err);
})
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const text=form.elements[0].value;
    getWeather(text);
    form.elements[0].value="";
})
