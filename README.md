# cabana-handler

cabana-handler is a tool designed to make it easy to run and use [cabana](https://github.com/commaai/cabana) locally. 

## Prerequisites

To use cabana-handler, you will need:

- Docker installed on your system.

- The openpilot routes that you want to view and analyze using cabana.

## Setup instructions

To set up and start using cabana-handler, follow the steps below:

1. Clone the cabana-handler repository.


2. Navigate into the project directory.

3. Create a new directory named 'routes'.


4. Copy your openpilot routes into the newly created routes directory. Make sure that these files are copied as they are from the realdata directory on your dongle.

5. Run Docker Compose:

`docker-compose -f docker-compose.yml up`


This will pull the necessary Docker images (if they're not already on your system), build the Docker containers, and start cabana.

6. Once the application is running, open your web browser and visit: http://localhost:8080

7. On the web interface, select the drive that you wish to analyze. Cabana will now load your drive and display the relevant data.

## Contributing

We welcome contributions from the open-source community. 

## Support

If you encounter any problems or have any questions about using cabana-handler, please create an issue on the GitHub repository.

## License

cabana-handler is released under the [MIT License](https://opensource.org/licenses/MIT).
