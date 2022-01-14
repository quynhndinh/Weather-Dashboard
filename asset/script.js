const temp = document.querySelector("#temperature");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const uvIndex = document.querySelector("#uv");
const cityChosen = document.querySelector("#current-city");
const selectedEl = document.querySelector("#search-city");
const submitBtn = document.querySelector("#search-button");
const listHistory = document.querySelector(".list-group");
const cityImageMain = document.querySelector("current-weather");
const currentDate = document.querySelector("#current-city-date");

const firstDayDate = document.querySelector("#Date0");
const firstImgDate = document.querySelector("#Img0");
const firstTempDate = document.querySelector("#Temp0");
const firstWindDate = document.querySelector("#Wind0");
const firstHumidityDate = document.querySelector("#Humidity0");
const secondDayDate = document.querySelector("#Date1");
const secondImgDate = document.querySelector("#Img1");
const secondTempDate = document.querySelector("#Temp1");
const secondWindDate = document.querySelector("#Wind1");
const secondHumidityDate = document.querySelector("#Humidity1");
const thirdDayDate = document.querySelector("#Date2");
const thirdImgDate = document.querySelector("#Img2");
const thirdTempDate = document.querySelector("#Temp2");
const thirdWindDate = document.querySelector("#Wind2");
const thirdHumidityDate = document.querySelector("#Humidity2");
const fourthDayDate = document.querySelector("#Date3");
const fourthImgDate = document.querySelector("#Img3");
const fourthTempDate = document.querySelector("#Temp3");
const fourthWindDate = document.querySelector("#Wind3");
const fourthHumidityDate = document.querySelector("#Humidity3");
const fifthDayDate = document.querySelector("#Date4");
const fifthImgDate = document.querySelector("#Img4");
const fifthTempDate = document.querySelector("#Temp4");
const fifthWindDate = document.querySelector("#Wind4");
const fifthHumidityDate = document.querySelector("#Humidity4");

const citiesHistory = JSON.parse(localStorage.getItem("history")) || [];

const searchHistory = (event) => {
  event.preventDefault();
  const city = event.target.innerHTML;
  getWeatherData(city);
};

const loadHistory = () => {
  listHistory.innerHTML = "";
  for (let i = 0; i < citiesHistory.length; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.innerHTML = citiesHistory[i];
    button.addEventListener("click", searchHistory);
    li.append(button);
    listHistory.append(li);
  }
};

loadHistory();

const cityId = "";
const searchWeatherData = () => {
  const city = selectedEl.value;
  getWeatherData(city);
};

const getWeatherData = (city) => {
  if (citiesHistory.indexOf(city) === -1) {
    citiesHistory.push(city);
    localStorage.setItem("history", JSON.stringify(citiesHistory));
    loadHistory();
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=0a395f504a6a4310ce608b60f4bd6d2b`
  )
    .then((response) => response.json())
    .then((data) => {
      temp.innerHTML = `${data.main.temp}°F`;
      windSpeed.innerHTML = data.wind.speed;
      humidity.innerHTML = data.main.humidity;
      cityChosen.innerHTML = data.name;    
      const iconCodeMain = data.weather[0].icon;
      const iconUrlMain = "http://openweathermap.org/img/w/" + iconCodeMain + ".png";
      $('#img-main').attr('src', iconUrlMain);

      const lat = data.coord.lat;
      const lon = data.coord.lon;

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=0a395f504a6a4310ce608b60f4bd6d2b`
      )
        .then((response) => response.json())
        .then((data) => {
          uvIndex.innerHTML = data.current.uvi;
        });
    });

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=0a395f504a6a4310ce608b60f4bd6d2b`
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("18:00:00") !== -1) {
          console.log(data.list[i]);

          currentDate.innerHTML = data.list[0].dt_txt.substr(0, 10);

          firstDayDate.innerHTML = data.list[7].dt_txt.substr(0, 10);
          firstTempDate.innerHTML = `${data.list[7].main.temp}°F`;
          firstWindDate.innerHTML = data.list[7].wind.speed;
          firstHumidityDate.innerHTML = data.list[7].main.humidity;
          const iconCode = data.list[7].weather[0].icon;
          const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
          $('#Img0').attr('src', iconUrl);

          secondDayDate.innerHTML = data.list[15].dt_txt.substr(0, 10);
          secondTempDate.innerHTML = `${data.list[15].main.temp}°F`;
          secondWindDate.innerHTML = data.list[15].wind.speed;
          secondHumidityDate.innerHTML = data.list[15].main.humidity;
          const iconCodeOne = data.list[15].weather[0].icon;
          const iconUrlOne = "http://openweathermap.org/img/w/" + iconCodeOne + ".png";
          $('#Img1').attr('src', iconUrlOne);

          thirdDayDate.innerHTML = data.list[23].dt_txt.substr(0, 10);
          thirdTempDate.innerHTML = `${data.list[23].main.temp}°F`;
          thirdWindDate.innerHTML = data.list[23].wind.speed;
          thirdHumidityDate.innerHTML = data.list[23].main.humidity;
          const iconCodeTwo = data.list[23].weather[0].icon;
          const iconUrlTwo = "http://openweathermap.org/img/w/" + iconCodeTwo + ".png";
          $('#Img2').attr('src', iconUrlTwo);

          fourthDayDate.innerHTML = data.list[31].dt_txt.substr(0, 10);
          fourthTempDate.innerHTML = `${data.list[31].main.temp}°F`;
          fourthWindDate.innerHTML = data.list[31].wind.speed;
          fourthHumidityDate.innerHTML = data.list[31].main.humidity;
          const iconCodeThree = data.list[31].weather[0].icon;
          const iconUrlThree = "http://openweathermap.org/img/w/" + iconCodeThree + ".png";
          $('#Img3').attr('src', iconUrlThree);

          fifthDayDate.innerHTML = data.list[39].dt_txt.substr(0, 10);
          fifthTempDate.innerHTML = `${data.list[39].main.temp}°F`;
          fifthWindDate.innerHTML = data.list[39].wind.speed;
          fifthHumidityDate.innerHTML = data.list[39].main.humidity;
          const iconCodeFour = data.list[39].weather[0].icon;
          const iconUrlFour = "http://openweathermap.org/img/w/" + iconCodeFour + ".png";
          $('#Img4').attr('src', iconUrlFour);
        }
      }
    });
};

submitBtn.addEventListener("click", searchWeatherData);