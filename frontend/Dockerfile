## base image
FROM node:12-slim

MAINTAINER Odur Joseph <odurjoseph8@gmail.com>


ARG NODE_ROOT=/app

## add and install node requirements
RUN mkdir $NODE_ROOT
ADD package.json $NODE_ROOT
WORKDIR $NODE_ROOT

RUN npm install

ADD . $NODE_ROOT/

ENV PATH="${PATH}:${HOME}/node_modules/.bin"

EXPOSE 5555

