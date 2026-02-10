// This worker is an example to be used by your sub-affiliate pointing to your domain while setting their own commission
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Define the target URL to cloak
  const targetUrl = 'https://api.white-labeled-domain.com';
  
  // Modify the request URL to replace the worker's domain with the target domain
  const url = new URL(request.url);
  url.hostname = new URL(targetUrl).hostname;

  // Check if the path contains "wallet.php" and replace it with "set-affiliate.php"
  if (url.pathname.includes('/control/wallet.php')) {
    url.pathname = url.pathname.replace('/control/wallet.php', '/set-affiliate.php');
  }
if (!url.pathname.includes('process-payment.php')) {
  // Add the affiliate parameter to the URL while preserving the existing search params
  url.search += (url.search ? '&' : '') + 'sub_affiliate=0x3B98AFD0Bb4b4291eD825d1A8d5E62b14800cf9e&domain=checkout.sub-affiliate-website.com';
  
  // Set custom fees. The total here would depend on the &affiliate_fee= parameter set in your advanced white label worker so the final total should always be 0.99
  url.search += (url.search ? '&' : '') + 'sub_affiliate_fee=0.01'; // Example where your sub-affiliate set their commission to 1%
  url.search += (url.search ? '&' : '') + 'merchant_fee=0.97'; // Here we used example where your original worker has &affiliate_fee=0.01 (1%) so you instruct your sub-affiliate in your API docs for a total of 0.98 and the final total would be 0.99
}
  // Create a modified request with the updated URL
  const modifiedRequest = new Request(url.toString(), {
  method: request.method,
  headers: {
    ...Object.fromEntries(request.headers),
    'PGTO-IPCountry': request.cf?.country || 'XX'
  },
  body: request.body ? request.clone().body : null,
  redirect: 'manual'
});


  // Make a request to the target URL
  const response = await fetch(modifiedRequest);
  
  if (response.status >= 300 && response.status < 400) {
    return response;
  }

  // If the response status code is in the 40X range, redirect to custom error page https://www.example.com/error
  if (response.status >= 400 && response.status < 500) {
    return Response.redirect('https://www.sub-affiliate-website.com/error', 302);
  }

  // Clone the response to modify headers
  const modifiedResponse = new Response(response.body, response);

  // Set headers to cloak the origin
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');

  return modifiedResponse;
}
