const searchForm = document.getElementById('weatherSearch')
const locationInput = document.getElementById('location')
const errorBox = document.getElementById('error')
const forecastBox = document.getElementById('forecast')
const forecastLocationBox = document.getElementById('forecastLocation')

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = locationInput.value

    getWeatherForecast(location)
})

const getWeatherForecast = (location) => {
    errorBox.textContent = ''
forecastLocationBox.textContent = ''
    forecastBox.textContent = 'Loading...'

    fetch(`/weather?address=${location}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if (data.error) {
                errorBox.textContent = data.error
                forecastBox.textContent = ''
                return
            }

            forecastBox.innerHTML = data.summary
            forecastLocationBox.innerText = data.location
        })
}