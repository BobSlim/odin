API_KEY = "16654b01f69a4df3b12143414230709"
let fmode = false

const handleSubmit = (event) => {
    event.preventDefault()
    const button = event.target
    const form = button.closest("form")
    const formData = new FormData(form)
    changeLocation(formData.get("loc"))
} 

const init = async () => {
}

const switchDegree = (event) => {
    const degrees = document.querySelectorAll(".degree")
    fmode = !fmode
    for (i of degrees) {
        i.innerText = fmode ? "°f" : "°c"
    }
    const temps = document.querySelectorAll(".temp")
    const tempCalc = fmode ? (f) => {return (f-32)*(5/9)} : (c) => {return c*1.8+32}
    for (i of temps) {
        const temp = Number(i.innerText)
        i.innerText = Math.round(tempCalc(temp * 10)) / 10
    }
}

const hookupDegrees = () => {
    const degrees = document.querySelectorAll(".degree")
    console.log(degrees)
    for (i of degrees) {
        i.addEventListener("click", event => switchDegree(event))
    }
}

const changeLocation = async (searchTerm) => {
    let weatherData = {}
    clearMain()
    findLocation(searchTerm).then((value) => {
        weatherData = processData(value)
    }).then(() => {
        const main = document.querySelector("main");
        generateMain(main, weatherData)
        hookupDegrees()
    })
}

const generateMain = (main, weatherData) => {
    main.appendChild(locationList(weatherData.location))
    main.style.backgroundColor = themeColor(weatherData.current.condition.text)
    const currentForecast = dayBanner(weatherData.current)
    currentForecast.style.gridColumnEnd = "span 2"
    main.appendChild(currentForecast);
    weatherData.forecast.forEach(element => {
        const newDayBanner = dayBanner(element)
        newDayBanner.style.backgroundColor = themeColor(element.condition.text)
        main.appendChild(newDayBanner)
    });
}

const findLocation = async (searchTerm) => {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchTerm}&days=3&aqi=no&alerts=no`)
    const jsonData = await response.json()
    return jsonData
}

const processData = (processingData) => {
    console.log(processingData)
    let output = {
        forecast: processingData.forecast.forecastday,
        current: processingData.current,
        location: processingData.location,
    }
    output.forecast = output.forecast.map(object => ({
        date: new Date(object.date),
        temp: object.day.avgtemp_c,
        condition: object.day.condition
    }))
    output.current = {
        date: new Date(output.current.last_updated),
        temp: output.current.temp_c,
        condition: output.current.condition,
    }
    output.location = {
        country: output.location.country, 
        name: output.location.name, 
        region: output.location.region, 
        localtime: output.location.localtime,
        }
    return output
}

const themeColor = (conditionText) => {
    const conditionString = conditionText.toLowerCase()
    if(conditionString.includes("rain")) {
        return "rgba(34, 102, 141, 0.5)";
    } else if (conditionString.includes("sun")) {
        return "rgba(255, 204, 112, 0.5)";
    };
    return "rgba(255, 250, 221, 0.5)";
}


const dayBanner = (dayData) => {
    const weekday = {
        0: "Monday",
        1: "Tuesday",
        2: "Wednesday",
        3: "Thursday",
        4: "Friday",
        5: "Saturday",
        6: "Sunday"
    }
    const newDiv = document.createElement("div")
    newDiv.classList.add("daybanner")
    newDiv.innerHTML = 
        /*html*/`
            <div>${weekday[dayData.date.getDay()]}</div>
            <div class="temperature"><span class="temp">${dayData.temp}</span><span class="degree">°c</span></div>
            <div>${dayData.condition.text}</div>
            <img src="https:${dayData.condition.icon}" alt="">
        `
    newDiv.style.backgroundColor = themeColor(dayData.condition.text)
    return newDiv
}

const locationList = (locationData) => {
    let output = document.createElement("div")
    output.classList.add("location")
    for(i in locationData){
        const newParagraph = document.createElement("p")
        newParagraph.innerHTML = `${locationData[i]}`
        output.appendChild(newParagraph)
    }
    return output
}

const clearMain = () => {
    document.querySelector("main").innerHTML = ""
}

changeLocation("London")
init()