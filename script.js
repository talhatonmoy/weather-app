const form = document.getElementById('form')

form.addEventListener('submit', work);

function work(e) {
    e.preventDefault();

    const givenLocation = document.getElementById('location').value
    const temp = document.getElementById('temp');
    const weatherIcon = document.getElementById('w-icon')
    const weatherDesc = document.getElementById('w-desc')
    const locationName = document.getElementById('location-name')
    const localTime = document.getElementById('w-time')
    const humidity = document.getElementById('w-humidity')
    const pressure = document.getElementById('w-pressure')
    const wind = document.getElementById('w-wind')



    const URL = `https://api.weatherapi.com/v1/current.json?key=c5df16dfd56b45258d154259232006&q=${givenLocation}&aqi=no`
    let data;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', URL, true);
    xhr.onload = function () {
        if (this.status === 200) {
            data = this.responseText;
            data = JSON.parse(data)
            console.log(data)

            /**
             * Pushing Values to Frontend
             */

            //Temperature
            temp.innerHTML = data.current.temp_c + "&deg"

            //Icon
            weatherIcon.src = data.current.condition.icon

            //Weather Description
            weatherDesc.innerHTML = data.current.condition.text

            //Location Name
            locationName.innerHTML = data.location.name

            //Time
            let timeData = data.location.localtime
            localTime.innerHTML = formatTime(timeData);

            //Humidity
            humidity.innerHTML = data.current.humidity + "%"

            //Pressure
            pressure.innerHTML = data.current.pressure_mb + 'mB'

            //Wind
            wind.innerHTML = data.current.wind_kph + ' km/h'

        } else {
            alert('Something Went Wrong')
        }
    }
    xhr.send()



}



/**
 * Function for formating time
 */

function formatTime(inputTime) {
    let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const time = new Date(inputTime);

    daysOfWeek = daysOfWeek[time.getDay()]

    formattedTime = new Intl.DateTimeFormat('en-us', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }).format(time);

    return `${daysOfWeek}, ${formattedTime}`
}


