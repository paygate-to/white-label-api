addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Define the target URL to cloak
  const targetUrl = 'https://api.highriskshop.com';
  
  // Modify the request URL to replace the worker's domain with the target domain
  const url = new URL(request.url);
  url.hostname = new URL(targetUrl).hostname;
  const modifiedRequest = new Request(url.toString(), request);
  
  // Make a request to the target URL
  const response = await fetch(modifiedRequest);

  // Check if the response status code is in the 40X range and redirect to custom page if it is
  if (response.status >= 400 && response.status < 500) {
    return Response.redirect('https://www.example.com', 302);
  }

  // Clone the response to modify headers
  const modifiedResponse = new Response(response.body, response);

  // Set headers to cloak the origin
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
  
  return modifiedResponse;
}
