<h1 align="center">react-native-app-security 🔐</h1>

<p align="center">Easily implement usual security measures in React Native Expo apps</p>

- [SSL public key pinning](#ssl-pinning)
- [Certificate transparency](#certificate-transparency)
- [Prevent "recent screenshots"](#prevent-recent-screenshots)

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
        },
        "preventRecentScreenshots": {
          "ios": { "enabled": true },
          "android": { "enabled": true }
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

> **🥷 What's the threat?** Compromised certificate authorities. [More details](https://certificate.transparency.dev)

- On iOS, [certificate transparency is enabled by default](https://developer.apple.com/documentation/ios-ipados-release-notes/ios-12_1_1-release-notes) since _iOS 12.1.1_
- On Android, this package enables it using [appmatus/certificatetransparency](https://github.com/appmattus/certificatetransparency) for _Android >= 8.0_

### Configuration

None, enabled by default.

## Prevent "recent screenshots"

> **🥷 What's the threat?** When the OS terminates the app, it may take a screenshot and store it on the device to display in the app switcher. This screenshot could leak sensitive data

Mitigating this threat is achieved by:

- Using [`FLAG_SECURE`](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#FLAG_SECURE) on Android < 13
- Using [`Activity.setRecentScreenshotsEnabled`](<https://developer.android.com/reference/android/app/Activity#setRecentsScreenshotEnabled(boolean)>) on Android >= 13
- Covering the app with the splashscreen on iOS (requires [expo-splash-screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/) to be setup)

### Configuration

```jsonc
[
  "@bam.tech/react-native-app-security",
  {
    "preventRecentScreenshots": {
      "ios": { "enabled": true },
      "android": { "enabled": true }
    }
  }
]
```

# Contributing

TODO

# 👉 About BAM

We are a 100 people company developing and designing multi-platform applications with [React Native](https://www.bam.tech/expertise/react-native) using the Lean & Agile methodology. To get more information on the solutions that would suit your needs, feel free to get in touch by [email](mailto:contact@bam.tech) or through our [contact form](https://www.bam.tech/en/contact)!

We will always answer you with pleasure 😁
