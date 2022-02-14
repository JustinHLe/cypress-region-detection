# cypress-region-detection

# Overview

Testing of Applied Medical's EU corporate site, appliedmedical.eu, using cypress. 

The site's content is determinant on the user's location in the world. For example, when accessing appliedmedical.eu, a user from France might see different content or
may be restricted to content as opposed to a user from the Netherlands. This can making testing the website very difficult, because a VPN will be required to test across
different regions. To simplify the process of testing we utilized cypress. Cypress is basically a javascript tool that can automate and create tests that simulate an 
actual human being.

Currently, the only page that is being tested is the product page, (https://appliedmedical.eu/) 
since it is the only page that has geolocation and shows content based on region. 

# Installation

1. Install Git

   - Mac users should already have git installed

   - Window users
      -  Go to this link, https://git-scm.com/download/win, and install the most latest version of Git for windows.
      -  Open the installer and follow the instructions. (You don't have to change anything if prompted to, just hit next throughout the installation).

2. Open command line 
   
   - Mac users 
        - open spotlight search with [command + space] and search for terminal and click on the first result(Terminal)

   - Window users 
        - If Git is installed correctly open the search bar in the taskbar and search for git bash.
        - Open the application git bash.

      ![Image](/ReadMeImages/Windows/2.png)


3. make a directory 

   - Mac users 
        - open spotlight search with [command + space] and search for terminal and click on the first result(Terminal)

   - Window users 
        - Run command mkdir [directory name]. The directory name can by anyting you like.
        - Go into the directory you just created with cd [directory name]. 

4. Clone the repository

   - Mac users 
        - open spotlight search with [command + space] and search for terminal and click on the first result(Terminal)

   - Window users 
        - Go to https://github.com/JustinHLe/cypress-region-detection, click the GREEN Code button in the right corner of the screen
        - Copy the https link, it should be automatically selected
        - Go back to the git bash terminal and run the command git clone https://github.com/JustinHLe/cypress-region-detection.git

5. Install project dependencies

   - Mac users 
        - open spotlight search with [command + space] and search for terminal and click on the first result(Terminal)

   - Window users 
        - After it is cloned it should create a new folder called cypress-region-detection
        - Go into that directory with cd cypress-region-detection
        - Once inside the cypress-region-detection folder, type yarn install the terminal to install project dependencies

6. Run cypress

   - Mac users 
        - open spotlight search with [command + space] and search for terminal and click on the first result(Terminal)

   - Window users 
        - There are multiple ways to run cypress. 
        - The simplest way is to run cypress with the script already written.
        - There are three scripts you should run, these scripts will run the cypress test on chrome, firefox, and edge automatically. 
           -  yarn cy:run:chrome
           -  yarn cy:run:firefox
           -  yarn cy:run:edge
         
        -  A more manual approach would be running the script yarn cy:open which will open the test runner. 
           -  From here you can change the browser with the dropdown in the upper right hand corner, and run each test manually.
           -  Run the test by clicking on the files manually
           -  Keep in mind that YOU SHOULD ALWAYS RUN THE loadData.spec.js file first, because regionTest.spec.js is dependent on that file





