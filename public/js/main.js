const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');

const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const datahide = document.querySelector('.middle_layer');

const getCurrentDay = () => {
    let weekDay = new Array(7);
    weekDay[0] = "Sunday";
    weekDay[1] = "Monday";
    weekDay[2] = "Tuesday";
    weekDay[3] = "Wednesday";
    weekDay[4] = "Thursday";
    weekDay[5] = "Friday";
    weekDay[6] = "Saturday";

    let currentTime = new Date();
    let day = weekDay[currentTime.getDay()];
    return day;
}

const getCurrentMonth = () => {
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    let currentDate = new Date();
    let currentMonth = months[currentDate.getMonth()];

    return currentMonth;
}

const getCurrentDate = () => {
    let currentDate = new Date();
    let getCurDate = currentDate.getDate();
    let curDate = '';
    if(getCurDate <= 9){
        curDate = '0'+getCurDate;
    }else{
        curDate = getCurDate
    }
    return curDate;
}

const day = document.getElementById('day');
const today_data = document.getElementById('today_data');

//dynamically date change
day.innerText = getCurrentDay();
today_data.innerText = getCurrentDate() + '  ' + getCurrentMonth();

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ''){
        city_name.innerText = `Plz write the name before you search`;
        datahide.classList.add('data_hide');
    }else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=2ae154c6d4ec5f94e160dfcdb5528ff7`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            //temp_status.innerText = arrData[0].weather[0].main;

            const tempMood = arrData[0].weather[0].main;

            // condition to check sunny or cloudy
            if(tempMood == 'Clear'){
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68'></i>";
            }else if(tempMood == 'Clouds'){
                temp_status.innerHTML = "<i class='fas fa-cloud style='color: #f1f2f6;'></i>";
            }else if(tempMood == 'Rain'){
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color:#a4b0be;'></i>";
            }else{
                temp_status.innerHTML = "<i class='fas fa-sun style='color: #eccc68'></i>";
            }
            datahide.classList.remove('data_hide');
        }catch{
            city_name.innerText = `Plz enter the city name properly`;
            datahide.classList.add('data_hide'); 
        }
        
    }
}

submitBtn.addEventListener('click', getInfo);