import ipaddress
import subprocess


def host_search(ip_address_search):

    try:

        ipaddress.ip_network(ip_address_search, strict=False)
        result = subprocess.run(["nmap", "-Pn", ip_address_search], capture_output=True, text=True)
        print(f"{result.stdout}\n")
        print(f"=======================\n{result.stderr}")
        return result.stdout
    
    except ValueError:
        return result.stderr
