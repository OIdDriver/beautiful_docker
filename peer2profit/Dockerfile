FROM debian:10-slim
RUN apt update && apt install -y curl
WORKDIR /app
ADD https://github.com/OIdDriver/beautiful_docker/raw/main/peer2profit/p2pclient /app/
RUN chmod +x p2pclient
ENV email=dahuomao@gmail.com
CMD [ "/app/p2pclient", "-l", "$email" ]
# CMD ["sleep", "infinity"]
