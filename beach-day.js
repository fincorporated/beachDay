async function getTodayWeather() {
    const now = new Date();
    const currentHour = now.getHours();
    const url = "https://api.open-meteo.com/v1/forecast?latitude=41.45&longitude=-70.6&hourly=temperature_2m,weather_code,cloud_cover,uv_index,precipitation_probability,precipitation&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch"
    const response = await fetch(url);
    const weather = await response.json();
    const data = weather.hourly;

    const times = data.time.slice(currentHour);
    const temps = data.temperature_2m.slice(currentHour);
    const weatherCode = data.weather_code.slice(currentHour);
    const cloudCover = data.cloud_cover.slice(currentHour);
    const UVs = data.uv_index.slice(currentHour);
    const precipChance = data.precipitation_probability.slice(currentHour);
    const precipAmount = data.precipitation.slice(currentHour);

    let hourlyRows = [];
    for (i = 0; i < times.length; i++) {
        const hourData = {
            time: times[i],
            temp: temps[i],
            cloudCover: cloudCover[i],
            UV: UVs[i],
            precipitationChance: precipChance[i],
            precipitationAmount: precipAmount[i]
        }
        hourlyRows.push(hourData)
    }

    
}