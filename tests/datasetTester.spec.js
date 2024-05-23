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

  
// Sign In---------------------------------------------------<<    
    //Goto website URL
    await page.goto("https://carepro-training.ihmafrica.com/");
    //Fill up Sign In Credentials
    await page.locator("//input[@name='username']").fill("tester");
    await page.locator("//input[@name='password']").fill("tester2023!");
    //Click Submit to Sign In
    await page.locator("//button[@type='submit']").click();
// Sign In---------------------------------------------------<<

//Select Facility--------------------------------------------<<
    //Select Province
    await page.locator("//select[@placeholder='Enter Province']").selectOption({value:"1"});
    //Select District
    await page.locator("//select[@placeholder='Enter District']").selectOption({value:"5"});
    //Select Facility
    await page.locator("//input[@placeholder='Search facility']").click();
    await page.locator("//input[@placeholder='Search facility']").fill("Watson");
    await page.waitForTimeout(3000);
    await page.locator("//div[contains(text(),'Dr. Watson Dental Clinic')]").click();
    //Click Enter
    await page.locator("//button[@type='submit']").click();
//Select Facility--------------------------------------------<<

//Search a Patient-------------------------------------------<<
    //Click on NRC
    await page.locator("//button[contains(text(),'NRC')]").click()
    // Variable to store the current NRC value
    let currentNRC = null;
    for (const row of data) {

            // Check if the current row's NRC value is different from the stored NRC value
            if (row.NRC !== currentNRC) {
            // Update the stored NRC value if it is different
            currentNRC = row.NRC;
            ////
            //Input NRC
            await page.locator("//input[@name='nrc']").fill(currentNRC);
            //Click on Submit
            await page.locator("//button[@type='submit']").click();
            //Click on Add Patient
            await page.locator("//button[contains(text(),'Attend to Patient')]").click();
            await page.waitForTimeout(3000);
            //Click Skip for Biometrics
            // await page.locator("//button[@type='button']").click();
            //Click Save for biometrics
            // await page.locator("//button[@type='button']").last().click()
        //Search a Patient-------------------------------------------<<

        //Select Service---------------------------------------------<<
            //Click Vitals
            //await page.locator("//a[@href='/vitals']").click();
            await page.goto("https://carepro-training.ihmafrica.com/vitals")
        //Select Service---------------------------------------------<<
     
        //Add Vitals-------------------------------------------------<<

            //Click on Add Vital Button
            await page.locator("//button[@type='button']").click();
            //Date Operations
            //clear date
            await page.locator("//button[@type='button']").nth(1).click();
            //click on date field
            await page.locator("//input[@placeholder='dd-mm-yyyy']").click();
            //split the date values
            // Split the Time value into year, month, and day
            const [year, month, day] = row.Date.split('-');
            // Decrease the month by 1
            const adjustedMonth = (parseInt(month) - 1).toString();
            // Convert day to a single digit if it is in the format '01', '02', etc.
            const adjustedDay = parseInt(day).toString();
            //select month
            await page.locator("//select").first().selectOption({value:adjustedMonth});
            //select year
            await page.locator("//select").nth(1).click();
            await page.locator("//select").nth(1).selectOption({label:year})
            await page.pause();
            //select day
            const dateLoc = page.locator("//div[@role='option']")
            const dateCount = await dateLoc.count()
            for(let i=0; i<=dateCount; i++){
              const iterDate = await dateLoc.nth(i).textContent()

                if(iterDate == adjustedDay){
                    await dateLoc.nth(i).click();
                    break;
                }

            }
            //select Time
            // Split the Time value into hours and minutes
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

              const timeLoc = page.locator("//li[@tabindex='-1']");
              const timeCount = await timeLoc.count()
              //Select Time from dropdown
              for(let j=0; j<=timeCount ; j++){
                if(await timeLoc.nth(j).textContent() == formattedTime){
                  await timeLoc.nth(j).click();
                  break;
                }
              }
              //Add Weight
              await page.locator("//input[@name='weight']").clear();
              await page.locator("//input[@name='weight']").fill(row.Weight);
              //Add Height
              await page.locator("//input[@name='height']").clear();
              await page.locator("//input[@name='height']").fill(row.Height);
              //Add Temperature
              await page.locator("//input[@name='temperature']").fill(row.Temperature);
              //Add Systolic
              await page.locator("//input[@name='systolic']").fill(row.Systolic);
              //Add Diastolic
              await page.locator("//input[@name='diastolic']").fill(row.Diastolic);
              //Add pulse rate
              await page.locator("//input[@name='pulseRate']").fill(row['Pulse Rate']);
              //Add Respiratory rate
              await page.locator("//input[@name='respiratoryRate']").fill(row['Respiratory Rate']);
              //Add Oxygen Saturation
              await page.locator("//input[@name='oxygenSaturation']").fill(row['Oxygen Saturation']);
              //CLick Submit
              await page.locator("//button[@type='submit']").click();
              //Add Vitals-------------------------------------------------<<
            }else{
              //Add Vitals-------------------------------------------------<<

            //Click on Add Vital Button
            await page.locator("//button[@type='button']").click();
            //Date Operations
            //clear date
            await page.locator("//button[@type='button']").nth(1).click();
            //click on date field
            await page.locator("//input[@placeholder='dd-mm-yyyy']").click();
            //split the date values
            // Split the Time value into year, month, and day
            const [year, month, day] = row.Date.split('-');
            // Decrease the month by 1
            const adjustedMonth = (parseInt(month) - 1).toString();
            // Convert day to a single digit if it is in the format '01', '02', etc.
            const adjustedDay = parseInt(day).toString();
            //select month
            await page.locator("//select").first().selectOption({value:adjustedMonth});
            //select year
            await page.locator("//select").nth(1).click();
            await page.locator("//select").nth(1).selectOption({label:year})
            await page.pause();
            //select day
            const dateLoc = page.locator("//div[@role='option']")
            const dateCount = await dateLoc.count()
            for(let i=0; i<=dateCount; i++){
              const iterDate = await dateLoc.nth(i).textContent()

                if(iterDate == adjustedDay){
                    await dateLoc.nth(i).click();
                    break;
                }

            }
            //select Time
            // Split the Time value into hours and minutes
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

              const timeLoc = page.locator("//li[@tabindex='-1']");
              const timeCount = await timeLoc.count()
              //Select Time from dropdown
              for(let j=0; j<=timeCount ; j++){
                if(await timeLoc.nth(j).textContent() == formattedTime){
                  await timeLoc.nth(j).click();
                  break;
                }
              }
              //Add Weight
              await page.locator("//input[@name='weight']").clear();
              await page.locator("//input[@name='weight']").fill(row.Weight);
              //Add Height
              await page.locator("//input[@name='height']").clear();
              await page.locator("//input[@name='height']").fill(row.Height);
              //Add Temperature
              await page.locator("//input[@name='temperature']").fill(row.Temperature);
              //Add Systolic
              await page.locator("//input[@name='systolic']").fill(row.Systolic);
              //Add Diastolic
              await page.locator("//input[@name='diastolic']").fill(row.Diastolic);
              //Add pulse rate
              await page.locator("//input[@name='pulseRate']").fill(row['Pulse Rate']);
              //Add Respiratory rate
              await page.locator("//input[@name='respiratoryRate']").fill(row['Respiratory Rate']);
              //Add Oxygen Saturation
              await page.locator("//input[@name='oxygenSaturation']").fill(row['Oxygen Saturation']);
              //CLick Submit
              await page.locator("//button[@type='submit']").click();
              //Add Vitals-------------------------------------------------<<

            }
            
}



});