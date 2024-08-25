FROM node:22-alpine 

WORKDIR /app 

COPY package.json /app/

RUN npm install 

COPY . /app/

EXPOSE 3000 

#development
CMD ["npm","run", "dev"]

#production
#CMD ["pnpm", "start"]