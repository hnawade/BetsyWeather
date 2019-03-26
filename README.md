# Betsy Weather

#### How does the web app work

There are two main parts to the app.

The first part is the server.js file. This js file is responsible for listening on port 3000 and displaying the index.ejs. The server.js file also is responsible for creating and reading requests to api.weather.gov

The second part is the index.ejs file. This file allows to display the user interface as html, but also allows me to use embedded javascript, which is what allows for the transfer of information from server.js to index.ejs.

Both of these files are stored on the EC2 Linux AWS Server. The server is running "node server.js" in the background so the port is always open.

#### Diagram
![](https://s3.amazonaws.com/harshalnawade/readme.jpg)
