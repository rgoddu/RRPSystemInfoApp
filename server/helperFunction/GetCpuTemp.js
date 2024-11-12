import fs from 'fs';

// Function to get the CPU temperature using a Promise
export function getCPUTemperature() {
  return new Promise((resolve, reject) => {
    fs.readFile('/sys/class/thermal/thermal_zone0/temp', 'utf8', (err, data) => {
      if (err) {
        reject('Error reading CPU temperature: ' + err);  // Reject the promise on error
      } else {
        const trimmedCelsius = parseInt(data.trim()) / 1000;  // Convert to Celsius
        const fahrenheit = (trimmedCelsius * 9 / 5) + 32;  // Convert to Fahrenheit
        resolve(fahrenheit);  // Resolve the promise with the CPU temperature in Fahrenheit
      }
    });
  });
}

export async function getTemperature() {
  try {
    const cpuTemperature = await getCPUTemperature();  // Wait for the temperature to be fetched
    console.log('CPU Temperature:', cpuTemperature, '°F');  // Log the temperature in Fahrenheit
    return cpuTemperature;
  } catch (error) {
    console.log('Error occurred:', error);  // Handle any errors
  }
}