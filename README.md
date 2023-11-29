<h1 align="center">react-native-app-security 🔐</h1>

<p align="center">Easily implement usual security measures in React Native Expo apps</p>

- [SSL public key pinning](#ssl-pinning)
- [🚧 Certificate transparency](#certificate-transparency)
- [🚧 "Recent screenshots" prevention](#recent-screenshots-prevention)

> **⚠️ Disclaimer**<br/>
> This package is intended to help implement a few basic security features but does not in itself guarantee that an app is secure.<br/>
> Refer to [OWASP's resources](https://mas.owasp.org) for more information on mobile app security.<br/>
> You can also [contact us](#👉-about-bam) if you need help with securing your app.

# Installation and setup

This package is designed for use in expo apps with [development builds](https://docs.expo.dev/develop/development-builds/introduction/).

```sh
yarn add @bam.tech/react-native-app-security
```

Add the config plugin to `app.config.ts` / `app.config.js` / `app.json`:

```json
{
  "plugins": [
    [
      "@bam.tech/react-native-app-security",
      {
        "sslPinning": {
          "yahoo.com": [
            "TQEtdMbmwFgYUifM4LDF+xgEtd0z69mPGmkp014d6ZY=",
            "rFjc3wG7lTZe43zeYTvPq8k4xdDEutCmIhI5dn4oCeE="
          ]
        }
      }
    ]
  ]
}
```

Anytime you change the config, don't forget to run:

```sh
yarn expo prebuild
```

# Features

## SSL Pinning

> **🥷 What's the threat?** Attackers intercepting your app's network requests and accessing private data or sending malicious responses. [More details](https://mas.owasp.org/MASTG/General/0x04f-Testing-Network-Communication/#restricting-trust-identity-pinning)

This package implements [public key pinning](https://cheatsheetseries.owasp.org/cheatsheets/Pinning_Cheat_Sheet.html#public-key) using [TrustKit](https://github.com/datatheorem/TrustKit) on iOS and the certificate pinner included in OkHttp on Android.

### Configuration

```jsonc
[
  "@bam.tech/react-native-app-security",
  {
    "sslPinning": {
      // The hostname you want to pin, without `https://`
      "yahoo.com": [
        // The public key hashes for the pinned certificates, without a `sha256/` prefix
        "TQEtdMbmwFgYUifM4LDF+xgEtd0z69mPGmkp014d6ZY=",
        "rFjc3wG7lTZe43zeYTvPq8k4xdDEutCmIhI5dn4oCeE="
      ]
    }
  }
]
```

### Generating the public key hashes

TODO

### Testing

To test that SSL pinning is working as expected, you can:

- break (change) a certificate and check that the connection fails _(don't forget to `yarn expo prebuild` then `yarn ios` or `yarn android` to rebuild the app)_
- set up a proxy (we love [Proxyman](https://proxyman.io)) and check that the connection fails

## Certificate transparency

TODO

## "Recent screenshots" prevention

TODO

# Contributing

TODO

# 👉 About BAM

We are a 100 people company developing and designing multi-platform applications with [React Native](https://www.bam.tech/expertise/react-native) using the Lean & Agile methodology. To get more information on the solutions that would suit your needs, feel free to get in touch by [email](mailto:contact@bam.tech) or through our [contact form](https://www.bam.tech/en/contact)!

We will always answer you with pleasure 😁
