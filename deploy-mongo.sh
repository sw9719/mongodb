# Note that all resource are created in default namespace by default
shopt -s expand_aliases

alias k=$(which kubectl)

echo -e "Creating Configmap that contains files for initializing the database\n"
k create cm dbfiles --from-file=users.json --from-file=db1.json --from-file=db2.json --from-file=init2.js=init2.js

echo ""

echo -e "Creating Configmap that contains mongodb configuration\n"
k create cm dbconfig --from-file=mongod.conf=mongod.conf

echo ""
#note that the backup user is created as part of mongodb initialization
#To change the users and role, refer to the users.json and supply the
#user here having sufficient privileges to backup the entire db


echo -e "Creatin configmap containing mongodb root credentials\n"

k create secret generic mongoadmin --from-literal=MONGO_INITDB_ROOT_USERNAME=mongoadmin --from-literal=MONGO_INITDB_ROOT_PASSWORD=root --from-literal=BACKUPUSER=backup --from-literal=BACKUPPASS=backup

echo ""

#The purpose of this pvc is explained in detailin README.md.
#At MongoDB level, the key is used for authentication during
#replication

echo -e "Creating MongoDB key pvc\n"
k create -f manifests/key-pvc.yaml

echo ""

echo -e "Creating key secret\n"

k create secret generic dbkey --from-file=key=key

echo ""

echo -e "Creating configmap for replication initialization script\n"
k create cm repinit --from-file=init.js=init3.js

echo ""

echo -e "Creating the MongoDB headless svc\n"
k create -f manifests/headless-svc.yaml

echo ""

echo -e "Creating the MongoDB statefulset\n"
k create -f manifests/sts.yaml
