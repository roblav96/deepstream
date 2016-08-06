//

var clc = require( 'cli-color' )



module.exports.render = function ( err ) {
	if ( err instanceof Error ) {
		return clc.bold.redBright( err.message ) + '\n\n' + err.stack
	} else {
		return JSON.stringify( err )
	}

}




























//

