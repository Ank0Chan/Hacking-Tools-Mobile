import subprocess
import time
import os

AUTH_KEY = "tskey-auth-kERB9gVL7Q11CNTRL-2DUxtFycngBzhHiEmd64hB9tDFyqnVeu"
ROUTES = "192.168.1.0/24"
TAILSCALE_PATH = "/usr/bin/tailscale"

def init_tailscale():
    print("[*] Configuration du tunnel réseau...")

    # Vérification que le binaire existe bien
    if not os.path.exists(TAILSCALE_PATH):
        print(f"[X] Erreur : Tailscale n'est pas trouvé dans '{TAILSCALE_PATH}'")
        print("[!] Lance d'abord : curl -fsSL https://tailscale.com/install.sh | sh")
        return

    try:
        cmd = [
            TAILSCALE_PATH, "up", 
            f"--auth-key={AUTH_KEY}", 
            f"--advertise-routes={ROUTES}",
            "--reset"
        ]
        
        # On lance la commande
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        time.sleep(2) 
        print("[OK] Tunnel Tailscale connecté de manière transparente dans WSL.")
        
    except subprocess.CalledProcessError as e:
        print(f"[X] Erreur lors de l'exécution de Tailscale : {e}")
        print("[!] Vérifie que le service est démarré dans ton terminal : service tailscaled start")

def stop_tailscale():
    print("\n[*] Arrêt du serveur détecté. Fermeture du tunnel Tailscale...")
    if not os.path.exists(TAILSCALE_PATH):
        return

    try:
        cmd = [TAILSCALE_PATH, "down"]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        print("[OK] Tunnel Tailscale fermé avec succès.")
    except subprocess.CalledProcessError as e:
        print(f"[X] Erreur lors de la fermeture de Tailscale : {e}")

if __name__ == "__main__":
    try:
        init_tailscale()
        # Ton code Nmap viendra se glisser ici après
        print("[*] Script en cours d'exécution... (Ctrl+C pour couper)")
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        stop_tailscale()