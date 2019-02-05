From node:8
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . /usr/src/app/
EXPOSE 8080