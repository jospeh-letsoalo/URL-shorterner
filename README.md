To run the program.
  1. Download/copy the repo to your device
  2. Move the docker-compose.yml out of the backend folder
     folder structure should look like this:
     folder_name:
       docker-compose.yml
       backend/
         app.js
         database.js
         ......
  3. make sure you have Docker installed in your device and run it
  4. make sure you have pgAdmin for postgres sql install in your device and set up your database and modify the database.js fille to match your configs
  5. install nodejs in your device
  6. open your powershell and navigate to the folder where you places the project
  7. run: docker compose up --build
  8. open your browser http://www.localhost:8000 this will lead you to application
  9. to download the UI check URL shortener UI available which is in react
