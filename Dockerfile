FROM nginx:latest

# copy application files from dist to nginx root directory
#COPY dist /srv/nginx/webapp
COPY /src/ /srv/nginx/webapp

# copy scripts and harden system
COPY confd/nginx.conf /etc/nginx/nginx.conf