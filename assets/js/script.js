const apiKey = 383dabcf23e380ff8582e432490f5e25
let today = dayjs()
let currentCity = document.querySelector("#currentCity")
let temperature = document.querySelector("#temperature")
let wind = document.querySelector("#wind")
let humidity = document.querySelector("#humidity")
let inputSearch = document.querySelector("#inputSearch")
let fiveDayForecast = document.querySelector("#fiveDayForecast")
let searchHistoryDisplayed = document.querySelector("#searchHistoryDisplayed")
let searchHistoryArr = []

function weatherCurrentCity(city){
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial&appid=" + apiKey)
        .then(response => response.json())
        .then(data => {
            saveSearchHistory(data.name)
            let weatherIcon = document.createElement("img")
            currentCity.textContent = data.name + " (" + today.format("MM/DD/YYYY") + ")"
            temperature.textContent = "Temp: " + data.main.temp + "°F"
            wind.textContent = "Wind: " + data.wind.speed + "MPH"
            humidity.textContent = "Humidity: " + data.main.humidity + "%"
            weatherIcon.scr = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
            currentCity.append(weatherIcon)
        })
    })
}

function weatherFiveDayForecast(city) {

}

function saveSearchHistory() {

}

function searchHistory() {

}

function historyBtn() {

}

function searchCity() {

}