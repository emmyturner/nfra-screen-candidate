FROM node:alpine
WORKDIR /usr/app
ADD ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]