import { fetchCurrentWeather } from "./fetchCurrentWeather.js"
import { fetchLongitudeAndLatitude } from "./fetchLongitudeAndLatitude.js"
import { fetchUniversities } from "./fetchUniversities.js"

export function fetchUniversityWeather(query) {
  return fetchUniversities(query).then(universities => {
      if (universities.length === 0) { return Promise.reject(new Error('No results found for query.')) };
      let obj = {};
      universities.forEach(
        async u => obj[u] = await fetchLongitudeAndLatitude(u)
          .then(lonLat => fetchCurrentWeather(lonLat.lon, lonLat.lat))
          .then(weather => weather.temperature_2m.reduce((acc, cur) => acc + cur, 0)/weather.length)
      );
      obj.totalAverage = Object.values(obj).reduce((acc, cur) => acc + cur, 0)/universities.length;
      return obj;
  });
}


export function fetchUCalWeather() {
  return fetchUniversityWeather('University of California');
}

export function fetchUMassWeather() {
  return fetchUniversityWeather('University of Massachusetts');
}
