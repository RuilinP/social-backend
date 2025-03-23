# Use Node.js LTS version as base
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Set environment variables if needed
# ENV PORT=5000

# Expose backend port
EXPOSE 5000

# Run the app
CMD ["node", "server.js"]
