FROM node:22-alpine 

WORKDIR /app 

COPY package.json package-lock.json* ./

RUN npm install 

COPY . .

EXPOSE 8000

#development 

CMD ["npm", "run", "dev"]

#production

#production
