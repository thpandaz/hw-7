import { fetchCurrentWeather } from "./fetchCurrentWeather.js"
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js"
import { fetchUniversities } from "./fetchUniversities.js"

export function fetchUniversityWeather(query) {
  let universities = [];
  return fetchUniversities(query).then(async unis => {
    universities = unis;
    if (universities.length === 0) { return Promise.reject(new Error('No results found for query.')) };
    let temps = [...universities].map(u => 
      fetchLongitudeAndLatitude(u)
        .then(lonLat => fetchCurrentWeather(lonLat.lon, lonLat.lat))
        .then(weather => weather.temperature_2m.reduce((acc, cur) => acc + cur, 0)/weather.temperature_2m.length)
    )
    return Promise.all(temps)
  }).then(temps => {
    let ret = {};
    for (let i = 0; i < temps.length; ++i) {
      ret[universities[i]] = temps[i];
    }
    ret.totalAverage = Object.values(ret).reduce((acc, cur) => acc + cur, 0)/universities.length;
    return ret;
  });
}


export function fetchUCalWeather() {
  return fetchUniversityWeather('University of California');
}

export function fetchUMassWeather() {
  return fetchUniversityWeather('University of Massachusetts');
}
