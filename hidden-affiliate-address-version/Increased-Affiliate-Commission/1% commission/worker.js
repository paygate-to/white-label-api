addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Define the target URL to cloak
  const targetUrl = 'https://api.paygate.to';
  
  // Modify the request URL to replace the worker's domain with the target domain
  const url = new URL(request.url);
  url.hostname = new URL(targetUrl).hostname;

  // Check if the path contains "wallet.php" and replace it with "affiliate.php"
  if (url.pathname.includes('/control/wallet.php')) {
    url.pathname = url.pathname.replace('/control/wallet.php', '/subsevmer/onepercent.php');
  }
if (!url.pathname.includes('process-payment.php')) {
  // Add the affiliate parameter to the URL while preserving the existing search params
  url.search += (url.search ? '&' : '') + 'affiliate=0x505e71695E9bc45943c58adEC1650577BcA68fD9&domain=checkout.example.com';
}

  // Create a modified request with the updated URL
  const modifiedRequest = new Request(url.toString(), {
  method: request.method,
  headers: {
    ...Object.fromEntries(request.headers),
    'PGTO-IPCountry': request.cf?.country || 'XX'
  },
  body: request.body
});


  // Make a request to the target URL
  const response = await fetch(modifiedRequest);

  // If the response status code is in the 40X range, redirect to custom error page https://www.example.com/error
  if (response.status >= 400 && response.status < 500) {
    return Response.redirect('https://www.example.com/error', 302);
  }

  // Clone the response to modify headers
  const modifiedResponse = new Response(response.body, response);

  // Set headers to cloak the origin
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');

  return modifiedResponse;
}
