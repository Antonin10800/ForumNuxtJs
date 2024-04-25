# Use any Node.js base image that you want!
FROM node:21.6.1

# Set the working directory to /app
WORKDIR /app

# Copy the package.json file into the working directory before copying the rest of the files to cache the dependencies
COPY package.json /app

# Install the dependencies, you might want to use yarn or pnpm instead
RUN npm install

# Copy the rest of the files into the working directory
EXPOSE 3000

# Start the application. This is the default command for Nuxt 3
CMD ["node", ".output/server/index.mjs"]