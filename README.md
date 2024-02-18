# MongoDB Kubernetes
## Overview

[MongoDB](https://github.com/mongodb/mongo) is a No-SQL database which can be used to store and query unstructured data at very high speeds. For redundancy and high availability the database can be configured with replication
This projects aims at deploying MongoDB statefulset on kubernetes with replication and authentication enabled. It uses dynamic storageClass for for statefulsets. 
The [NFS](https://github.com/kubernetes-csi/csi-driver-nfs) csi provisioner provides a quick method for setting up dynamic provisoning for the setup.
In this setup a cronjob is deployed which will take periodic backups of the MongoDb server.

## Requirements

- A running Kubernetes cluster
- Kubectl CLI configured to interact with the cluster
- Dynamic storage class for Persisten Storae

## Running

```
chmod +x deploy-mongo.sh
chmod +x deploy-cron.sh
./deploy-mongo-sh
./deploy-cron.sh
```

## Configuring authentication

The root username and password is hardcoded in the script and needs to be changed if different credentials are needed. Similarly, the users.json contains sample users
and their roles which can be changed.

## Database intialization

The *.js scripts initialize the database by adding dummy data and initiating replication. Edit the init2.js for configuring initialization.

## Miscellaneous

MongoDB uses keyfile for replication with authentication. This files needs to have 400 permission and owner mongodb. This is not possible through Kubernetes[1](https://stackoverflow.com/questions/49945437/changing-default-file-owner-and-group-owner-of-kubernetes-secrets-files-mounted)[2](github.com/kubernetes/kubernetes/issues/81089)configmap/secrets.
As a workaround, the key is copied to a Persistent Volume and and required permissions are set using an initcontainer


