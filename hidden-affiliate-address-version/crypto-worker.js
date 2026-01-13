addEventListener("fetch", event => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  const target = "https://api.paygate.to"; // DO NOT CHANGE

  const url = new URL(request.url);
  url.hostname = new URL(target).hostname;

  // Whitelabel domain
  url.search += (url.search ? "&" : "") + "domain=voodoo-pay.uk";

  // Make request to target API
  const newRequest = new Request(url.toString(), request);
  const response = await fetch(newRequest);

  // Handle 40X errors by redirecting
  if (response.status >= 400 && response.status < 500) {
    return Response.redirect("https://pay.voodoo-pay.uk", 302);
  }

  // Clone response and set headers
  const newResponse = new Response(response.body, response);
  newResponse.headers.set("Access-Control-Allow-Origin", "*");
  newResponse.headers.set("X-Whitelabel", "VoodooPay");

  return newResponse;
}
