//
'use strict'

var _ = require( 'lodash' )

/*==============================
=            CONFIG            =
==============================*/

process.pm_id = process.env.pm_id || 0
process.dname = process.env.dname || 'Deepstream'
process.host = process.env.host || 'localhost'
process.port = _.parseInt( process.env.port ) || 5337
process.environment = process.env.NODE_ENV || 'DEVELOPMENT'

/*=======  END CONFIG  =======*/

var inspect = require( 'eyes' ).inspector( {
	maxLength: 8192
} )
var clc = require( 'cli-color' )
var restify = require( 'restify' )
var Promise = require( 'bluebird' )
var pe = require( './errors.js' )

var moment = require( 'moment' )





/*======================================
=            CONSOLE FORMAT            =
======================================*/
require( 'debug-trace' )( {
	always: false,
} )
console.format = function ( c ) {
	var time = moment( _.now() ).format( 'hh:mm:ss:SSS' )
	var stack = '[' + c.filename + ':' + c.getLineNumber() + ']'
	var cString
	if ( c.method == 'log' ) {
		cString = time + stack
	} else if ( c.method == 'info' ) {
		cString = clc.green( time ) + stack
	} else if ( c.method == 'warn' ) {
		cString = clc.yellowBright( '=============================== WARN ================================\n' ) +
			clc.yellow( time ) + stack
	} else if ( c.method == 'error' ) {
		cString = clc.redBright( '=============================== ERROR ================================\n' ) +
			clc.red( time ) + stack
	}
	return '\n \n' + clc.underline( cString ) + '\n'
}





var server = restify.createServer( {
	name: process.dname,
} )





server.use( restify.CORS( {
	origins: [ '*' ],
	headers: [ 'x-tok' ],
} ) )

server.use( restify.bodyParser() )
















/*==============================
=            ERRORS            =
==============================*/

server.on( 'uncaughtException', function ( req, res, route, err ) {
	console.error( clc.bold.redBright( "/*==========  UNCAUGHT EXCEPTION  ==========*/" + xid ) )
	if ( err.we_cause ) {
		console.error( pe.render( err.we_cause ) )
	} else {
		console.error( pe.render( err ) )
	}
	res.send( new restify.errors.InternalServerError( err.message ) )
} )

Promise.onPossiblyUnhandledRejection( function ( error ) {
	console.error( clc.red.bold( "/*===========================================\n" ) +
		clc.red.bold( "=            GLOBAL PROMISE ERROR            =\n" ) +
		clc.red.bold( "============================================*/" ) )
	console.error( pe.render( error ) )
} )

process.on( 'uncaughtException', function ( err ) {
	console.error( clc.red.bold( "/*==========================================\n" ) +
		clc.red.bold( "=            UNCAUGHT EXCEPTION            =\n" ) +
		clc.red.bold( "==========================================*/" ) )
	if ( err.we_cause ) {
		console.error( pe.render( err.we_cause ) )
	} else {
		console.error( pe.render( err ) )
	}
} )

process.on( 'unhandledRejection', function ( err ) {
	console.error( clc.bold.redBright( "/*==========  UNHANDLED REJECTION  ==========*/" ) )
	if ( err.we_cause ) {
		console.error( pe.render( err.we_cause ) )
	} else {
		console.error( pe.render( err ) )
	}
} )















/*====================================
=            START SERVER            =
====================================*/
server.listen( process.port, function () {



	console.info( '\n' +
		clc.bold.underline( process.dname ) + '\n' +
		clc.bold( process.environment ) + ' @ ID ' + clc.bold.redBright( process.pm_id ) + '\n' +
		clc.bold( process.host ) + clc.bold( ':' ) + clc.bold( process.port ) + '\n' +
		// "\n/*===============================================\n" +
		"=================================================\n" +
		"=========           " + clc.bold( moment( _.now() ).format( 'hh:mm:ss' ) ) + "           ==========\n" +
		// "=================================================\n" +
		"===============================================*/"
	)



} )






























//

