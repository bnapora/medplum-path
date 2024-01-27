### Notes on Orthanc Plugins & Scripts
#### Links
[Orthanc Documentation - Python Plugin](https://orthanc.uclouvain.be/book/plugins/python.html)
[Fork of orthanc-server-extensions](https://github.com/bnapora/orthanc-server-extensions)
[Additional Python Plugin Script Examples](https://github.com/mohannadhussain/orthanc-plugin-scripts)

## ALERT: Need to Clone orthanc-server-extnesions repo into this folder
- https://github.com/bnapora/orthanc-server-extensions

#### Build Steps
1. Add Python environment build steps to Orthanc dockerfile
1. Use `orthanc-server-extensions` framework for python
1. Add new scripts to ``./orthanc-server-extensions/orthanc_ext/scripts` folder
1. Add function call in `entry_point.py`