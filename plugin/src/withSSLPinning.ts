import {
  ConfigPlugin,
  withInfoPlist,
  withGradleProperties,
} from "@expo/config-plugins";

type Props = { [hostName: string]: string[] } | undefined;

const withSSLPinning: ConfigPlugin<Props> = (config, props) => {
  config = withInfoPlist(config, (config) => {
    const infoPlist = config.modResults;

    if (!props) {
      delete infoPlist.TSKConfiguration;
      return config;
    }

    const domainsConfig = Object.fromEntries(
      Object.entries(props).map(([hostName, certificates]) => {
        return [
          hostName,
          {
            TSKEnforcePinning: true,
            TSKIncludeSubdomains: true,
            TSKPublicKeyHashes: certificates,
          },
        ];
      })
    );

    infoPlist.TSKConfiguration = {
      TSKSwizzleNetworkDelegates: true, // auto-setup on startup
      TSKPinnedDomains: domainsConfig,
    };

    // TODO: warn when overriding?

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

    gradleProperties.push({
      type: "property",
      key: "RNAS_PINNING_CONFIG",
      value: JSON.stringify(props).replaceAll('"', '\\\\"'),
    });

    return config;
  });

  return config;
};

export default withSSLPinning;
