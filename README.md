# Social-Media-Manager

Social-Media-Manager is a social media platform where users can post pictures, upload and view profiles, and interact with other users. The platform includes authentication using JWT for secure login and signup functionality.

## Features
- User authentication (Signup/Login) with JWT authorization
- Profile creation and editing
- Image upload and sharing
- View other users' profiles
- Secure API endpoints

## Technologies Used
- *Backend:* Node.js, Express.js
- *Database:* MongoDB with Mongoose
- *Authentication:* JWT (JSON Web Token)
- *Frontend:* React.js 

## Installation & Setup

1. *Clone the repository:*
   sh
   git clone git@github.com:Amaan061/Social-Media-Manager.git
   
2. *Install dependencies:*
   sh
   npm install
   
3. *Set up environment variables:*
   Create a .env file in the root directory and add:
   env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   
4. *Run the development server:*
   sh
   npm start
   

## API Endpoints
### Authentication
- *POST /api/auth/signup* - User registration
- *POST /api/auth/login* - User login (returns JWT token)

### User
- *GET /api/users/:id* - Fetch user profile
- *PUT /api/users/:id* - Update user profile

### Posts
- *POST /api/posts* - Create a new post
- *GET /api/posts* - Get all posts
- *GET /api/posts/:id* - Get a single post
- *DELETE /api/posts/:id* - Delete a post

## Contributing
Feel free to open an issue or submit a pull request if you want to contribute.
## Demo Pictures
![Image](https://github.com/user-attachments/assets/b940e654-70b3-4f02-8652-ff222cfe4e93)

![Image](https://github.com/user-attachments/assets/5838df7e-4490-42e2-b9e1-c924167144ec)


![Image](https://github.com/user-attachments/assets/43783f5f-76b2-414f-bb69-36cf35be9b9a)
![Image](https://github.com/user-attachments/assets/2b14bdf3-b6b4-4213-a7bd-08bdc474e14c)

