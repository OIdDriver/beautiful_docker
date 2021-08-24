FROM debian
RUN apt update && apt install -y curl
WORKDIR /app
ADD https://updates.peer2profit.com/p2pclient /app/
RUN chmod +x p2pclient
ENV email=dahuomao@gmail.com
CMD [ "/app/p2pclient", "-l", "$email" ]
# CMD ["sleep", "infinity"]
