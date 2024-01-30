FROM osimis/orthanc:master-full

# Install dependencies for GCP Plugin
RUN apt-get update && apt-get install -y build-essential unzip cmake mercurial 
    # TODO - Not certain if following dependencies are required, need to test
RUN apt-get install -y libjpeg-dev uuid-dev libgtest-dev libpng-dev libsqlite3-dev zlib1g-dev libboost-all-dev libjsoncpp-dev
    
# Build Orthanc GCP Auth Plugin
WORKDIR /
RUN set -ex;                                                \
    mkdir -p /development/plugins;                          \
    cd /development/plugins;                                \
    hg clone https://orthanc.uclouvain.be/hg/orthanc-gcp;   \
    cd orthanc-gcp;                                          \
    mkdir Build;                                             \
    cd Build;                                                \
    cmake .. -DSTATIC_BUILD=ON -DCMAKE_BUILD_TYPE=Release;   \
    make;                                                    
RUN cp /development/plugins/orthanc-gcp/Build/libOrthancGoogleCloudPlatform.so /usr/share/orthanc/plugins-available/libOrthancGoogleCloudPlatform.so

# Install "orthanc-server-extensions" python plugin
# COPY plugins/orthanc-server-extensions/orthanc_ext /python/orthanc_ext
RUN mkdir /python
WORKDIR /python
COPY \
    plugins/orthanc-server-extensions/setup.py \
    plugins/orthanc-server-extensions/README.rst \
    plugins/orthanc-server-extensions/HISTORY.rst \
    ./
RUN pip3 install httpx requests .[nats-event-publisher,pyorthanc] # does not get picked up in setup.py
RUN python3 setup.py install
# COPY plugins/orthanc-server-extensions/entry_point.py /python/entry_point.py