const { ImageData, getNounSeedFromBlockHash, getNounData } = require ('@nouns/assets');
const { palette } = ImageData;
const { buildSVG } = require ('@nouns/sdk');
const sharp = require('sharp');

exports.handler = async(event, context) => {
    const queryParams = event.queryStringParameters;
	
    const bg = queryParams['bg']; //bg
	const b = queryParams['b']; //body
	const a = queryParams['a']; //accessory
	const h = queryParams['h']; //head
	const g = queryParams['g']; //glasses
	
	const seed = {
		background: bg,
	    body: b,
	    accessory: a,
	    head: h,
	    glasses: g,
	};	
	
	const { parts, background } = getNounData(seed);
	const svgBinary = buildSVG(parts, palette, background);
		
	let base64Data = '';
	
	try{ 
		const svgNoun = Buffer.from(svgBinary);
	  	const pngNoun = await sharp(svgNoun)
	  					.png()
	  					.extend({
	  						left: 160,
	  						right: 160,
						    background: '#' + background
						})
	  					.toBuffer();
	  		  	
	  	base64Data = pngNoun.toString('base64');

	} catch(e) { 
		console.error(e); 
	}
	

    return {
        statusCode: 200,
	    headers: {
	      'Content-Type': 'image/png'
	    },
	    body: base64Data,
    	isBase64Encoded: true,	    
    }
}