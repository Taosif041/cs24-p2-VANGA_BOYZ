# Use the official Node.js image as the base image
FROM node:20.9.0-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire Angular app to the container
COPY . .

# Expose port 4200 (default port for Angular development server)
EXPOSE 4200

# Start the Angular app
CMD ["npm", "start"]