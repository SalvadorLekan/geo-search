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
const useLocation =document.getElementById('use-location');
let temperature='Celsius'
const menu = document.getElementById('dot-menu')
const changeTemp = document.getElementById("change-temp-calc")
const pop = document.getElementById("popup")
const modeToggle = document.getElementById("mode-toggle")
const lightThemes =document.querySelectorAll('.light')
const lighterThemes =document.querySelectorAll('.light-secondary')
modeToggle.checked=false;
const textlightThemes =document.querySelectorAll('.text-light')
const textlighterThemes =document.querySelectorAll('.text-light-secondary')
const bglightThemes =document.querySelectorAll('.bg-light')
const bglighterThemes =document.querySelectorAll('.bg-light-secondary')


const currentHour = new Date().getHours()
modeToggle.onchange=()=>{
    const darkThemes =document.querySelectorAll('.dark')
    const darkerThemes =document.querySelectorAll('.dark-secondary')
    const textdarkThemes =document.querySelectorAll('.text-dark')
    const textdarkerThemes =document.querySelectorAll('.text-dark-secondary')
    const bgdarkThemes =document.querySelectorAll('.bg-dark')
    const bgdarkerThemes =document.querySelectorAll('.bg-dark-secondary')
    switch (modeToggle.checked) {
        case true:
            lightThemes.forEach(theme=>{
                theme.classList.replace('light','dark')
            })
            lighterThemes.forEach(theme=>{
                theme.classList.replace('light-secondary','dark-secondary')
            })
            textlightThemes.forEach(theme=>{
                theme.classList.replace('text-light','text-dark')
            })
            textlighterThemes.forEach(theme=>{
                theme.classList.replace('text-light-secondary','text-dark-secondary')
            })
            bglightThemes.forEach(theme=>{
                theme.classList.replace('bg-light','bg-dark')
            })
            bglighterThemes.forEach(theme=>{
                theme.classList.replace('bg-light-secondary','bg-dark-secondary')
            })    
            break;
            case false:
                darkThemes.forEach(theme=>{
                    theme.classList.replace('dark','light')
                })
                darkerThemes.forEach(theme=>{
                    theme.classList.replace('dark-secondary','light-secondary')
                })
                textdarkThemes.forEach(theme=>{
                    theme.classList.replace('text-dark','text-light')
                })
                textdarkerThemes.forEach(theme=>{
                    theme.classList.replace('text-dark-secondary','text-light-secondary')
                })
                bgdarkThemes.forEach(theme=>{
                    theme.classList.replace('bg-dark','bg-light')
                })
                bgdarkerThemes.forEach(theme=>{
                    theme.classList.replace('bg-dark-secondary','bg-light-secondary')
                })    
                break;
                default:
                    break;
                }
            }
    
            
            menu.onclick=()=>{
                pop.style.zIndex=1
            };
            pop.onclick=()=>{
                pop.style.zIndex=-1
            }
            changeTemp.onclick=()=>{
                tempHeader.innerText= 
                temperature==='Celsius'?
                Math.round((parseInt(tempHeader.innerText)*9/5)+32)+'°'
                :
                Math.round((parseInt(tempHeader.innerText)-32)*5/9)+'°';
                changeTemp.innerText=temperature==='Celsius'?
                'Change to Celcius.':
                'Change to Fahrenheit.'
                temperature=temperature==='Celsius'?'Fahrenheit':'Celsius'
            }
            
            form.addEventListener('submit',e=>{
                e.preventDefault();
                if(address.value&&locatio.value){
                    const fullAddress=`${address.value.trim()},${locatio.value.trim()}`.replace(/ +/g,'+');
                    const facebookShare=fullAddress.replace(/\+/g,'%2B').replace(/,/g,'%2C')
                    const state=locatio.value.trim().replace(/ +[, ]+|[, ]+/g,' ').split(' ')[0]
                    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=628904fcbcc368d6b240913148864136`)
                    .then(data=>data.json())
                    .then(data=>{
                        const temppp= parseInt(data.main.temp-273.15);
                        const tempp= temperature==='Celsius'?temppp:Math.round((temppp*9/5)+32);
                        cityHeader.innerText=`${data.name}, ${data.sys.country}`
                        tempHeader.innerText=`${tempp}°`
                        skyHeader.innerText= data.weather[0].description;
                        weatherImage.setAttribute('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
                        humidity.innerHTML=data.main.humidity;
                        pressureHeader.innerText=`${data.main.pressure} Pa`
                        locatio.value=''
                        address.value=''
                    })
                    iframe.setAttribute('src',`https://www.google.com/maps/embed/v1/place?key=AIzaSyBby-Z83HvfSVAaAGGRwrV5O9AM83QBUcI&q=${fullAddress}`)
                    share.setAttribute('src',`https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fwww.google.com%2Fmaps%2Fsearch%2F%3Fapi%3D1%26query%3D${facebookShare}&layout=button&size=large&width=77&height=28&appId`)
                }
            })
            let lat,lon
            
            useLocation.onclick=()=>{
                navigator.geolocation.getCurrentPosition(pos=>{
                    lat=pos.coords.latitude
                    lon=pos.coords.longitude
                    const fullAddress=`${lat},${lon}`.replace(/ +/g,'+');
                    const facebookShare=fullAddress.replace(/\+/g,'%2B').replace(/,/g,'%2C')
                    if(lat&&lon){
                        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=628904fcbcc368d6b240913148864136`)
                        .then(data=>data.json())
                        .then(function (data) {
                            const temppp= parseInt(data.main.temp-273.15);
                            const tempp= temperature==='Celsius'?temppp:Math.round((temppp*9/5)+32);
                            cityHeader.innerText=`${data.name}, ${data.sys.country}`
                            tempHeader.innerText=`${tempp}°`
                            skyHeader.innerText= data.weather[0].description;
                            weatherImage.setAttribute('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
                            humidity.innerHTML=data.main.humidity;
                            pressureHeader.innerText=`${data.main.pressure} Pa`
                            locatio.value=''
                            address.value=''
                        })
                        iframe.setAttribute('src',`https://www.google.com/maps/embed/v1/place?key=AIzaSyBby-Z83HvfSVAaAGGRwrV5O9AM83QBUcI&q=${fullAddress}`)
                        share.setAttribute('src',`https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fwww.google.com%2Fmaps%2Fsearch%2F%3Fapi%3D1%26query%3D${facebookShare}&layout=button&size=large&width=77&height=28&appId`)
                    }
                })}
setTimeout(()=>{
    if(currentHour>18||currentHour<7){
modeToggle.checked=true;
lightThemes.forEach(theme=>{
    theme.classList.replace('light','dark')
})
lighterThemes.forEach(theme=>{
    theme.classList.replace('light-secondary','dark-secondary')
})
textlightThemes.forEach(theme=>{
    theme.classList.replace('text-light','text-dark')
})
textlighterThemes.forEach(theme=>{
    theme.classList.replace('text-light-secondary','text-dark-secondary')
})
bglightThemes.forEach(theme=>{
    theme.classList.replace('bg-light','bg-dark')
})
bglighterThemes.forEach(theme=>{
    theme.classList.replace('bg-light-secondary','bg-dark-secondary')
})  
} 
}, 1000)