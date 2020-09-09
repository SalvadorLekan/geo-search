const currentDate = new Date().getHours()
console.log(currentDate>18||currentDate<6)
document.body.style.background=(currentDate>18||currentDate<6)&&'var(--primary) url(./../assets/night.jpg) center/cover'