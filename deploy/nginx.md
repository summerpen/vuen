* nginx永久重定向

```shell 
    location ^~ / {
        rewrite ^/(.*) /saasframe3/login permanent;
        # rewrite ^/(.*) /saasframe3/$1 permanent;
        #   rewrite ^/(.*) /oms/? permanent;
        # alias /saasframe3;
        # try_files $uri $uri/ /saasframe3/index.html;
    }
```
