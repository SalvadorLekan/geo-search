const currentDate = new Date().getHours()
if(currentDate>18||currentDate<6){
    document.body.style.background='var(--white) url(./../assets/night.jpg) no-repeat fixed center/cover';
    document.body.style.color= 'var(--white)';
}

//http://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=628904fcbcc368d6b240913148864136

// / +[, ]+|[, ]+/g 
