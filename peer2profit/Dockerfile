FROM debian:10-slim
RUN apt update && apt install -y curl
WORKDIR /app
ADD https://down.dao.ke/SOFT/GJ/p2p/20210817/p2pclient /app/
RUN chmod +x p2pclient
ENV email=dahuomao@gmail.com
CMD [ "/app/p2pclient", "-l", "$email" ]
# CMD ["sleep", "infinity"]
