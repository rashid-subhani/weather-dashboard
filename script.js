          //OpenWeatherMap API to get weather data
        const apiKey = '79d4bf887f35318f325936bf38d2e5ba';
        const searchForm = document.getElementById('search-form');
        const searchInput = document.getElementById('search-input');
        const today = $('#today');
        const searchButton = document.getElementById('search-button');
        const currentWeather = document.getElementById('current-weather');
        const forecastEl = document.getElementById('forecast');

        //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

        function getCurrentWeather(city){
            fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey)
            .then(function (response){
                return  response.json()
            })
            .then(function(data){
                console.log(data);
                displayCurrentWeather(data)
            })
            
        }
      function displayCurrentWeather(currentdata){
        var h1 = $("<h1>");
        var currentTemp = $("<p>");
        currentTemp.text("Current Temperature: "+currentdata.main.temp+ " °C");
        h1.text(currentdata.name);
        today.append(h1);
        today.append(currentTemp);
      }
            
        searchButton.addEventListener('click', function(e){
            e.preventDefault();
            // console.log(searchInput.value);
            getWeatherForecast(searchInput.value);
            getCurrentWeather(searchInput.value);
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
                console.error("Error fetching weather data:", error);
            });
        }
        
function displayfivedayForecast(forecast){
    //Clear previous forecast data
    forecastEl.innerHTML = "";
    for (let i = 7; i < forecast.length; i += 8) {
        console.log(forecast[i]);
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
        forecastEl.appendChild(forecastContainer);
}
}






{/* <div class="jumbotron">
<div class="container">
    <h3>Check Current Weather</h3>
    <form id="form-submit">
        <div class="form-group">
            <label>City Name:</label>
            <input type="text" class="form-control" id="city" placeholder="ex: London">
            <button type="submit" class="btn btn-primary mt-3">Submit</button>
        </div>
    </form>
    <p id="city-name"></p>
    <p id="city-weather"></p>
    <p id="city-temp"></p>
</div> */}