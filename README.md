# cypress-region-detection

# Overview

Testing of Applied Medical's EU corporate site, appliedmedical.eu, using cypress. 

The site's content is determinant on the user's location in the world. For example, when accessing appliedmedical.eu, a user from France might see different content or
may be restricted to content as opposed to a user from the Netherlands. This can making testing the website very difficult, because a VPN will be required to test across
different regions. To simplify the process of testing we utilized cypress. Cypress is basically a javascript tool that can automate and create tests that simulate an 
actual human being.

Currently, the only page that is being tested is the product page, (https://appliedmedical.eu/Products) 
since it is the only page that has geolocation and shows content based on region. 

# Installation

# 1. Install Cypress

   - Window and Mac users 
      - Click on the link and open the zip folder. 
      - https://download.cypress.io/desktop
     
   - Mac users 
      -  After installing double click the .zip folder in the downloads folder to install cypress
     
   - Window users
      -  Right click on the cypress zip file and click on extract all
      -  Wait for the extraction to complete
      -  After it is finished extracting double click into the cypress folder
   
# 2. Open Cypress
   
   - Mac users
      - The cypress application should be automatically created in the same folder as the cypress zip file - double click the application to open it.
      - The logo should be a black circle with cy in the middle.
     
   - Window users
      - If you don't have the cypress folder already open, open the cypress folder, it should be in the Downloads directory
      - Once the cypress folder is open, double click on the cypress application. The logo should be a black circle with cy in the middle


# 3. Download the repository

   - YOU SHOULD ALWAYS DOWNLOAD THIS REPOSITORY EVERYTIME YOU RUN CYPRESS TESTS IN CASE OF UPDATES
   - If you have cypress opened correctly. The cypress application should be looking for a project
   - Download the project by clicking on the link below
   - https://github.com/AppliedTechnologyServices/applied-surgeon-portal/archive/refs/heads/master.zip
   - Similarly the file must be extracted after downloading the project, repeat step 1 except with the project zip instead of the cypress zip


# 4. Launch the project
   
   - After the project has been extracted. Drag and drop the project folder into the cypress application, this should load the project
   - If successfully launched you should see two test files - loadData.spec.js and regionTest.spec.js

# 5. Run tests
  
   - You should always run these tests sequentially. Always click on the loadData.spec.js file first to load all the data needed to test each region
   - Once the test loadData.spec.js file is completed run the regionTest.spec.js file

# 6. Explanation

   - The loadData.spec.js file queries data from an API in order to get an IP from each country. Nothing should be tested in that file, if an error occurs in the 
   loadData.spec.js file close the test and reopen it. If the error is persistent, please notify me
   - The regionTest.spec.js file will test appliedmedical.eu/products. If an error occurs please screenshot the error of the test that failed and notify me









