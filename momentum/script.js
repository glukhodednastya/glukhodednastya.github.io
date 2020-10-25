let wrapper = document.querySelector('.wrapper');
let date = document.querySelector('.date');
let time = document.querySelector('.time');
let greeting = document.querySelector('.greeting');
let name = document.querySelector('.name');
let focusEnter = document.querySelector('.focusEnter');

let location2 = document.querySelector('.location2');
let weather = document.querySelector('.weather');
let windAndHumidity = document.querySelector('.windAndHumidity');
let condition = document.querySelector('.condition');
let weatherImage = document.querySelector('.weather__up_image');

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const daysOfTheWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];


let hours = null;
let counter = null;

function showTime() {
    let defineTime = new Date();

    let dayofWeek = defineTime.getDay();
    let month = defineTime.getMonth();
    let day = defineTime.getDate();
    date.innerHTML = `${daysOfTheWeek[dayofWeek]}, ${day} ${months[month]}`;

    hours = defineTime.getHours();
    if (!counter) counter = hours;
    let minutes = defineTime.getMinutes();
    let seconds = defineTime.getSeconds();
    time.innerHTML = `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;

    if (minutes === 0 && seconds === 0) {
        setBackground();
        getWeather();
        if (hours % 6 === 0) setGreeting();
    }

    setTimeout(showTime, 1000);
}

function addZero(int) {
    if (int < 10) int = '0' + int.toString()
    else int = int.toString();
    return int;
}

function randomArray(lengthRequired = 6, quantityOfImages = 20) {
    let arr = [];
    for (let i = 1; i <= quantityOfImages; i++) {
        arr.push(i);
    }
    for (let j = arr.length - 1; j > 0; j--) {
        let k = Math.floor(Math.random() * (j + 1));
        [arr[j], arr[k]] = [arr[k], arr[j]];
    }
    arr = arr.slice(0, lengthRequired);
    arr = arr.map(item => addZero(item));
    return arr;
}


const timesOfTheDayArray = [
    'night',
    'morning',
    'afternoon',
    'evening',
];

const timesOfTheDayObject = {
    'night': randomArray(),
    'morning': randomArray(),
    'afternoon': randomArray(),
    'evening': randomArray(),
};

function setBackground(value) {
    if (value == undefined) counter = hours;
    let mod = timesOfTheDayArray[Math.floor((counter % 24) / 6)];
    let div = counter % 6;

    let img = document.createElement('img');
    let src = `assets/images/${mod}/${timesOfTheDayObject[mod][div]}.jpg`;
    // console.log(src);
    img.src = src;
    img.onload = () => (wrapper.style.backgroundImage = `url(${src})`);
}


function setGreeting() {
    let greet = timesOfTheDayArray[Math.floor(hours / 6) % 4];
    greeting.innerHTML = `Good ${greet}, `;
}

function refreshValue(event) {
    event.target.innerText = '';
}

function setValue(event) {
    let target = event.target;
    if (event.type === 'keypress') {
        if (event.which == 13 || event.keyCode === 13) {
            if (!target.innerText.toString().trim() == '' && !target.innerText.includes('[Enter ')) {
                localStorage.setItem(target.className, target.innerText);
            }
            target.blur();
        }
    } else if (event.type === 'blur') {
        if (target.innerText.toString().trim() == '' || target.innerText.includes('[Enter ')) {
            if (target.className === 'name') getName()
            else if (target.className === 'focusEnter') getFocus()
            else if (target.className === 'location2') getLocation();
        } else {
            localStorage.setItem(target.className, target.innerText);
            if (target.className === 'location2' || location2.contains(target)) getWeather();
        }
    }
}

function getName() {
    let loc = localStorage.getItem('name');
    if (loc == null || loc.toString().trim() === '') name.innerText = '[Enter your name]'
    else name.innerText = loc;
}

function getFocus() {
    let loc = localStorage.getItem('focusEnter');
    if (loc == null || loc.toString().trim() === '') focusEnter.innerText = '[Enter your goal]'
    else focusEnter.innerText = localStorage.getItem('focusEnter');
}


let iconBackground = document.querySelector('.icon__background');
let iconBackgroundSvg = document.querySelector('.icon__background__svg');

iconBackground.addEventListener('click', (event) => {
    if (event.target === iconBackground || iconBackground.contains(event.target)) {
        event.preventDefault();
        if (iconBackgroundSvg.classList.contains('icon__rotate-in-process')) return ;

        counter++;
        setBackground(counter);

        iconBackgroundSvg.classList.add('icon__rotate-in-process');
        setTimeout(() => {
            iconBackgroundSvg.classList.remove('icon__rotate-in-process');
        }, 800);
    }
});


let quoteEn = document.querySelector('.quote__en');
let quoteAuthor = document.querySelector('.quote__author');

let iconQuote = document.querySelector('.icon__quote');
let iconQuoteSvg = document.querySelector('.icon__quote__svg');

iconQuote.addEventListener('click', (event) => {
    if (event.target === iconQuote || iconQuote.contains(event.target)) {
        event.preventDefault();
        if (iconQuoteSvg.classList.contains('icon__rotate-in-process')) return ;

        getQuote();

        iconQuoteSvg.classList.add('icon__rotate-in-process');
        setTimeout(() => {
            iconQuoteSvg.classList.remove('icon__rotate-in-process');
        }, 800);
    }
});

let apiQuote = `https://programming-quotes-api.herokuapp.com/quotes/lang/en`;
function getQuote() {
    fetch(apiQuote)
    .then(response => {
        if (response.status === 403 || response.status === 501) {
            alert(`Bad connection with server. Error code: ${response.status}`);
        } else return response.json();
    })
    .then(data => {
        let randomNumber = Math.floor(Math.random() * (data.length + 1));

        while (data[randomNumber].en.length > 240) randomNumber = Math.floor(Math.random() * (data.length + 1));
        if (window.innerWidth < 370) {
            while (data[randomNumber].en.length > 180) randomNumber = Math.floor(Math.random() * (data.length + 1));
        }

        quoteEn.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>&#8220;${data[randomNumber].en}&#8221;</i>`;
        quoteAuthor.innerHTML = `<i>- ${data[randomNumber].author}</i>`;
    });
}

function getLocation() {
    let loc = localStorage.getItem('location2');
    if (loc == null || loc.toString().trim() === '') location2.innerText = '[Enter your location]'
    else location2.innerText = localStorage.getItem('location2');
}

async function getWeather() {
    let locationForApi = location2.innerText;
    if (locationForApi.includes('[Enter your location]')) return ;

    if (locationForApi.toLowerCase().includes('Санкт-Петербург')) locationForApi = 'Saint Petersburg';
    const url = `https://api.weatherapi.com/v1/current.json?key=5aac674802804240a6691136200509&q=${locationForApi}`;
    const response = await fetch(url);

    if (response.status === 400 || response.status === 403 || response.status === 501) {
        if (response.status === 400) alert('Invalid location')
        else alert(`Bad connection with server. Error code: ${response.status}`);
        weather.innerText = '';
        windAndHumidity.innerText = '';
        condition.innerText = '';
        return ;
    }

    const data = await response.json();

    weather.innerText = `${data.current.temp_c} °C`;

    let weatherIconPath = data.current.condition.icon;
    weatherImage.innerHTML = `<img src="https:${weatherIconPath}" alt="weatherIconPath" width="50" height="50">`;

    let speedofWind = +(data.current.gust_kph / 3.6).toFixed(1);
    windAndHumidity.innerText = `Wind: ${speedofWind} m/s, humidity: ${data.current.humidity}%`;
    condition.innerText = data.current.condition.text;
}


name.addEventListener('click', refreshValue);
name.addEventListener('keypress', setValue);
name.addEventListener('blur', setValue);

focusEnter.addEventListener('click', refreshValue);
focusEnter.addEventListener('keypress', setValue);
focusEnter.addEventListener('blur', setValue);

location2.addEventListener('click', refreshValue);
location2.addEventListener('keypress', setValue);
location2.addEventListener('blur', setValue);


showTime();
setBackground();
setGreeting();
getName();
getFocus();
getQuote();
getLocation();
getWeather();