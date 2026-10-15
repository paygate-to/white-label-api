# whitelabel-api
White-label (rebrand API) https://api.paygate.to with your own custom domain using Cloudflare workers.

* Create a new Cloudflare worker (Compute → Workers & Pages → Create application → Start with Hello World!)
* Edit the code and replace with the desired worker.js (You can use the hidden affiliate wallet version to hide your wallet affiliate parameter from your sub merchants by inserting it directly in the Cloudflare JS code).
* Replace the example wallet (0x505e71695E9bc45943c58adEC1650577BcA68fD9) with your own affiliate wallet.
* Replace checkout.example.com with your own custom domain to be displayed in the hosted Multi-provider Mode.
* Leave all instances of api.paygate.to intact, don't replace it with your own domain name.
* Connect your custom domain to the newly created Cloudflare worker (worker → Domains tab → Add Domain). Cloudflare creates the DNS record for you, so no DNS records or routes are needed.

# Guides
* For more information visit: https://paygate.to/affiliate-white-label/
* Technical Custom Domain Guide: https://paygate.to/white-label-api-custom-domain-guide/

---

# White-label API Custom Domain Guide

Original Guide: https://paygate.to/white-label-api-custom-domain-guide/

---

# Overview

In this tutorial you will learn how to use your own custom domain with the payment gateway API.

You will be able to use your own domain instead of:

- `api.paygate.to`
- `checkout.paygate.to`

You will also be able to optionally insert your affiliate wallet to earn your desired percentage on every sale your sub-merchant receives.

---

# Requirements

You need to complete 4 steps:

1. Your domain name must be using Cloudflare DNS service (free account plan will work fine).
2. Create a free Cloudflare Worker with the provided JS code to use the API.
3. Connect your domain to the Cloudflare Worker with one click (**Add Domain**). No DNS records or routes needed.
4. Optionally insert your affiliate wallet within the code and redistribute plugins to earn percentage on your sub-merchant sales.

Affiliate program:
https://paygate.to/affiliate-white-label/

---

# Use Cloudflare DNS

## 1. Create a Free Cloudflare Account

Create an account at:

https://cloudflare.com/

---

## 2. Add Your Domain to Cloudflare

Add your domain name to use the free Cloudflare DNS service (**Domains → Add domain → Connect a domain**).

![Cloudflare Connect your domain](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/white-label-api-custom-domain-guide/cf-0-connect-domain.jpg)

After adding your domain you will be instructed to change your domain nameservers (NS records).

---

## 3. Change Your Domain Nameservers

Go to your domain registrar where you registered your domain and use the custom nameservers provided in your Cloudflare account.

Those nameservers are different for each account.

Example screenshot:

![Cloudflare Nameservers](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/wp-content/uploads/2024/05/nameserver-names_hu161a7bd4048023790dd77ef9ed3eebf2_68958_826x639_resize_q75_box_3-77a0650d1.png)

---

## 4. Verify Cloudflare Is Active

After completing the previous steps your domain should be actively using Cloudflare.

You don't need to add any DNS records for the API: Cloudflare creates them when you connect the domain to your worker (see below).

---

# Create a Cloudflare Worker

## 1. Open Workers & Pages

In the Cloudflare dashboard sidebar open **Compute → Workers & Pages**.

![Cloudflare Compute, Workers & Pages](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/white-label-api-custom-domain-guide/cf-1-compute-workers.jpg)

---

## 2. Create an Application

Press the **Create application** button.

![Cloudflare Create application](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/white-label-api-custom-domain-guide/cf-2-create-application.jpg)

---

## 3. Start with Hello World!

Choose **Start with Hello World!** This creates an empty worker you will replace with the provided code.

![Cloudflare Start with Hello World](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/white-label-api-custom-domain-guide/cf-3-hello-world.jpg)

Name the worker (for example `paygate-api`) and press **Deploy**.

![Name and deploy the Cloudflare worker](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/white-label-api-custom-domain-guide/cf-4-name-deploy.jpg)

---

## 4. Edit the Worker Code

On the new worker's page press **Edit code**.

![Edit Worker Code](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/white-label-api-custom-domain-guide/cf-5-edit-code.jpg)

---

## 5. Insert the Worker Code

Select all the Hello World code in the editor, delete it and paste the provided `worker.js` code instead.

Two versions are available:

### Standard Worker

The standard worker allows you to use your own custom domain without affiliate wallet injection.

GitHub:
https://github.com/paygate-to/white-label-api/blob/main/worker.js

This version simply allows you to use your custom domain with the API.

---

### Affiliate Worker

The affiliate version allows you to use your hidden affiliate USDC (Polygon) wallet to earn `0.5%` on every sale that goes through your custom domain.

GitHub:
https://github.com/paygate-to/white-label-api/blob/main/hidden-affiliate-address-version/worker.js

Make sure to replace the wallet in the example code with your own USDC wallet to receive earnings.

---

## Important Warning

⚠️ Do NOT change the API domain name in the code.

You only need to:

- Change the wallet address
- Set a custom error page (optional)

Example image:
![API custom domain code](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/white-label-api-custom-domain-guide/what-to-change.png)


---

## Dedicated API Endpoint

> [!NOTE]
> PayGate.to is a high-demand service. Every merchant can get a free DDoS-protected endpoint of their
> own that keeps working when the shared `api.paygate.to` is under attack.

