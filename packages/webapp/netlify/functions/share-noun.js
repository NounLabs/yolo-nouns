exports.handler = async(event, context) => {
    const queryParams = event.queryStringParameters;
    
    const bg = queryParams['bg']; //bg
	const b = queryParams['b']; //body
	const a = queryParams['a']; //accessory
	const h = queryParams['h']; //head
	const g = queryParams['g']; //glasses

    const redirect = queryParams['r'];
    
    let jsRedirect = 'location.href = "/";';
    if (redirect == "no") {
    	jsRedirect = '';
    }
    
    return {
        statusCode: 200,
	    headers: {
	      'Content-Type': 'text/html'
	    },
	    body: `
			<!DOCTYPE html>
			<html lang="en">
			    <head>
				    <meta charset="utf-8" />
				    <meta name="viewport" content="width=device-width, initial-scale=1" />
				    <meta
				      name="description"
				      content="YOLO Nouns"
				    />
	    			<title>YOLO Nouns</title>
	    			<link rel="shortcut icon" type="image/jpg" href="/static/favicon.ico"/>

					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content="@yolonouns" />
					<meta name="twitter:title" content="YOLO Nouns">
					<meta name="twitter:description" content="EVERY.BLOCK.FOREVER. YOLO Nouns is an experimental social project for the Nouns community.">
					<meta name="twitter:image" content="https://yolonouns.wtf/share/noun-png?bg=${bg}&b=${b}&a=${a}&h=${h}&g=${g}">

					<meta property="og:title" content="YOLO Nouns" />
					<meta property="og:description" content="YOLO into Nouns!" />
					<meta property="og:image" content="https://yolonouns.wtf/share/noun-png?bg=${bg}&b=${b}&a=${a}&h=${h}&g=${g}" />
			    
				 	<script>
						window.onload = function() {
						    ${jsRedirect};
						}			 	
				 	</script>
			    </head>
			    <body>
    				<noscript>You need to enable JavaScript to run this app.</noscript>
			    	<center>
				    	<img src="/share/noun-png?bg=${bg}&b=${b}&a=${a}&h=${h}&g=${g}" />
			    	</center>
			    </body>
		    </html>
	    `,        
    }
}