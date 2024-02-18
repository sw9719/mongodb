const user = process.env["MONGO_INITDB_ROOT_USERNAME"]
const pass = process.env["MONGO_INITDB_ROOT_PASSWORD"]

var host =  process.env["HOSTNAME"]
idx = host.split('-')[1]
if (idx!='0') {
	print('exiting early')
        quit(0);
}


db = connect('mongodb://'+user+':'+pass+'@localhost/admin');

var svc =  ""
if (process.env["SVC"]) {
	svc = (process.env["SVC"])
}

var host1=host.split('-')[0]+"-0."+svc
var host2=host.split('-')[0]+"-1."+svc
var host3=host.split('-')[0]+"-2."+svc

try {
  rs.status()
}
catch(err) {
  if (err.codeName == "NotYetInitialized") {
     rs.initiate(
     {
      _id : "rs0",
       members: [
      { _id : 0, host : host1+":27017", priority: 1 },
      { _id : 1, host : host2+":27017", priority: 0.5 },
      { _id : 2, host : host3+":27017", priority: 0.5 }
       ]
     })
  }
  else {
     throw err;
  }

}

//db.getMongo().setReadPref('secondary')
