# whitelabel-api
White-label (rebrand API) https://api.paygate.to with your own custom domain using Cloudflare workers.

* Create a new Cloudflare worker
* Edit the code and replace with the desired worker.js (You can use the hidden affiliate wallet version to hide your wallet affiliate parameter from your sub merchants by inserting it directly in the Cloudflare JS code).
* Replace the example wallet (0x505e71695E9bc45943c58adEC1650577BcA68fD9) with your own affiliate wallet.
* Replace checkout.example.com with your own custom domain to be displayed in the hosted Multi-provider Mode.
* Leave all instances of api.paygate.to intact, don't replace it with your own domain name.
* Route your custom domain to the newly created Cloudflare worker from your Cloudflare dashboard.

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
3. Route your domain to use the Cloudflare Worker.
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

Add your domain name to use the free Cloudflare DNS service.

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

---

## 5. Create Proxied DNS Records

Make a proxy (Orange Cloud) DNS `A` record for every subdomain you want to use with the API.

You can add `8.8.8.8` or any other IP address as this record will be proxied to the API anyway.

In the following example we will use:

- `api.iptvpay.com`
- `payment.iptvpay.com`

instead of:

- `api.paygate.to`
- `checkout.paygate.to`

Example screenshot:

![Cloudflare DNS Records](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/wp-content/uploads/2024/05/image_2024-05-23_13-45-50.png)

---

## 6. Add Additional Proxied Records

You may need to add a proxied record for every domain/subdomain you want to use as a custom domain for the API.

The IP address does not matter because it is only needed as a route for the worker in the next steps.

Example screenshot:

![Cloudflare A Record](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/wp-content/uploads/2024/05/image_2024-05-23_13-56-51.png)

---

# Create a Cloudflare Worker

## 1. Open the Cloudflare Dashboard

Go back to your main account page in the Cloudflare dashboard.

Example screenshot:

![Cloudflare Dashboard](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/wp-content/uploads/2024/05/image_2024-05-23_13-57-42.png)

---

## 2. Open the Workers Tab

Visit the Cloudflare Workers tab.

Example:
![Cloudflare workers](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/white-label-api-custom-domain-guide/cloudflare-workers.png)

---

## 3. Create a New Worker

Create a new worker after pressing the **Create Application** button.

---

## 4. Edit the Worker Code

After creating the worker, open its settings and edit the code.

Example screenshot:

![Edit Worker Code](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/wp-content/uploads/2024/05/image_2024-05-23_14-00-13.png)

---

## 5. Insert the Worker Code

You will need to insert the provided `worker.js` code into your worker.

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

## 6. Deploy the Worker

Deploy the code to your Cloudflare Worker.

The free Cloudflare plan allows:

- `100,000 requests per day`

with your own custom domain free of charge.

---

# Route Your Custom Domain to the Created Worker

## 1. Configure Worker Routes

From the newly created worker settings you can:

- Set a global custom domain
- Set custom routes with multiple domains

---

## 2. Add Routes

Add a route for each subdomain you want to use with the wildcard `*`.

Example screenshot:

![Custom Domain API](https://raw.githubusercontent.com/paygate-to/site-mirror/refs/heads/main/wp-content/uploads/2024/05/Screenshot-2024-05-23-221633.png)

---

## 3. Example Routes

Example routes:

```txt
api.iptvpay.com/*
payment.iptvpay.com/*
```

The `*` wildcard means the domain will work globally for any API path.

---

## 4. Final Result

After completing all previous steps your domain should work exactly the same way as:

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
- Virtual credit cards (VCC)
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