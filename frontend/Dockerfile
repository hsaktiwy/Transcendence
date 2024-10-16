FROM node:18


WORKDIR /cache
COPY package.json package-lock.json ./
RUN npm install --silent

WORKDIR /app
COPY package.json package-lock.json ./

ENV PATH /app/node_modules/.bin:$PATH

COPY . .
# RUN npm install

RUN chmod +x tools/script.sh


CMD ./tools/script.sh
