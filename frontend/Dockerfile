# Gunakan base image Node.js
FROM node:14

# Set working directory
WORKDIR /media/david/NVME M.2/docker

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file frontend ke dalam image
COPY . .

# Build frontend
RUN npm run build

# Expose port 80
EXPOSE 8080

# Perintah untuk menjalankan frontend
CMD ["npm", "run", "serve"]

