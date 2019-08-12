FROM node:8  
EXPOSE 8080 
RUN mkdir -p /www 
WORKDIR /www 
COPY . /www 
RUN npm install 
RUN chmod +x /www/entryPoint.sh 
ENTRYPOINT ["/www/entryPoint.sh"] 
