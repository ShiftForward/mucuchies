FROM iojs:latest


#
# installation
#

RUN mkdir /app
RUN npm install -g grunt-cli coffee-script http-server

ADD ./package.json /app/package.json
RUN cd /app && npm install -q

#
# copy all
#

ADD . /app
RUN cd /app && grunt build


#
# Container Settings
#

EXPOSE 8080
WORKDIR /app
CMD http-server -p 8080
