document.getElementById("go").addEventListener("click", getTodayWeather);

async function getTodayWeather() {
    const now = new Date();
    const currentHour = now.getHours();
    const url = "https://api.open-meteo.com/v1/forecast?latitude=41.45&longitude=-70.6&hourly=temperature_2m,uv_index,precipitation_probability,precipitation&forecast_days=1&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch"
    const response = await fetch(url);
    const weather = await response.json();
    const data = weather.hourly;
    console.log(data)
    const temps = data.temperature_2m.slice(currentHour);
    const times = data.time;
    const relevantTimes = times.slice(currentHour);
    const UVs = data.uv_index.slice(currentHour);
    const precipChance = data.precipitation_probability.slice(currentHour);
    const precipAmount = data.precipitation.slice(currentHour);

    
    for(i = 0; i < relevantTimes.length; i++) {
        let date = new Date(relevantTimes[i]);
        console.log(date);
        let hour = date.getHours();
        console.log(hour)
        let afternoon;
        let finalHour;
        if (hour > 12) {
            finalHour = hour - 12;
            afternoon = "pm"
        } else if (hour === 12) {
            finalHour = hour;
            afternoon = "pm"
        } else {
            finalHour = hour;
            afternoon = "am"
        }

        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.innerHTML = finalHour + afternoon;
        row.appendChild(cell);
        document.getElementById("table").appendChild(row);
    }

    alert(Math.max(...precipAmount))

    for (i = 0; i < temps.length; i++) {
        const targetRow = document.getElementById("table").rows[i+1];
        const newCell = document.createElement("td");
        if (temps[i] === Math.max(...temps)) {
            newCell.style.backgroundColor = "yellow";
        }
        newCell.innerHTML = temps[i] + ' &degF'
        targetRow.appendChild(newCell);
        console.log(newCell.getAttribute("class"))
    }


    for (i = 0; i < UVs.length; i++) {
        const targetRow = document.getElementById("table").rows[i+1];
        const cell = document.createElement("td");
        cell.innerHTML = UVs[i];
        targetRow.appendChild(cell);
        if (UVs[i] === Math.max(...UVs)) {
            cell.style.backgroundColor = "orange"
        }

    }

    for (i = 0; i < precipChance.length; i++) {
        const targetRow = document.getElementById("table").rows[i+1];
        const newCell = document.createElement("td");
        newCell.innerHTML = precipChance[i] + '%'
        targetRow.appendChild(newCell);
        if (precipChance[i] === Math.max(...precipChance)) {
            newCell.style.backgroundColor = "blue";
        }
    }

    for (i = 0; i < precipAmount.length; i++) {
        const targetRow = document.getElementById("table").rows[i+1];
        const newCell = document.createElement("td");
        if (precipAmount[i] === Math.max(...precipAmount) && precipAmount[i] !== 0) {
            newCell.style.backgroundColor = "blue";
        }
        newCell.innerHTML = precipAmount[i] + " inches";
        targetRow.appendChild(newCell);
        
    }


    document.getElementById("now").innerHTML = now.getHours();
}