- `targetUrl` is **not** your own domain. Your own domain is connected in the worker's **Domains** tab and passed with the `domain=` parameter only.
- Get your dedicated endpoint at https://paygate.to/white-label-api-custom-domain-guide/#dedicated-endpoint, or let the generator there build your worker with it.
- In your worker, replace only the `api.paygate.to` host in `targetUrl` with your dedicated endpoint, e.g. `api-yourshop-1a2b3c4d5e6f7a8b9c0d1e2f.paygate.to`. Paths, parameters, wallets and fees stay exactly the same. The "don't change" comment above that line means never put your own domain there; your dedicated endpoint is the one allowed change.
- Without a dedicated endpoint, the worker keeps using the shared `api.paygate.to`.
- If your endpoint is ever blocked, contact support (https://t.me/PayGate_to).

---

## 6. Deploy the Worker

Press **Deploy** in the editor to publish the code.

![Paste the code and deploy the Cloudflare worker](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/white-label-api-custom-domain-guide/cf-6-paste-deploy.jpg)

The free Cloudflare plan allows:

- `100,000 requests per day`

with your own custom domain free of charge.

---

# Connect Your Custom Domain to the Worker

## 1. Open the Domains Tab

Open the worker's **Domains** tab and press **Add Domain**.

![Cloudflare worker Domains tab, Add Domain](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/white-label-api-custom-domain-guide/cf-7-domains-tab.jpg)

---

## 2. Add Your API Address

Choose your domain and enter the subdomain you want to use instead of `api.paygate.to`, for example `api.example.com`.

Cloudflare creates the DNS record and the SSL certificate automatically, so there are no DNS records or routes to set up. If that subdomain already has a DNS record, delete it first.

---

## 3. Add Your Payment Page Address

Press **Add Domain** again for your payment page address, for example `payment.example.com` instead of `checkout.paygate.to`. Your customers see this address on the hosted card and multi-coin crypto payment pages.

---

## 4. Final Result

After a minute or two your domain works exactly the same way as:

```txt
api.paygate.to
```

---

## 5. Test the API

Use the API documentation for testing:

https://paygate.to/instant-payment-gateway/#postman

---

## 6. Worker Behavior

Using the standard `worker.js`:

- Your domain will work exactly the same as the original API

Using the affiliate `worker.js`:

- The `affiliate` wallet parameter will automatically be added to each request

---

# Earning Affiliate Commission and White-label Plugins & Modules

- All plugins and modules are open-source and available to be modified or re-branded.
- Visit the GitHub repository to access all code:
  
https://github.com/paygate-to

---

## Rebranding Plugins

You can easily re-brand all plugins or modules.

Replace all instances of:

```txt
api.paygate.to
checkout.paygate.to
```

with your own custom domain configured in the previous steps.

---

## Hidden Affiliate Injection

When using the affiliate `worker.js`:

- The affiliate wallet parameter will automatically be added to every request
- No need to insert the wallet inside plugin code
- This helps prevent sub-merchants from removing your wallet or bypassing your commission

---

## Support

Feel free to contact support for any questions.

---

# Which worker.js File to Select

There are different ready-made `worker.js` files available depending on your use case.

---

## 1. Default worker.js

Allows you to use your custom domain for:

- Credit card systems
- Crypto systems

Without affiliate earning.

GitHub:
https://github.com/paygate-to/white-label-api/blob/main/worker.js

---

## 2. Default Affiliate worker.js

Allows you to use your custom domain for:

- Credit card systems

With:

- `0.5%` affiliate earnings

to the wallet inserted in the worker code.

GitHub:
https://github.com/paygate-to/white-label-api/blob/main/hidden-affiliate-address-version/worker.js

---

## 3. Custom Affiliate Commission worker.js

Allows you to use your custom domain for:

- Credit card systems

With:

- Custom affiliate earning percentage

to the wallet inserted in the worker code.

GitHub:
https://github.com/paygate-to/white-label-api/blob/main/hidden-affiliate-address-version/Custom-Affiliate-Commission/custom-affiliate.js

Affiliate API documentation:
https://documenter.getpostman.com/view/14826208/2sA3Bj9aBi#5bcee463-af55-4e7f-914e-bfdcb71f4098

---

## 4. Crypto Affiliate worker.js

Allows you to use your custom domain for:

- Credit card systems
- Crypto systems

With:

- Custom affiliate earning percentage

to the wallets inserted in the worker code.

GitHub:
https://github.com/paygate-to/white-label-api/blob/main/hidden-affiliate-address-version/crypto-worker.js

Affiliate API documentation:
https://documenter.getpostman.com/view/14826208/2sAXjF8ujk#1120f17a-0153-4256-ab3a-b96be79f09bb

---

## 5. Increased Affiliate Commission worker.js

Optional easy-to-use credit card affiliate workers with increased percentage presets.

GitHub:
https://github.com/paygate-to/white-label-api/tree/main/hidden-affiliate-address-version/Increased-Affiliate-Commission

---

## 6. Advanced Full White-label worker.js

Allows you to use your custom domain for:

- Credit card systems
- Crypto systems

With:

- Custom affiliate earning percentage
- Full white-label support
- Sub-affiliate systems

GitHub:
https://github.com/paygate-to/white-label-api/blob/main/hidden-affiliate-address-version/Advanced-Full-White-label-with-sub-affiliate/worker.js

Sub-affiliate worker example:
https://github.com/paygate-to/white-label-api/blob/main/hidden-affiliate-address-version/Advanced-Full-White-label-with-sub-affiliate/Example-For-your-sub-affiliate/sub-affiliate-worker.js

Sub-affiliate API documentation:
https://documenter.getpostman.com/view/14826208/2sA3Bj9aBi#e74d712c-5a25-4a23-9197-851e45074dd9