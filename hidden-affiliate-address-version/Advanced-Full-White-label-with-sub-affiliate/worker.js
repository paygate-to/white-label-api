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
  
  // Optional set commission for the sub-affiliate credit card system. Here you set the commission for sub-affiliate who will market your credit card white-label
  // Your sub-affiliate can have workers pointing to your own white-labeled API custom domain
  // Example https://api.yourdomain.com/set-affiliate.php?address=0xF977814e90dA44bFA03b6295A0616a897441aceC&callback=https%3A%2F%2Fwww.example.com%2Forder%3Fnumber%3D82173314628191&merchant_fee=0.97&sub_affiliate_fee=0.01&sub_affiliate=0x082489A616aB4D46d1947eE3F912e080815b08DA
  
  if (url.pathname.includes('/set-affiliate.php')) {
  url.pathname = url.pathname.replace('/set-affiliate.php', '/control/custom-sub-affiliate.php');  
  url.search += (url.search ? '&' : '') + 'affiliate_fee=0.01'; //Total custom fees should always be 0.99 so if you set yours 1% (0.01) per the example then you instruct your sub-affiliate for 0.98 total in your API docs.
  url.search += (url.search ? '&' : '') + 'affiliate=0x505e71695E9bc45943c58adEC1650577BcA68fD9'; // The affiliate wallet where you will receive earnings and your sub-affiliate can't change.
  } else {
  // Set custom fees total should always be 0.99 (The commission set here should work for both credit cards and crypto systems for your direct merchants)
  url.search += (url.search ? '&' : '') + 'affiliate_fee=0.01';
  url.search += (url.search ? '&' : '') + 'merchant_fee=0.98';
  }	  

  // Create the modified request
  const modifiedRequest = new Request(url.toString(), request);
  
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
