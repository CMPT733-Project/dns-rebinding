$TTL 2
@       IN      SOA   ns.attacker733.com. admin.attacker733.com. (
                2008111001
                8H
                2H
                4W
                1D)

@       IN      NS    ns.attacker733.com.

@       IN      A     10.9.0.180
www     IN      A     10.9.0.180
;www     IN      A     192.168.60.80
ns      IN      A     10.9.0.153
*       IN      A     10.9.0.100
