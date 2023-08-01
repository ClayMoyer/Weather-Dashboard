const apiKey = 383dabcf23e380ff8582e432490f5e25
let today = dayjs()
let currentCity = document.querySelector("#currentCity")
let temperature = document.querySelector("#temperature")
let wind = document.querySelector("#wind")
let humidity = document.querySelector("#humidity")
let inputSearch = document.querySelector("#inputSearch")
let fiveDayForecast = document.querySelector("#fiveDayForecast")
let searchHistoryDisplayed = document.querySelector("#searchHistoryDisplayed")
let searchHistory = []

