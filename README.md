# Azure AKS Full Stack Project With Ingress

# Objective

Deploy:
- Frontend
- Backend API
- NGINX Ingress

on Azure Kubernetes Service (AKS).

------------------------------------------------------------

# Final Architecture

Internet
   |
Azure Load Balancer
   |
NGINX Ingress Controller
   |
--------------------------------
|                              |
Frontend Service         Backend Service

------------------------------------------------------------

# WHY Use Ingress?

Without ingress:
- every app creates separate LoadBalancer
- more public IPs
- more cost

With ingress:
- one LoadBalancer
- multiple applications routing

------------------------------------------------------------

# Project Structure

backend/
frontend/
k8s/
azure-pipelines.yml

------------------------------------------------------------

# STEP 1 — Install NGINX Ingress Controller

PowerShell:

helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx `
--namespace ingress-nginx `
--create-namespace

------------------------------------------------------------

# Verify Ingress

kubectl get svc -n ingress-nginx

Wait until EXTERNAL-IP appears.

------------------------------------------------------------

# STEP 2 — Build Backend Image

cd backend

docker build -t backend:v1 .

------------------------------------------------------------

# STEP 3 — Build Frontend Image

cd ../frontend

docker build -t frontend:v1 .

------------------------------------------------------------

# STEP 4 — Create ACR

az acr create `
--resource-group aks-free-rg `
--name YOUR_ACR_NAME `
--sku Basic

------------------------------------------------------------

# STEP 5 — Login ACR

az acr login --name YOUR_ACR_NAME

------------------------------------------------------------

# STEP 6 — Tag Images

docker tag backend:v1 YOUR_ACR_NAME.azurecr.io/backend:v1

docker tag frontend:v1 YOUR_ACR_NAME.azurecr.io/frontend:v1

------------------------------------------------------------

# STEP 7 — Push Images

docker push YOUR_ACR_NAME.azurecr.io/backend:v1

docker push YOUR_ACR_NAME.azurecr.io/frontend:v1

------------------------------------------------------------

# STEP 8 — Update YAML Files

Replace:
YOUR_ACR_NAME

inside:
- backend.yaml
- frontend.yaml

------------------------------------------------------------

# STEP 9 — Deploy Backend

kubectl apply -f k8s/backend.yaml

------------------------------------------------------------

# STEP 10 — Deploy Frontend

kubectl apply -f k8s/frontend.yaml

------------------------------------------------------------

# STEP 11 — Deploy Ingress

kubectl apply -f k8s/ingress.yaml

------------------------------------------------------------

# STEP 12 — Verify Resources

kubectl get pods

kubectl get svc

kubectl get ingress

------------------------------------------------------------

# STEP 13 — Get Ingress External IP

kubectl get svc -n ingress-nginx

Copy EXTERNAL-IP.

------------------------------------------------------------

# STEP 14 — Update Hosts File (Windows)

Open Notepad as Administrator.

Edit:

C:\Windows\System32\drivers\etc\hosts

Add:

EXTERNAL-IP demo.local

Example:

20.204.xx.xx demo.local

------------------------------------------------------------

# STEP 15 — Open Browser

Open:

http://demo.local

Frontend will open.

Click button:
Backend API response will appear.

------------------------------------------------------------

# Routing Logic

/      -> frontend-service
/api   -> backend-service

------------------------------------------------------------

# Verify Ingress

kubectl describe ingress aks-ingress

------------------------------------------------------------

# Cleanup

kubectl delete -f k8s/ingress.yaml

kubectl delete -f k8s/frontend.yaml

kubectl delete -f k8s/backend.yaml

az group delete `
--name aks-free-rg `
--yes

------------------------------------------------------------

# Final Outcome

You learned:
- AKS
- Ingress
- Azure LoadBalancer
- Frontend + Backend deployment
- Docker
- Kubernetes services
- Azure DevOps CI/CD
