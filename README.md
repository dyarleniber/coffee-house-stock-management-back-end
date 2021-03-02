<h1 align="center">
  Coffee House back-end
</h1>

<p align="center">
  <a href="#gear-configuration">Installation</a>
</p>

- The API was built using Node.js, Express, MySQL and JWT authentication.
- The tests were made using Jest.
- All images are being stored through the AWS S3 service.

These are the routes of the application:

Method    	| 	URI							|	Access Level
---       	| 	---							|	---
`POST`		| 	`/login`					|	-

Method    	| 	URI							|	Access Level
---       	| 	---							|	---
`GET`		|	`/products`					|	`Manager` / `Employee`
`GET`		|	`/products/download`		|	`Manager` / `Employee`
`GET`		|	`/products/:id`				|	`Manager` / `Employee`
`PUT`		|	`/products/:id/quantity`	|	`Manager` / `Employee`
`GET`		|	`/notifications`			|	`Manager` / `Employee`
`DELETE`	|	`/notifications/:id`		|	`Manager` / `Employee`

Method    	| 	URI							|	Access Level
---       	| 	---							|	---
`POST`		|	`/products`					|	`Manager`
`PUT`		|	`/products/:id`				|	`Manager`
`PUT`		|	`/products/:id/file`		|	`Manager`
`DELETE`	|	`/products/:id`				|	`Manager`

Method    	| 	URI							|	Access Level
---       	| 	---							|	---
`GET`		|	`/categories`				|	`Manager`
`POST`		|	`/categories`				|	`Manager`
`GET`		|	`/categories/:id`			|	`Manager`
`PUT`		|	`/categories/:id`			|	`Manager`
`DELETE`	|	`/categories/:id`			|	`Manager`

Method    	| 	URI							|	Access Level
---       	| 	---							|	---
`GET`		|	`/users`					|	`Manager`
`POST`		|	`/users`					|	`Manager`
`GET`		|	`/users/:id`				|	`Manager`
`PUT`		|	`/users/:id`				|	`Manager`
`DELETE`	|	`/users/:id`				|	`Manager`

Method    	| 	URI							|	Access Level
---       	| 	---							|	---
`GET`		|	`/roles`					|	`Manager`

## :gear: Configuration

To clone and run this application, you’ll need to have [Git](https://git-scm.com), [Docker](https://www.docker.com), [Docker Compose](https://docs.docker.com/compose) and [Node.js](https://nodejs.org) installed on your computer.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/dyarleniber/coffee-house-stock-management-back-end.git

# Go into the repository folder
$ cd coffee-house-stock-management-back-end

# Create a new .env file based on .env.example
$ cp .env.example .env

# Set the AWS credentials and a JWT secret
# Optionally, you can set new database environment variables
# But with the variables within the .env.example file should work
# As long as the project's docker image is used

# Install dependencies
$ npm install

# Build the app image and run the environment in background mode
$ docker-compose up -d

# Run the migrations
$ npx sequelize-cli db:migrate

# Run the app in the development mode
$ npm run dev
```

To run the tests, use the following command:

```bash
$ npm run test
```

Use the following command to run ESLint and Prettier from the command line:

```bash
$ npm run quality
```

---

Made with ♥ by Dyarlen Iber :wave: [Get in touch!](https://dyarleniber.com)
