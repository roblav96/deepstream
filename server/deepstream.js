// 

var DeepstreamServer = require( 'deepstream.io' )
var RethinkDBStorageConnector = require( 'deepstream.io-storage-rethinkdb' )

var server = new DeepstreamServer( {
	host: 'localhost',
	port: 6020,
	tcpPort: 6021
} )

server.set( 'storage', new RethinkDBStorageConnector( {
	port: 5672,
	host: 'localhost'
} ) )

server.start()

