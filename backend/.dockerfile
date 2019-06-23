From node:8.9.4

RUN mkdir /var/code
COPY ./dist /var/code/dist
COPY ./src /var/code/src
COPY ./package.json /var/code/
WORKDIR /var/code
RUN cd ./src
RUN npm install --production
EXPOSE 3000
CMD ["npm", "run", "dockerserve"]
