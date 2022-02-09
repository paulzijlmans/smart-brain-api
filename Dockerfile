FROM node:16.13.2

WORKDIR /usr/src/smart-brain-api

COPY package.json /usr/src/smart-brain-api
RUN npm install

COPY . /usr/src/smart-brain-api