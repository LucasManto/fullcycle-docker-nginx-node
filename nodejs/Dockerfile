FROM node

RUN apt update && \
    apt install -y wget netcat && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

WORKDIR /app

COPY . .

RUN chmod +x ./start.sh

EXPOSE 3000

CMD [ "node", "index.js" ]