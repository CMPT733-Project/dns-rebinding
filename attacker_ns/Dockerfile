FROM handsonsecurity/seed-server:bind

# Copy the configuration and zone files
COPY named.conf  zone_attacker733.com  /etc/bind/

CMD service named start && tail -f /dev/null
