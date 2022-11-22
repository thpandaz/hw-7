import { fetchUMassWeather } from './universityWeather.js';
import { writeToJSONFile, readFromJSONFile } from './fileUtility.js';

fetchUMassWeather().then(current_temps => {
  readFromJSONFile('./high_scores.json')
    .catch(async err => {
      if (err.toString().includes('ENOENT')) {
        await writeToJSONFile('./high_scores.json', current_temps);
        return Promise.resolve(current_temps);
      } else {
        return Promise.reject(err);
      }
    })
    .then(async highscores => {
      for (const key in current_temps) {
        console.log(key === 'totalAverage' ? "Total Average" : key);
        console.log(`Current average temperature: ${current_temps[key]} °F`);
        console.log(`Record high average temperature: ${highscores[key]} °F`);
        if (current_temps[key] > highscores[key]) {
          console.log('New record!');
          highscores[key] = current_temps[key];
        }
        console.log();
      }
      await writeToJSONFile('./high_scores.json', highscores);
    });
});