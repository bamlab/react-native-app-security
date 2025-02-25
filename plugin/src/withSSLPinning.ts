import {
  ConfigPlugin,
  withInfoPlist,
  withGradleProperties,
} from "@expo/config-plugins";
import { RNASConfig } from "./types";

type Props = RNASConfig["sslPinning"];

type NSPinnedDomain = {
  NSIncludesSubdomains: boolean;
  NSPinnedLeafIdentities: {
    "SPKI-SHA256-BASE64": string;
  }[];
};

const withSSLPinning: ConfigPlugin<Props> = (config, props) => {
  config = withInfoPlist(config, (config) => {
    const infoPlist = config.modResults;

    // Clean up old TrustKit configuration if it exists
    delete infoPlist.TSKConfiguration;

    infoPlist.NSAppTransportSecurity ??= {};

    const pinnedDomainsConfig = Object.fromEntries(
      Object.entries(props ?? {}).map(([hostName, certificates]) => {
        const hasSubdomainsWildcard = hostName.startsWith("*.");
        const hostnameWithoutWildcard = hasSubdomainsWildcard
          ? hostName.slice(2)
          : hostName;

        // Create the pinned leaf identities array from the certificates
        const pinnedLeafIdentities = certificates.map((certificate) => ({
          "SPKI-SHA256-BASE64": certificate,
        }));

        const config: NSPinnedDomain = {
          NSIncludesSubdomains: hasSubdomainsWildcard,
          NSPinnedLeafIdentities: pinnedLeafIdentities,
        };

        return [hostnameWithoutWildcard, config];
      })
    );

    (
      infoPlist.NSAppTransportSecurity as Record<string, unknown>
    ).NSPinnedDomains = pinnedDomainsConfig;

    return config;
  });

  config = withGradleProperties(config, (config) => {
    const gradleProperties = config.modResults;

    const existingIndex = gradleProperties.findIndex(
      (prop) => prop.type === "property" && prop.key === "RNAS_PINNING_CONFIG"
    );
    if (existingIndex !== -1) {
      gradleProperties.splice(existingIndex, 1);
    }

    if (!props) {
      return config;
    }

    const domainsConfig: Record<string, string[]> = {};

    for (const [hostName, certificates] of Object.entries(props)) {
      const hasSubdomainsWildcard = hostName.startsWith("*.");

      domainsConfig[hostName] = certificates;

      // When passed "*.domain.com", OkHttp will pin all subdomains, but not the root domain
      // To align behaviour between platforms, add pinning of the root domain as well
      if (hasSubdomainsWildcard) {
        domainsConfig[hostName.slice(2)] = certificates;
      }
    }

    gradleProperties.push({
      type: "property",
      key: "RNAS_PINNING_CONFIG",
      value: JSON.stringify(domainsConfig).replaceAll('"', '\\\\"'),
    });

    return config;
  });

  return config;
};

export default withSSLPinning;
