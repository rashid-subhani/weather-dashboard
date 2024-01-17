          //OpenWeatherMap API to get weather data
        const apiKey = '79d4bf887f35318f325936bf38d2e5ba';
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const today = document.getElementById('today');
        const searchButton = document.getElementById('search-button');
        const currentWeather = document.getElementById('current-weather');
        const forecast = document.getElementById('forecast');


      
            
        searchButton.addEventListener('click', function(e){
            e.preventDefault();
            // console.log(searchInput.value);
            getWeatherForecast(searchInput.value);
        })

        function getWeatherForecast(city){
            fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKey)
            .then(function (response){
              return  response.json()
            })
            .then(function(data){
            
            displayfivedayForecast(data.list);    
            })
            .catch(function(error){
                // console.error("Error fetching weather data:", error);
            });
        }
        
function displayfivedayForecast(forecast){
    //Clear previous forecast data
    // forecast.innerHTML = "";
    for (let i = 7; i < forecast.length; i += 8) {
        console.log(forecast[i])
        const  forecastContainer= document.createElement("div");
        forecastContainer.classList.add('forecast-item');
        const headingEl = document.createElement("h3")


        headingEl.textContent = forecast[i].dt_txt;

        const temperatureEl = document.createElement('p');
        temperatureEl.textContent = `temperature: ${forecast[i].main.temp} °C`;

        const humidityEl = document.createElement('p');
        humidityEl.textContent = `humidity: ${forecast[i].main.humidity}%`;

        // Adding forecast data to the container
        forecastContainer.appendChild(headingEl);
        forecastContainer.appendChild(temperatureEl);
        forecastContainer.appendChild(humidityEl);

        // Add the container to the forecast section
        forecast.appendChild(forecastContainer);
}
}