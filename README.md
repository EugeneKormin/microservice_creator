# Critiq

Brief description of your project.

# Project Structure

ConfigReader.py: Reads configuration from config.ini file.
Project_review_simulation.py: Implements a project review simulation using OpenAI's GPT-3.5 model.
Server.py: Flask server that handles API requests for generating replies.
Dockerfile: Defines the Docker image for the application.
nginx.conf: Nginx configuration for reverse proxying and CORS handling.

# Setup and Installation

Clone the repository and navigate to the project directory.
Create a config.ini file in the project root with your OpenAI API key.
Install the required Python packages using the requirements.txt file.
Build the Docker image.
Run the Docker container, mapping port 8000.

# Usage
The application exposes an API endpoint at /api/generate-reply. Send POST requests to this endpoint with a JSON payload containing an ideaDescription field. The server will respond with generated questions based on the input.
Configuration

The application uses a SOCKS5 proxy for API requests. Modify proxy settings in Project_review_simulation.py.
Nginx listens on port 8000 and forwards requests to the Flask application on port 5000.
CORS is configured to allow requests from 172.17.0.2:80. Adjust in nginx.conf if needed.

# Development
To run the application locally without Docker:

# Start the Flask server using Server.py.
The server will be accessible at http://127.0.0.1:5000.
