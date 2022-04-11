# DNS Rebinding Attack on Smart Lightbulb

This is the repo for CMPT 733 (Spring 2022) term project.

### What is DNS Rebinding Attack? ###

A DNS rebinding attack is performed when a malicious website pretends that IP addresses (usually IPs reserved for local networks) are part of their domain. This allows them to circumvent the same-origin policy implemented by browsers and view data from these IP addresses.


### Perform the DNS rebinding attack ###

Our attack environment is hold in a docker image, below are some aliases we have for building the environment: 
~~~
$ dcbuild # docker-compose build
$ dcup # docker-compose up
$ dcdown # docker-compose down
$ dockerps # docker ps --format "{{.ID}}  {{.Names}}"'
$ dockersh <container> # docker exec -it <container> /bin/bash;
~~~

### Bypass the Same-Origin Policy protection ###
Before doing anything when we dig the attacker's URL, it should answer with attacker's web server and nameserver. Our first step to perform the attack is to bypass the Same-Origin Policy and change the URL in the attacker side to be the IoT URL.
First locate the attacker JS file:
~~~
dockersh into attacker-web
cd /app/cmpt733attacker/templates/js/
~~~
After changing the url, restart the attacker container for the attack to take effect:
~~~
docker container restart attacker-web 
~~~

### Change the attacker website name ###
Next we want to map the attacker website name to the IP address of the IoT server.
We do this by changing the attacker zone file:
~~~
dockersh into attacker-ns
cd /etc/bind/
nano zone_attacker733.com
~~~
After editing the zone file, reload the DNS server:
~~~
rndc reload
~~~

### Flush the cache in local DNS server###
Navigate to the local DNS server container:
~~~
$ dockersh into local-dns-server
~~~
flush the cache:
~~~
rndc flush
~~~
Now  when we dig the attacker URL from the user machine we can see it answers with the IoT server! Attacker will be able to click the button and set SmartBulb to toggling state.




