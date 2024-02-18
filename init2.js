var host =  process.env["HOSTNAME"]
idx = host.split('-')[1]
if (idx!='0') {
	print("exiting early")
        quit(0);
}

const user = process.env["MONGO_INITDB_ROOT_USERNAME"]
const pass = process.env["MONGO_INITDB_ROOT_PASSWORD"]
db = connect('mongodb://'+user+':'+pass+'@localhost/admin');
let i = 0;
var file =  fs.readFileSync('/docker-entrypoint-initdb.d/users.json', 'utf8' )
var myusers = JSON.parse(file);
while (i < myusers.length) {
	if (db.getUser(myusers[i].user) == null) {
		db.createUser(myusers[i]);
	}
	i++;
}

db = db.getSiblingDB("testdb1");
if (db.test.countDocuments({}) == 0) {
        var datastr =  fs.readFileSync('/docker-entrypoint-initdb.d/db1.json', 'utf8' )
        var data = JSON.parse(datastr)
        db.test.insertMany(data)
}
db = db.getSiblingDB("testdb2")
if (db.test.countDocuments({}) == 0) {
        var datastr =  fs.readFileSync('/docker-entrypoint-initdb.d/db2.json', 'utf8' )
        var data = JSON.parse(datastr)
        db.test.insertMany(data)
}

