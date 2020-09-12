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
const share =document.getElementById('share');

form.addEventListener('submit',e=>{
    e.preventDefault();
    if(address.value&&locatio.value){
        const fullAddress=`${address.value.trim()},${locatio.value.trim()}`.replace(/ +/g,'+');
        const facebookShare=fullAddress.replace(/\+/g,'%2B').replace(/,/g,'%2C')
        const state=locatio.value.trim().replace(/ +[, ]+|[, ]+/g,' ').split(' ')[0]
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=628904fcbcc368d6b240913148864136`)
        .then(data=>data.json())
        .then(data=>{
            cityHeader.innerText=`${data.name}, ${data.sys.country}`
            tempHeader.innerText=`${parseInt(data.main.temp-273.15)}°`
            skyHeader.innerText= data.weather[0].description;
            weatherImage.setAttribute('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            humidity.innerHTML=data.main.humidity;
            pressureHeader.innerText=`${data.main.pressure} Pa`
            locatio.value=''
            address.value=''
        })
        console.log(facebookShare)
        iframe.setAttribute('src',`https://www.google.com/maps/embed/v1/place?key=AIzaSyBby-Z83HvfSVAaAGGRwrV5O9AM83QBUcI&q=${fullAddress}`)
        share.setAttribute('src',`https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fwww.google.com%2Fmaps%2Fsearch%2F%3Fapi%3D1%26query%3D${facebookShare}&layout=button&size=large&width=77&height=28&appId`)
    }
})



console.log(parseInt('30°'))

//

// 
