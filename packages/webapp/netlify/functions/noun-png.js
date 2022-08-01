const { ImageData, getNounSeedFromBlockHash, getNounData } = require ('@nouns/assets');
const { palette } = ImageData;
const { buildSVG } = require ('@nouns/sdk');
const sharp = require('sharp');

exports.handler = async(event, context) => {
    const queryParams = event.queryStringParameters;

	const nextNounId = queryParams['n'];
	const blockhash = queryParams['h'];
	const seed = getNounSeedFromBlockHash(nextNounId, blockhash);
	
	const { parts, background } = getNounData(seed);
	const svgBinary = buildSVG(parts, palette, background);
	
	let base64Data = '';
	
	try{ 
		const svgNoun = Buffer.from(svgBinary);
	  	const pngNoun = await sharp(svgNoun).png().toBuffer();
	  		  	
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