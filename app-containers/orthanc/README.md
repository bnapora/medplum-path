### Notes on Orthanc Setup
Docker - https://book.orthanc-server.com/users/docker.html

Standard WSI Run: `docker run -p 4242:4242 -p 8042:8042 --rm --name orthanc-wsi jodogne/orthanc-plugins:1.12.1`

OSIMIS Docker:
https://book.orthanc-server.com/users/docker-osimis.html

Clone:https://github.com/orthanc-server/orthanc-setup-samples
In: /orthanc-setup-samples/docker/all-usages
Run: docker-compose up --build orthanc-file

