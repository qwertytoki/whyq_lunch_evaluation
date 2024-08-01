# Use the official Node.js image as the base image
FROM node:18.3.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the secret file
COPY config/whyq-lunch-evaluation-777f06764b4e.json config/

# Copy the environment file
COPY .env .env

# Build TypeScript files
RUN npm run build

# Set environment variables
ENV GOOGLE_APPLICATION_CREDENTIALS=config/whyq-lunch-evaluation-777f06764b4e.json
ENV GOOGLE_CLOUD_PROJECT=whyq-lunch-evaluation

# Start the application
CMD ["node", "dist/index.js"]