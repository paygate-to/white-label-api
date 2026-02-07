addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Define the target URL to cloak (This URL should remain intact and you should never replace it)
  const targetUrl = 'https://api.paygate.to';
  
  // Modify the request URL to replace the worker's domain with the target domain
  const url = new URL(request.url);
  url.hostname = new URL(targetUrl).hostname;

  // Check if the path contains "wallet.php" and replace it with "custom-affiliate.php". This will work for both credit card and crypto systems and the commission should be set in the relevant code section below.
  if (url.pathname.includes('wallet.php')) {
    url.pathname = url.pathname.replace('/wallet.php', '/custom-affiliate.php');
  }

  // Check the URL path and append the appropriate affiliate wallet parameter (Make sure to replace each wallet below with your own wallet matching the correct blockchain network to receive affiliate commission.)
  if (url.pathname.includes('/control/')) {
    url.search += (url.search ? '&' : '') + 'affiliate=0x505e71695E9bc45943c58adEC1650577BcA68fD9';
  } else if (url.pathname.includes('/crypto/btc')) {
    url.search += (url.search ? '&' : '') + 'affiliate=bc1qx9t2l3pyny2spqpqlye8svce70nppwtaxwdrp4';
  } else if (url.pathname.includes('/crypto/bch')) {
    url.search += (url.search ? '&' : '') + 'affiliate=bitcoincash:qz6v8t9ajq79rrlnckv34am9cgp3dyuhrcj3npwtyh';
  } else if (url.pathname.includes('/crypto/ltc')) {
    url.search += (url.search ? '&' : '') + 'affiliate=ltc1q7zhvk3xwhszepcplsyprzuh68xnw6mysd5k786';
  } else if (url.pathname.includes('/crypto/doge')) {
    url.search += (url.search ? '&' : '') + 'affiliate=D62eMUkApXg3R48CsVTyr8V4WFbeCijSyc';
  } else if (url.pathname.includes('/crypto/eth')) {
    url.search += (url.search ? '&' : '') + 'affiliate=0x505e71695E9bc45943c58adEC1650577BcA68fD9';
  } else if (url.pathname.includes('/crypto/trx')) {
    url.search += (url.search ? '&' : '') + 'affiliate=TAUN6FwrnwwmaEqYcckffC7wYmbaS6cBiX';
  } else if (url.pathname.includes('/crypto/bep20')) {
    url.search += (url.search ? '&' : '') + 'affiliate=0x505e71695E9bc45943c58adEC1650577BcA68fD9';
  } else if (url.pathname.includes('/crypto/erc20')) {
    url.search += (url.search ? '&' : '') + 'affiliate=0x505e71695E9bc45943c58adEC1650577BcA68fD9';
  } else if (url.pathname.includes('/crypto/arbitrum')) {
    url.search += (url.search ? '&' : '') + 'affiliate=0x505e71695E9bc45943c58adEC1650577BcA68fD9';
  } else if (url.pathname.includes('/crypto/polygon')) {
    url.search += (url.search ? '&' : '') + 'affiliate=0x505e71695E9bc45943c58adEC1650577BcA68fD9';
  } else if (url.pathname.includes('/crypto/avax-c')) {
    url.search += (url.search ? '&' : '') + 'affiliate=0x505e71695E9bc45943c58adEC1650577BcA68fD9';
  } else if (url.pathname.includes('/crypto/optimism')) {
    url.search += (url.search ? '&' : '') + 'affiliate=0x505e71695E9bc45943c58adEC1650577BcA68fD9';
  } else if (url.pathname.includes('/crypto/base')) {
    url.search += (url.search ? '&' : '') + 'affiliate=0x505e71695E9bc45943c58adEC1650577BcA68fD9';
  } else if (url.pathname.includes('/crypto/trc20')) {
    url.search += (url.search ? '&' : '') + 'affiliate=TAUN6FwrnwwmaEqYcckffC7wYmbaS6cBiX';
  } else if (url.pathname.includes('/crypto/sol')) {
    url.search += (url.search ? '&' : '') + 'affiliate=CnkEQKAQ7s7ZtnRcoxahMaxv29rkQkTSLhA5cGosHDWp';
  }
  
  // Custom hosted multi-coin domain name
  if (url.pathname.includes('/crypto/hosted.php')) {
  url.search += (url.search ? '&' : '') + 'domain=api.example.com';
  }

  // Set custom fees total should always be 0.99 (The commission set here should work for both credit cards and crypto systems)
  if (!url.pathname.includes('process-payment.php')) {
  url.search += (url.search ? '&' : '') + 'affiliate_fee=0.01';
  url.search += (url.search ? '&' : '') + 'merchant_fee=0.98';
  }

  // Create the modified request
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
