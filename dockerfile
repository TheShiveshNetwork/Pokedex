# Use an official Node.js runtime as the base image

FROM node:16


# Set the working directory inside the container

WORKDIR /app


# Copy the package.json and package-lock.json files to the container

COPY package*.json ./


# Install the project dependencies

RUN npm install


# Copy the rest of the application code to the container

COPY . .


# Expose the port that the app will run on (if necessary)

EXPOSE 8080:8080


# Define the command to start your application

CMD ["npm", "start"]
