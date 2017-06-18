FROM node:boron

# Create app directory
RUN mkdir -p /project
WORKDIR /project

# Install app dependencies
COPY package.json /project
RUN npm install

# Bundle app source
COPY . /project

EXPOSE 8080

ENTRYPOINT npm run build \
	npm run server