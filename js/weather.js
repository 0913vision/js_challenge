const API_KEY = "196f3e567a2eddfb545e2f935edff593";

navigator.geolocation.getCurrentPosition(
	(position) => {
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
		console.log(url);
		fetch(url).then((r) => r.json()).then((d)=>{

			const weather = document.querySelector("#weather span:first-child");
			const city = document.querySelector("#weather span:last-child");
			city.innerText = d.name;
			weather.innerText = `${d.weather[0].main} / ${(d.main.temp-273.15).toFixed(2)} ℃`;
		});
	},
	() => {
  		alert("Can't find you. No weather for you.")
	}
)

