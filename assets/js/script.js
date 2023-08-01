const apiKey = "383dabcf23e380ff8582e432490f5e25"
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
            temperature.textContent = "Temp: " + data.main.temp + " °F"
            wind.textContent = "Wind: " + data.wind.speed + " MPH"
            humidity.textContent = "Humidity: " + data.main.humidity + " %"
            weatherIcon.scr = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
            currentCity.append(weatherIcon)
        })
    })
}

function weatherFiveDayForecast(city) {
    fiveDayForecast.innerHTML = "";
    fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey)
    .then(response => response.json())
    .then(data => {
        fetch("http://api.openweathermap.org/data/2.5/forecast?lat=" + data[0].lat + "&units=imperial&lon=" + data[0].lon + "&appid=" + apiKey)
        .then(response => response.json())
        .then(data => {
            for(let i=2; i < data.list.length; i += 8){
                let currentWeather = data.list[i]
                let card = document.createElement("div")
                card.classList.add("card", "bg-dark", "text-white", "col-2")
                let cardBody = document.createElement("div")
                cardBody.classList.add("card-body")
                card.append(cardBody)
                let cardTitle = document.createElement("h5")
                cardTitle.classList.add("card-header")
                cardTitle.innerText = dayjs.unix(currentWeather.dt).format("MM/DD/YYYY")
                cardBody.append(cardTitle)
                let cardIcon = document.createElement("img")
                cardIcon.setAttribute("src", "http://openweathermap.org/img/w/" + currentWeather.weather[0].icon + ".png")
                cardBody.append(cardIcon)
                let cardTemperature = document.createElement("p")
                cardTemperature.classList.add("card-text")
                cardTemperature.innerText = "Temp: " + currentWeather.main.temp + " °F"
                cardBody.append(cardTemperature)
                let cardWind = document.createElement("p")
                cardWind.classList.add("card-text")
                cardWind.innerText = "Wind: " + currentWeather.wind.speed + " MPH"
                cardBody.append(cardWind)
                let cardHumid = document.createElement("p")
                cardHumid.classList.add("card-text")
                cardHumid.innerText = "Humidity: " + currentWeather.main.humidity + " %"
                cardBody.append(cardHumid)
                fiveDayForecast.append(card)
            }
        })
    })
}

function saveSearchHistory(city) {
    if(!searchHistoryArr.includes(city)){
        searchHistoryArr.push(city)
        historyBtn(city)
        localStorage.setItem("currentCity", JSON.stringify(searchHistoryArr))
    }
}

function searchHistory() {
    searchHistoryDisplayed.innerHTML = "<h1>History</h1>"
    JSON.parse(localStorage.getItem("currentCity")) ? searchHistoryArr = JSON.parse(localStorage.getItem("currentCity")) : searchHistoryArr = []
    searchHistoryArr.forEach(city => {
        historyBtn(city)
    })
}

function historyBtn(city) {
    let historyBtnItem = document.createElement("button")
    historyBtnItem.classList.add("btn", "btn-secondary", "w-25", "col-2", "mb-2")
    historyBtnItem.textContent = city
    historyBtnItem.addEventListener("click", () => {
        weatherCurrentCity(historyBtnItem.textContent)
        weatherFiveDayForecast(historyBtnItem.textContent)
    })
    searchHistoryDisplayed.append(historyBtnItem)
    searchHistoryDisplayed.append(document.createElement("br"))
}

function retrieveCity() {
    weatherCurrentCity(inputSearch.value)
    weatherFiveDayForecast(inputSearch.value)
}