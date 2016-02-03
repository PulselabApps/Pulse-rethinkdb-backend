FROM node:latest

RUN mkdir /src

WORKDIR /src
ADD . /src
RUN npm i

EXPOSE 8081

CMD npm start