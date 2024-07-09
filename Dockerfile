# Use an official Python runtime as a parent image
FROM python:3.8-slim-buster

# Set the working directory in the container
WORKDIR /critiq

# Copy the current directory contents into the container at /app
COPY . /critiq

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Install Nginx
RUN apt-get update && apt-get install -y nginx

# Install nano
RUN apt-get install nano

# Copy the Nginx configuration file into the container
COPY nginx.conf /etc/nginx/conf.d/

# Define environment variable
ENV NAME=Local

# Create a script to run both Nginx and your Python app
RUN echo '#!/bin/bash\nnginx\npython Server.py' > /critiq/start.sh
RUN chmod +x /critiq/start.sh

# Run the start script when the container launches
CMD ["/critiq/start.sh"]