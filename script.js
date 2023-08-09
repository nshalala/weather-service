"use strict";


getWeatherData('Baku');
displayCityImg('Baku');

let form = document.querySelector('form');
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let input = document.querySelector('.city-search');
    let city = input.value;
    input.value = '';
    getWeatherData(city);
    displayCityImg(city);
})

async function getWeatherData(city){
    let API_KEY = 'c1d66114f5f919acf2a4750d4f98aff9';
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    let data = await response.json();
    displayData(data);
    displayBgImg(data.weather[0].description);
}


function displayData(data){
    let card = `<h3 class="card-title fw-bold text-center py-2">${data.name}</h3>
                <table class="table bg-transparent">
                    <tr>
                        <th scope="col">Temperature</th>
                        <th scope="col">${convertToCelcius(data.main.temp)}°C</th>
                    </tr>
                    <tr>
                        <th scope="col">Humidity</th>
                        <th scope="col">${data.main.humidity}%</th>
                    </tr>
                    <tr>
                        <th scope="col">Weather description</th>
                        <th scope="col">${data.weather[0].description}</th>
                    </tr>
                    <tr>
                        <th scope="col">Speed of wind</th>
                        <th scope="col">${data.wind.speed} km/h</th>
                    </tr>
                </table>`;
    document.querySelector('.card-body').innerHTML = card;
}

async function getImg(searchFor){
    let API_KEY = 'HGnJxkIsPNJ-EqcpNBEruzIsaJpEdf-R_3PxHOK_t1k';
    let response = await fetch(`https://api.unsplash.com/search/photos/?client_id=${API_KEY}&page=1&per_page=1&query=${searchFor}`);
    let data = await response.json();
    return data.results[0].urls.full;
}

async function displayBgImg(desc){
    let url = await getImg(desc);
    document.querySelector('body').style.backgroundImage = `url('${url}')`;
}

async function displayCityImg(city){
    let img = `<img src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" class="img-fluid rounded-5 " alt="..." />`;
    document.querySelector('.city-img').innerHTML = img;
    let url = await getImg(city);
    document.querySelector('.city-img img').src = url;
}

function convertToCelcius(k){
    let c = Math.round(k-273.15);
    return c;
}