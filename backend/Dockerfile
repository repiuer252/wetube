# Gunakan base image Node.js
FROM node:14

# Set working directory
WORKDIR /media/david/NVME M.2/docker

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file backend ke dalam image
COPY . .

# Expose port yang digunakan oleh backend
EXPOSE 8000

# Perintah untuk menjalankan backend
RUN npm install --save sequelize
RUN npm install --save sequelize-cli

CMD ["npm","start"]
