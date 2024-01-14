# Node.js Post CRUD App

A simple Node.js CRUD application using MongoDB for post management.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/miraj004/node-crud-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-repository
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root of your project and add the following content:

    ```plaintext
    MONGODB_URI=mongodb://127.0.0.1:27017/pms
    ```

   Replace the MongoDB URI with your own connection string if necessary.

### Running the Application

1. Start your MongoDB server.

2. Run the application:

    ```bash
    npm start
    ```

   The application will be accessible at [http://localhost:5000](http://localhost:5000) by default.

### Usage

- Open your web browser and navigate to [http://localhost:5000](http://localhost:5000).
- Explore the application and manage posts.

