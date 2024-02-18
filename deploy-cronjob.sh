shopt -s expand_aliases

alias k=$(which kubectl)

echo -e "Creating pvc for backup\n"

k create -f manifests/backup-pvc.yaml

echo ""

echo -e "Creating cronjob for backup\n"

k create -f manifests/cron.yaml

