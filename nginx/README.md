# How to set up SSL

1. Install NGNIX or confirm that it is running
```bash
sudo systemctl status nginx
```
optinal
```bash
sudo systemctl restart nginx
```


2. Install Certbot
```bash
apt-get update
sudo apt-get install certbot
apt-get install python3-certbot-nginx
```
3. Create the certificate
```bash
sudo certbot --nginx -d azvm-mlops-b8.westus2.cloudapp.azure.com -d azvm-mlops-b8.westus2.cloudapp.azure.com
```

or update the certificate
```bash
sudo certbot renew
```


4. Copy the certifcate to a locate than can be accessed by Docker
```bash
cp /etc/letsencrypt/archive/azvm-mlops-b8.westus2.cloudapp.azure.com/privkey1.pem /datadrive/development/CAT/nginx/privkey1.pem
cp /etc/letsencrypt/archive/azvm-mlops-b8.westus2.cloudapp.azure.com/fullchain1.pem /datadrive/development/CAT/nginx/fullchain1.pem
```


### Help

[NGINX](https://phoenixnap.com/kb/nginx-start-stop-restart)
[LetsEncrypt](https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/)