let cityName=document.querySelector(".weather-city");
let dateTime=document.querySelector(".weather-datetime");
let wForecast=document.querySelector(".weather-forecast");
let wIcon=document.querySelector(".weather-icon");
let wMin=document.querySelector(".weather-min");
let wMax=document.querySelector(".weather-max");
let wTemperature=document.querySelector(".weather-temperature");
let wFeelsLike=document.querySelector(".weather-feelslike");
let wWind=document.querySelector(".weather-wind");
let wHumidity=document.querySelector(".weather-humidity");
let wPressure=document.querySelector(".weather-pressure");
const getDateTime=(dt,timezone)=>{
    const utcTime = dt * 1000;
    
    // 2. Add the city's custom offset (seconds to milliseconds)
    const cityLocalTime = utcTime + (timezone * 1000);
    
    // 3. Create a date object with the shifted time
    const curDate = new Date(cityLocalTime)
    // const curDate = new Date((dt + timezone) * 1000);
    // const curDate=new Date(dt*1000);
    const options={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
        hour12:true,
        timeZone:"UTC"
    };
    const formatter=new Intl.DateTimeFormat("en-US",options);
    const formatteddate=formatter.format(curDate);
    return formatteddate;
}
const getCountryName=(code)=>{
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
    
}
let city="delhi";
let citysearch=document.querySelector(".weather-form");
citysearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityname=document.querySelector(".city-name");
    console.log(cityname.value);
    city=cityname.value;
    getWeatherData();
    cityname.value="";
})
const getWeatherData=async()=>{
    const weatherURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=MY_API_KEY`;
    try {
        const res=await fetch(weatherURL);
        const data=await res.json();
        const {main,name,weather,wind,sys,dt,timezone}=data;
        console.log(data);
        cityName.innerHTML=`${name},${getCountryName(sys.country)}`;
        dateTime.innerHTML=getDateTime(dt,timezone);
        wTemperature.innerHTML=`Temp: ${main.temp}&#176`;
        wMin.innerHTML=`Min: ${main.temp_min}&#176`;
        wMax.innerHTML=`Max: ${main.temp_max}&#176`;
        wFeelsLike.innerHTML=`${main.feels_like}&#176`;
        wHumidity.innerHTML=`${main.humidity}%`;
        wWind.innerHTML=`${wind.speed} m/s`;
        wPressure.innerHTML=`${main.pressure} hPa`;
        wForecast.innerHTML=`${weather[0].main}`;
        wIcon.innerHTML=`<img src=http://openweathermap.org/img/wn/${weather[0].icon}@4x.png>`;
    } catch (error) {
        console.log(error);
    }

}
document.body.addEventListener("load",getWeatherData());