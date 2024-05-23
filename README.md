# Smart Care Pro Automation Test

This repository contains an automation test script for the Health Records Website. The test script automates the process of navigating to the vitals section and adding a new record for a patient using data from a CSV file.

## Table of Contents
- [Objective](#objective)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Test Script Steps](#test-script-steps)
- [Tools and Technologies Used](#tools-and-technologies-used)

## Objective
The objective of this test case is to automate the process of navigating to the vitals section of the Health Records Website and adding a new record for a patient using data from a CSV file.

## Prerequisites
- Access to the Health Records Website.
- Valid login credentials for the tester account.
- A CSV file (`data.csv`) containing patient vitals data with the following columns:
  - NRC
  - Date (in `dd-mm-yyyy` format)
  - Time (in `HH:mm` format)
  - Weight
  - Height
  - Temperature
  - Systolic
  - Diastolic
  - Pulse Rate
  - Respiratory Rate
  - Oxygen Saturation

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/health-records-automation.git
   cd health-records-automation
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Place your `data.csv` file in the `tests` directory.

4. Run the test script:
   ```sh
   npx playwright test
   ```

## Test Script Steps

1. **CSV Data Import**
   - The script reads patient vitals data from a CSV file (`data.csv`).
   - It uses the `csv-parser` module to parse the CSV file and store the data in an array for subsequent use.

2. **User Sign In**
   - The script navigates to the Health Records Website.
   - It fills in the username and password fields with the credentials `"tester"` and `"tester2023!"`, respectively.
   - It submits the login form to sign in to the website.

3. **Facility Selection**
   - The script selects a province by choosing the option with value `"1"` from the province dropdown.
   - It selects a district by choosing the option with value `"5"` from the district dropdown.
   - It searches for the facility "Watson" by typing in the search field and selecting "Dr. Watson Dental Clinic" from the results.
   - It clicks the submit button to confirm the facility selection.

4. **Patient Search and Record Addition**
   - The script clicks the button to search by NRC (National Registration Card).
   - It iterates over the rows of data from the CSV file. For each row:
     - If the NRC is different from the previous row, it performs a new patient search.
     - It fills in the NRC field and submits the search form.
     - It clicks the button to attend to the patient.
     - It navigates directly to the vitals section.
     - It clicks the button to add a new vital record.

5. **Vitals Data Entry**
   - For each patient's vitals data:
     - The script clears and selects the date by parsing the date value into year, month, and day components.
     - It adjusts the month and day values to match the format required by the date picker.
     - It selects the correct date from the date picker.
     - The script converts the 24-hour time format to a 12-hour format with AM/PM and selects the corresponding time from the dropdown.
     - It fills in the weight, height, temperature, systolic, diastolic, pulse rate, respiratory rate, and oxygen saturation fields with the values from the CSV file.
     - It submits the form to add the vitals record.

#### Notes
- The script includes a mechanism to handle different NRC values by performing a new search only when the NRC changes.
- It pauses execution at strategic points to allow for manual verification during the automation process (e.g., after selecting the date).
- The script ensures that each field is cleared before new data is entered to avoid any pre-filled data issues.

## Tools and Technologies Used
- Playwright for browser automation.
- Node.js and JavaScript for scripting.
- `csv-parser` for reading CSV files.
- `fs` module for file system operations.

---

This README provides a clear and comprehensive overview of the automation test script, including setup instructions and detailed steps. This will help users understand how to run and verify the script.
