FROM node:boron

# Create app directory
RUN mkdir -p /Users/paul/Projects/wp
WORKDIR /Users/paul/Projects/wp

# Install app dependencies
COPY package.json /Users/paul/Projects/wp
RUN npm install

# Bundle app source
COPY . /Users/paul/Projects/wp

EXPOSE 8080

CMD [ "npm", "start" ]