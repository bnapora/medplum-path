#### Setup osimis container with GCP plugin
- Need to build the plugin directly in the container
- Follow compile instructions here: https://orthanc.uclouvain.be/book/plugins/google-cloud-platform.html#google
- Additional (althought outdated) build instructions: https://orthanc.uclouvain.be/hg/orthanc-gdcm/file/default/Resources/BuildInstructions.txt

apt install build-essential unzip
apt-get install cmake mercurial

- Still not certain need to install the following dependencies, but build worked after re-clone and installing these
apt-get install libjpeg-dev uuid-dev libgtest-dev libpng-dev libsqlite3-dev zlib1g-dev libboost-all-dev libjsoncpp-dev 

hg clone https://orthanc.uclouvain.be/hg/orthanc-gcp

cp libOrthancGoogleCloudPlatform.so /usr/share/orthanc/plugins/libOrthancGoogleCloudPlatform.so

### Service Account key-files
Folder: `auth-key-files` in this directory is included in Git ignore for security (need to add if copying repo)
To generate key files go to IAM module in GCP project (eg https://console.cloud.google.com/iam-admin/serviceaccounts?cloudshell=true&project=gcp-pathology-poc1 )