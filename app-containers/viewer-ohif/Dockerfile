######################################################

FROM node:16.20.2-slim as builder

RUN apt-get update && apt-get install -y git

WORKDIR /sources
# RUN git clone https://github.com/OHIF/Viewers.git
COPY ./repo-viewer-ohif /sources/Viewers

WORKDIR /sources/Viewers

RUN yarn install --frozen-lockfile --verbose --network-timeout 100000

ENV QUICK_BUILD true
# ENV GENERATE_SOURCEMAP=false
# ENV REACT_APP_CONFIG=config/default.js
ARG PUBLIC_URL=/viewer/
# ARG QUICK_BUILD=true

RUN yarn install 
RUN QUICK_BUILD=true PUBLIC_URL=/viewer/ yarn run build
# RUN QUICK_BUILD PUBLIC_URL yarn run build
# RUN QUICK_BUILD=QUICK_BUILD PUBLIC_URL=PUBLIC_URL yarn run build

######################################################

FROM nginx:1.23

RUN mkdir /etc/nginx/enabled-sites
RUN mkdir /scripts

COPY ./nginx/ohif-static.conf /etc/nginx/enabled-sites/
ADD ./nginx/ohif-nginx-http.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /sources/Viewers/platform/app/dist /usr/share/nginx/html/

# COPY config
# COPY ./repo-viewer-ohif/platform/app/public/config/pathcloud_local.js /usr/share/nginx/html/app-config.js

## Copy modified files to public
COPY ./repo-viewer-ohif/platform/app/public/gestalt-logo-light.png /usr/share/nginx/html/gestalt-logo-light.png
COPY ./repo-viewer-ohif/platform/app/public/gestalt-logo-light.png /usr/share/nginx/html/ohif/gestalt-logo-light.png
# COPY ./public/html-templates/index.html /usr/share/nginx/html/index.html
COPY ./repo-viewer-ohif/platform/app/public/assets/favicon.png /usr/share/nginx/html/favicon.png