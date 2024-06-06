# NestJS CRUD Application

This is a NestJS application that provides a RESTful API for performing CRUD (Create, Read, Update, Delete) operations on a User entity. The application uses MySQL as the database and includes modules for database connectivity, user management, and utility functions.

## Project Structure

The project follows the modular structure recommended by NestJS, with separate modules for different concerns. Here's an overview of the project structure:

```
.
├── db.sql
├── dist
│   ├── app.controller.d.ts
│   ├── app.controller.js
│   ├── app.controller.js.map
│   ├── app.module.d.ts
│   ├── app.module.js
│   ├── app.module.js.map
│   ├── app.service.d.ts
│   ├── app.service.js
│   ├── app.service.js.map
│   ├── database
│   │   ├── database.module.d.ts
│   │   ├── database.module.js
│   │   ├── database.module.js.map
│   │   ├── db.service.d.ts
│   │   ├── db.service.js
│   │   ├── db.service.js.map
│   │   ├── db.utils.d.ts
│   │   ├── db.utils.js
│   │   └── db.utils.js.map
│   ├── main.d.ts
│   ├── main.js
│   ├── main.js.map
│   ├── tsconfig.build.tsbuildinfo
│   ├── user
│   │   ├── dto
│   │   │   ├── create-user.dto.d.ts
│   │   │   ├── create-user.dto.js
│   │   │   ├── create-user.dto.js.map
│   │   │   ├── update-user.dto.d.ts
│   │   │   ├── update-user.dto.js
│   │   │   └── update-user.dto.js.map
│   │   ├── entities
│   │   │   ├── user.entity.d.ts
│   │   │   ├── user.entity.js
│   │   │   └── user.entity.js.map
│   │   ├── user.controller.d.ts
│   │   ├── user.controller.js
│   │   ├── user.controller.js.map
│   │   ├── user.module.d.ts
│   │   ├── user.module.js
│   │   ├── user.module.js.map
│   │   ├── user.service.d.ts
│   │   ├── user.service.js
│   │   └── user.service.js.map
│   └── utils
│       ├── dto
│       │   ├── Validate.dto.d.ts
│       │   ├── Validate.dto.js
│       │   └── Validate.dto.js.map
│       ├── utils.d.ts
│       ├── utils.js
│       ├── utils.js.map
│       ├── utils.module.d.ts
│       ├── utils.module.js
│       ├── utils.module.js.map
│       ├── utils.service.d.ts
│       ├── utils.service.js
│       └── utils.service.js.map
├── nest-cli.json
├── package.json
├── package-lock.json
├── readme.md
├── README.md
├── src
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── database
│   │   ├── database.module.ts
│   │   ├── db.service.ts
│   │   └── db.utils.ts
│   ├── main.ts
│   ├── user
│   │   ├── dto
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── entities
│   │   │   └── user.entity.ts
│   │   ├── user.controller.ts
│   │   ├── user.module.ts
│   │   └── user.service.ts
│   └── utils
│       ├── dto
│       │   └── Validate.dto.ts
│       ├── utils.module.ts
│       ├── utils.service.ts
│       └── utils.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```

- `app.controller.ts`, `app.module.ts`, and `app.service.ts`: These files define the root module and entry point for the application.
- `database/`: This directory contains the module and service for database connectivity and utility functions.
- `user/`: This directory contains the module, controller, service, entities, and DTOs (Data Transfer Objects) related to the User entity.
- `utils/`: This directory contains a module, service, and utility functions for various purposes.
- `main.ts`: This file is the entry point for the NestJS application.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/isaac0yen/nest.js-crud.git
```

2. Install dependencies:

```bash
cd nest.js-crud
npm install
```

3. Set up the MySQL database in `db.sql` and update the database configuration in `src/database/db.utils.ts`.

4. Start the application:

```
npm run start:dev
```
The application should now be running at http://localhost:3000.

`Go to http://localhost:3000/api for swagger docs.`

Usage
The API provides the following endpoints for managing users:

```
http://localhost:3000/api for swagger docs.

POST /user: Create a new user
GET /user: Get a list of all users
GET /user/:id: Get a specific user by ID
PATCH /user/:id: Update a user by ID
DELETE /user/:id: Delete a user by ID

```
You can use tools like Postman or cURL to interact with the API.

Contributing
Contributions are welcome! If you find any issues or want to add new features, please open an issue or submit a pull request.

License
This project is licensed under the MIT License.

Contact
If you have any questions or need further assistance, feel free to reach out to me at isaacoyeniyi06@gmail.com or visit my GitHub profile at https://github.com/isaac0yen.

