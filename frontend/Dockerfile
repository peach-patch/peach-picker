# Step 1: Use Node.js 22.6 as the base image
FROM node:22.6-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the Next.js app in development mode
CMD ["npm", "run", "dev"]