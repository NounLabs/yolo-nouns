exports.handler = async(event, context) => {
    const queryParams = event.queryStringParameters;
    const nounId = queryParams['n'];
    const hash = queryParams['h'];
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
		    <html>
			    <head>
					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content="@yolonouns" />
					<meta name="twitter:title" content="YOLO Nouns">
					<meta name="twitter:description" content="YOLO into Nouns!">
					<meta name="twitter:image" content="/share/noun-png?n=${nounId}&h=${hash}">

					<meta property="og:title" content="YOLO Nouns" />
					<meta property="og:description" content="YOLO into Nouns!" />
					<meta property="og:image" content="/share/noun-png?n=${nounId}&h=${hash}" />
			    
				 	<script>
						window.onload = function() {
						    ${jsRedirect};
						}			 	
				 	</script>
			    </head>
			    <body>
			    	<img src="/share/noun-png?n=${nounId}&h=${hash}" />
			    </body>
		    </html>
	    `,        
    }
}