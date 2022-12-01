# About the project

This project is about a management application in order to facilitate the lawiers life with a complete CRUD application.

## Installation

### Prerequisites

- Node.js v14.18.1 [install here](https://nodejs.org/ja/blog/release/v14.18.1/)
- Docker desktop [install here](https://www.docker.com/products/docker-desktop/)

### Back-end

Go to the back-end folder of the project:

```bash
cd back-end
```

Now you need to rename the **.env.backend** file to **.env** and put all the config of the application in there (in the file there is the instructions).

- After changing the **.env** file, run the following to install the back-end of the project:

```bash
docker-compose build
```

- And then:

```bash
docker-compose up
```

You can access the database of the local application by using the port 5050 of the localhost (http://localhost:5050).

For you to log-in the PGAdmin you need to use the credentials you configured in the **.env** file.

![image1](https://iili.io/HfZJpzQ.png)

After you loged-in, you can connect to the database also using the configured credentials in the **.env** file.

![image2](https://iili.io/HfZJbmx.png)
![image3](https://iili.io/HfZJDej.png)

Now you can access the http://localhost:8000/docs to see the Swagger UI of the FastAPI and see all the endpoint of the application.

![image4](https://iili.io/HfZoFMG.png)

### Front-end

Go to the back-end folder of the project:

```bash
cd front-ent
```

To install all the packages:

```bash
npm install
```

To run the project:

```bash
npm start
```

![image5](https://iili.io/HfZzF24.png)

To start the electron app and the react app:

```bash
npm run-script electron:serve
```

To start the electron app with the react app already running:

```bash
npm run-script electron:start
```

![image6](https://iili.io/HfZRiBt.png)
