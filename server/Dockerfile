# Base image for backend
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy prisma folder
COPY prisma ./prisma

# Install dependencies (postinstall will generate Prisma client successfully)
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port
EXPOSE 3000

# Start the backend
CMD ["npm", "run", "dev"]
