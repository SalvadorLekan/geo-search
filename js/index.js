const currentDate = new Date().getHours()
if(currentDate>18||currentDate<6){
    document.body.style.background='var(--white) url(./../assets/night.jpg) no-repeat fixed center/cover';
    document.body.style.color= 'var(--white)';
}

const form=document.getElementById('form');
const address=document.getElementById('address');
const locatio=document.getElementById('location');
const cityHeader=document.getElementById('city-header');
const tempHeader=document.getElementById('temp-data');
const skyHeader=document.getElementById('sky-data');
const pressureHeader=document.getElementById('pressure-data');
const weatherImage=document.getElementById('weather-image');
const humidity=document.getElementById('humidity');
const iframe=document.getElementById('iframe');

form.addEventListener('submit',e=>{
    e.preventDefault();
    if(address.value&&locatio.value){
        const fullAddress=`${address.value.trim()},${locatio.value.trim()}`.replace(/ +/g,'+');
        const state=locatio.value.trim().replace(/ +[, ]+|[, ]+/g,' ').split(' ')[0]
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${state}&appid=628904fcbcc368d6b240913148864136`)
        .then(data=>data.json())
        .then(data=>{
            cityHeader.innerText=`${data.name}, ${data.sys.country}`
            tempHeader.innerText=`${data.main.temp}`
            skyHeader.innerText= data.weather[0].description;
            weatherImage.setAttribute('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            humidity.innerHTML=`${data.main.humidity} <span>m<sup>3</sup></span>`;
            pressureHeader.innerText=`${data.main.pressure} Pa`
            locatio.value=''
            address.value=''
        })
        iframe.setAttribute('src',`https://www.google.com/maps/embed/v1/place?key=AIzaSyBby-Z83HvfSVAaAGGRwrV5O9AM83QBUcI&q=${fullAddress}`)
    }
})



//

// 
