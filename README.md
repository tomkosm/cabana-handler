# cabana-handler

Copy your routes from openpilot into routes/


## Setup instructions

Install Docker 

git clone https://github.com/thomas510111/cabana-handler.git
Enter directoroy
    cd cabana-handler
Create Routes Directory
    mkdir routes
Copy your routes into this directory as they are stored in realdata on your dongle
Run Docker Compose
    sudo docker-compose -f docker-compose.yml up
visit http://localhost:8080
Select drive 
Cabana will now load your drive
