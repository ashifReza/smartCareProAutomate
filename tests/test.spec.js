// @ts-check
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const csv = require('csv-parser');

test('Navigate to vitals and Add record', async ({ page }) => {
//CSV Import-------------------------------------------------<<
// Path to your CSV file
const csvFilePath = 'tests/data.csv';

// Function to read CSV data
const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

// Read the CSV file
const data = await readCSV(csvFilePath);
//CSV Import-------------------------------------------------<<

for (const row of data) {

    console.log(row.NRC)
    const [year, month, day] = row.Date.split('-');
    console.log(year)
    console.log(month)
    console.log(day)
    const [hour24, minute] = row.Time.split(':');
    // Convert 24-hour format to 12-hour format with AM/PM
    let hour12 = parseInt(hour24, 10);
    let period = 'AM';
    if (hour12 >= 12) {
      period = 'PM';
      if (hour12 > 12) {
        hour12 -= 12;
      }
    } else if (hour12 === 0) {
      hour12 = 12;
    }

    const formattedHour = hour12.toString().padStart(2, '0'); // Ensure hour is two digits
    const formattedTime = `${formattedHour}:${minute} ${period}`; // Combine hour, minute, and period
    console.log(formattedTime);
    console.log(row.Weight)
    console.log(row.Height)
    console.log(row.Temperature)
    console.log(row.Systolic)
    console.log(row.Diastolic)
    console.log(row['Pulse Rate'])
    console.log(row['Respiratory Rate'])
    console.log(row['Oxygen Saturation'])
    

}


});