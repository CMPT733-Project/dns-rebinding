# DNS Rebinding Attack on Smart Lightbulb

This is the repo for CMPT 733 (Spring 2022) term project.

# What is DNS Rebinding Attack?

Many IoT devices do not have a strong protection mechanism, if attackers can
directly interact with them, they can easily compromise these devices.


##### Performing the DNS rebinding attack #####
cd dns
dcbuild
dcup

dig www.attacker733.com should answer with the attacker's web server
dig ns.attacker733.com should answer with the attacker's nameserver

go to google chrome -> www.attacker733.com & www.attacker733.com/change

# We need to bypass the Same-Origin Policy protection first
dockersh into attacker-web
cd /app/cmpt733attacker/templates/js/
nano change.js
change the url
docker container restart attacker-web # restart the container

### DNS rebinding
# We need to send the request to the IOT server, by using the dns rebinding technique
# First map the attacker website name to the IP address of the IoT server
dockersh into attacker-ns
cd /etc/bind/
nano zone_attacker733.com
edit the zone file
rndc reload

# Go to the loacal dns server and flush the cache
dockersh into local-dns-server
rndc flush

# Now from the user machine do
dig www.attacker733.com again then we can see it answers with the IoT server!

# Go to attacker/change and click the button -> click
# so the request triggered by the attacker button will go to the IoT device


### Some useful commands for running Docker ###
$ dcbuild # docker-compose build
$ dcup # docker-compose up
$ dcdown # docker-compose down
$ dockerps # docker ps --format "{{.ID}}  {{.Names}}"'
$ dockersh <container> # docker exec -it <container> /bin/bash;
