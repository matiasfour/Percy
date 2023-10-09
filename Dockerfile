# Use the official Node.js image as the base image
FROM node:16.20 as build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Use a lightweight Node.js image for the production stage
FROM node:16.20-alpine as production-stage

# Set the working directory inside the production container
WORKDIR /app

# Copy the built assets from the build-stage
COPY --from=build-stage /app/package.json ./package.json
COPY --from=build-stage /app/node_modules ./node_modules
COPY --from=build-stage /app/.next ./.next
COPY --from=build-stage /app/public ./public
#COPY --from=build-stage /app/.env ./.env.production

# Expose the port that the application will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
