## Segment Saver
A React-based application that allows users to save data segments by sending JSON data to a webhook URL.

## Overview
This project is a simple React application that allows users to define a segment with a name and schema fields. When the user clicks on "Save Segment," the application sends the segment data as a JSON object to a webhook URL.

### Project Setup Guide
This project consists of both frontend and backend components. Follow the steps below to set up, install dependencies, and run each part of the project.

---

## Prerequisites
Ensure you have the following installed on your machine:


- **Node.js** (includes npm, the Node Package Manager)
- **npm** (Node Package Manager, bundled with Node.js)

## Backend Setup

1. **Navigate to the Backend Directory:**

   Open a terminal and move to the backend directory:
   
   ```bash
   cd backend
   
2. **Install Required Dependencies:**

   Install the necessary packages in the backend directory:

   ```bash
   npm install express cors node-fetch

3. **Start the Backend Server:**

   Run the backend server with the following command:

   ```bash
    node server.js
   
  Keep this terminal open to ensure the backend server remains running.

4. **Webhook Integration:**

   This project is configured to send data to the following webhook URL:

    ```arduino
    https://webhook.site/8be690de-4e65-4d8a-865d-3e5dff4c5766
    
  This URL will capture the data sent from the frontend or backend upon saving segments or any    other trigger points in the application.


## Frontend Setup

1. **Navigate to the Frontend Directory:**

   Open a new terminal window in the project root directory (where the frontend files are          located).

2. **Start the Frontend Server:**

   Use the following command to start the frontend server:

   ```bash
    npm start

## Running the Project
1. Start the backend server by following the instructions in the "Backend Setup" section above.
2. Then, start the frontend server by following the instructions in the "Frontend Setup" section.
3. With both servers running, you can access the application in your browser at http://localhost:3000.

## Notes
* Ensure that both the backend and frontend servers are running simultaneously.
* Keep both terminal windows open to maintain server functionality throughout development and testing.
   
