kubectl delete -f sts.yaml
kubectl delete cm dbconfig dbfiles repinit
kubectl delete secret dbkey mongoadmin
kubectl delete -f headless-svc.yaml
kubectl delete -f key-pvc.yaml
kubectl delete pvc mongodb-data-mongodb-0 mongodb-data-mongodb-1 mongodb-data-mongodb-2
