# Todo-App-2

create todo app as a homework

### Backend Application: CRUD for Directory and Tasks Collections

For this homework, you will create the backend of the application with CRUD functionalities for two collections: **Directory** and **Task**. Your task is to implement RESTful APIs that allow users to manage directories and tasks. The tasks collection should reference the directory collection to associate tasks with a specific directory.

#### Schema Details

1. **Directory Collection Schema**:

   - `name` (string): Represents the name of the directory.

   **Example**:

   ```json
   {
     "name": "Work Projects"
   }
   ```

2. **Tasks Collection Schema**:

   - `title` (string): Title of the task.
   - `description` (string): Detailed description of the task.
   - `completed` (boolean): Whether the task is completed.
   - `important` (boolean): Indicates if the task is marked as important.
   - `deadline` (Date): Due date of the task.
   - `dirId` (reference): A foreign key reference to the **Directory** collection.

   **Example**:

   ```json
   {
     "title": "Complete Backend Homework",
     "description": "Implement CRUD operations for directory and task collections",
     "completed": false,
     "important": true,
     "deadline": "2024-10-20T00:00:00Z",
     "dirId": "648e6b567e563f1d3ca67e4b"
   }
   ```

#### Requirements:

1. **CRUD for Directory**:

   - **Create a Directory** (`POST /api/directories`): Add a new directory.
   - **Read Directories** (`GET /api/directories`): Retrieve a list of all directories.
   - **Update a Directory** (`PUT /api/directories/:id`): Update the name of a specific directory.
   - **Delete a Directory** (`DELETE /api/directories/:id`): Delete a specific directory.

2. **CRUD for Tasks**:

   - **Create a Task** (`POST /api/tasks`): Add a new task. Each task must be associated with a directory via the `dirId` field.
   - **Read Tasks** (`GET /api/tasks`): Retrieve a list of all tasks.
   - **Read Tasks by Directory** (`GET /api/directories/:dirId/tasks`): Retrieve all tasks for a specific directory.
   - **Update a Task** (`PUT /api/tasks/:id`): Update details of a specific task (e.g., mark it as completed, change title, etc.).
   - **Delete a Task** (`DELETE /api/tasks/:id`): Delete a specific task.

3. **Relations**:
   - The `dirId` field in the **Tasks** collection should reference the **Directory** collection to establish a relation between tasks and directories.

#### OPTIONAL:

- Optional: Implement pagination for tasks if the list gets large.

---


<!-- =================================================================================================================================== -->

# Fullstack-4 Assignment: Adding Authentication to Your Backend

In this assignment, you will add **authentication** functionality to the backend that you created in the previous session. This involves creating a user system and securing the task collection by associating tasks with a specific user.

## Requirements

### 1. User Collection Schema

You will create a new **User** schema with the following properties:

- `username` (string): The user's chosen username.
- `email` (string): The user's email address.
- `password` (string): The user's password (note that this must be **hashed** before saving to the database).

### 2. CRUD Functionalities for User

You will implement the following CRUD operations for the user:

1. **Create a User** (`POST /api/users`):

   - Create a new user account.
   - The password must be hashed before saving.

2. **Read Users** (`GET /api/users`):

   - Retrieve a list of all users.

3. **Update a User** (`PUT /api/users/:id`):

   - Update the details of a specific user (e.g., username, email).
   - Ensure to hash the password again if it is updated.

4. **Delete a User** (`DELETE /api/users/:id`):

   - Remove a specific user from the database.

5. **Get User's Tasks** (`GET /api/users/:id/tasks`):
   - Retrieve all tasks associated with a specific user. The `id` parameter should be the user's unique identifier.

### 3. Update to Task Collection

You will update the **Task** schema to add a new field:

- `userId` (reference): A reference to the **User** collection. Each task should be associated with a user, and the `userId` should store the unique identifier of the user who created the task.

### 4. Signup Process

When a user signs up:

- A new user should be created in the **User** collection.
- The **password** sent in the signup request should be **hashed** before it is stored in the database for security purposes.
- After successful signup, send a response confirming the creation of the user.

### 5. Login Process

When a user logs in:

1. **Check if the user exists**:

   - Query the database for a user with the email provided in the login request body.
   - If no user is found with the given email, respond with a **404 Not Found** error.

2. **Password validation**:

   - If the user exists, compare the **hashed password** stored in the database with the password provided in the login request body.
   - If the password is invalid, respond with a **404 Not Found** error.

3. **Token generation**:
   - If the password is valid, generate a **JWT token** using the user's unique ID (`userId`).
   - Send the token in the response to the client. This token will be used for user authentication in subsequent requests.

### Summary of Signup & Login

- **Signup**:

  - Create a user with `username`, `email`, and a **hashed password**.
  - Save the user to the database.
  - Return a success response.

- **Login**:
  - Check if the user exists using the `email` provided.
  - Validate the `password`.
  - If valid, generate a **JWT token** and return it in the response.

## Additional Notes

- Ensure that all passwords are hashed using a secure algorithm (e.g., bcrypt) before storing them in the database.
- The **JWT token** should be created using the user's **ID** (`userId`) as part of the payload.
- Return appropriate HTTP status codes for each request (e.g., 201 for successful creation, 404 for not found, 401 for unauthorized).
- You **do not need** to implement email verification for this assignment.
- Directories do not need to be user-specific. This means that all directories created will be visible to every user, regardless of who created them.

## Optional

- You may choose to implement user-specific directories. In this case, directories created by one user will **not** be visible to other users.
