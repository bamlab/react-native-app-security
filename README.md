<h1 align="center">react-native-app-security 🔐</h1>

<p align="center">Easily implement usual security measures in React Native Expo apps</p>

- [SSL public key pinning](#ssl-pinning)
- [Certificate transparency](#certificate-transparency)
- [Prevent "recent screenshots"](#prevent-recent-screenshots)
- [Safe Keyboard Detector](#safe-keyboard-detector)

> **⚠️ Disclaimer**<br/>
> This package is intended to help implement a few basic security features but does not in itself guarantee that an app is secure.<br/>
> Refer to [OWASP's resources](https://mas.owasp.org) for more information on mobile app security.<br/>
> You can also [contact us](https://www.bam.tech/en/contact) if you need help with securing your app.

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

This package implements [public key pinning](https://cheatsheetseries.owasp.org/cheatsheets/Pinning_Cheat_Sheet.html#public-key) using [Apple's integrated SSL pinning mechanism](https://developer.apple.com/news/?id=g9ejcf8y) on iOS and the certificate pinner included in OkHttp on Android.

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

Please note that you'll need to provide _2_ public key hashes. This is to encourage having proper procedures in place to avoid locking users out, [as described here in the TrustKit docs](https://github.com/datatheorem/TrustKit/blob/master/docs/getting-started.md#always-provide-at-least-one-backup-pin).

#### Pinning subdomains

To pin a specific subdomain, simply include it in the string you provide, eg:

```jsonc
    "sslPinning": {
      "subdomain.domain.com": [/* ... */]
    }
```

To pin a domain and all its subdomains, use a wildcard:

```jsonc
    "sslPinning": {
      // domain.com and all its subdomains will be pinned
      "*.domain.com": [/* ... */]
    }
```

> The wildcard can only be used for the full lefmost part of the hostname.
>
> These are invalid: `*domain.com`, `domain.*.com`, `sub.*.domain.com`

### Generating the public key hashes

You'll need the certificates (`.cer` or `.crt`)

```sh
openssl x509 -in certificate.cer -pubkey -noout | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64
```

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

## Safe Keyboard Detector

> **🥷 What's the threat?** A third-party keyboard might embed a malicious keylogger to record passwords and sensitive data. [More details](https://www.synopsys.com/blogs/software-security/mitigate-third-party-mobile-keyboard-risk.html)

Mitigating this threat is achieved by:

- On Android, comparing the current keyboard id with a list of [keyboard packages that we deem safe](./android/src/main/java/tech/bam/rnas/RNASModule.kt#31).
- On iOS, doing nothing specific since iOS already prevent the use of third-party keyboard on sensitive fields such as passwords.

```tsx
import { SafeKeyboardDetector } from "@bam.tech/react-native-app-security";

const { isInDefaultSafeList, inputMethodId } = getCurrentInputMethodInfo(); // Will always return {isInDefaultSafeList: true, inputMethodId: "iosKeyboard"} on iOS
if (!isInDefaultSafeList) {
  console.warn(`Your current keyboard (${inputMethodId}) is not safe`);
}

// Prompt the user to change the current keyboard
SafeKeyboardDetector.showInputMethodPicker(); // can only be called on Android
```

# Contributing

Contributions are welcome. See the [Expo modules docs](https://docs.expo.dev/modules/get-started/) for information on how to build/run/develop on the project.

When making a change to the `plugin` folder, you'll need to run `yarn prepare` before prebuilding and building the example app.

# 👉 About BAM

We are a 100 people company developing and designing multi-platform applications with [React Native](https://www.bam.tech/expertise/react-native) using the Lean & Agile methodology. To get more information on the solutions that would suit your needs, feel free to get in touch by [email](mailto:contact@bam.tech) or through our [contact form](https://www.bam.tech/en/contact)!

We will always answer you with pleasure 😁
