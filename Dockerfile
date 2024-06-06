# Используйте официальный образ Node.js
FROM node:20-alpine as build

# Установите рабочую директорию внутри контейнера
WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

EXPOSE 3000
# Определите команду, которая будет запущена при старте контейнера
CMD ["npm", "start"]