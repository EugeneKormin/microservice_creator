# Critiq

Brief description of your project.

# Project Structure

1. ConfigReader.py: Reads configuration from config.ini file.
2. Project_review_simulation.py: Implements a project review simulation using OpenAI's GPT-3.5 model.
3. Server.py: Flask server that handles API requests for generating replies.
4. Dockerfile: Defines the Docker image for the application.
5. nginx.conf: Nginx configuration for reverse proxying and CORS handling.

# Setup and Installation

1. Clone the repository and navigate to the project directory.
2. Create a config.ini file in the project root with your OpenAI API key.
3. Install the required Python packages using the requirements.txt file.
4. Build the Docker image.
5. Run the Docker container, mapping port 8000.

# Usage
1. The application exposes an API endpoint at /api/generate-reply.
2. Send POST requests to this endpoint with a JSON payload containing an ideaDescription field.
3. The server will respond with generated questions based on the input.

# Configuration

1. The application uses a SOCKS5 proxy for API requests. Modify proxy settings in Project_review_simulation.py.
2. Nginx listens on port 8000 and forwards requests to the Flask application on port 5000.
3. CORS is configured to allow requests from 172.17.0.2:80. Adjust in nginx.conf if needed.

# Development
To run the application locally without Docker:

# Start the Flask server using Server.py.
The server will be accessible at http://127.0.0.1:5000.
