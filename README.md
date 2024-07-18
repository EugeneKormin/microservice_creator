# Frontend
A web application for submitting program ideas and generating questions based on those ideas.

## Project Structure

1. Server.py: Flask server that serves the main page and handles API requests.
2. response_script.js: Client-side JavaScript for form submission and API interaction.
3. index.html: Main HTML template for the web interface.
4. Dockerfile: Defines the Docker image for the application.
5. nginx.conf: Nginx configuration for reverse proxying and routing.

## Setup and Installation

1. Clone the repository and navigate to the project directory.
2. Install the required Python packages.
3. Build the Docker image.
4. Run the Docker container.

## Usage

1. Access the web interface at http://localhost:8000 (or your server's IP address).
2. Enter your program idea in the provided form.
3. Submit the form to receive generated questions based on your idea.

## Configuration

1. Flask server runs on 127.0.0.1:5000 inside the container.
2. Nginx listens on port 8000 and forwards requests to the Flask application.
3. Static files are served from the /server/static/ directory.
4. CORS is configured to allow requests from 172.17.0.3:80.

## Development
To run the application locally without Docker:

1. Start the Flask server using Server.py.
2. The server will be accessible at http://127.0.0.1:5000.


graph TD
    A[Client Browser] -->|HTTP Request| B[Nginx :8000]
    B -->|Proxy to :5000| C[Flask Server]
    C -->|Serve| D[index.html]
    D -->|Load| E[response_script.js]
    E -->|API Call| F[/critiq/api/generate-reply]
    F -->|Proxy to :8000| B
    B -->|Forward to Flask| C
    C -->|Process Request| G[Generate Questions]
    G -->|Return Response| C
    C -->|JSON Response| B
    B -->|HTTP Response| A

