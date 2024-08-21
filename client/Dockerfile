FROM node:14.15.4-alpine3.12 

WORKDIR /app

COPY package.json /app

RUN pnpm install --frozen-lockfile

COPY . /app

EXPOSE 3000

#dev 
CMD ["pnpm", "dev"]

#prod
#CMD ["pnpm", "start"]