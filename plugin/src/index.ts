import { ConfigPlugin } from "@expo/config-plugins";
import { RNASConfig } from "./types";
import withCertificateTransparency from "./withCertificateTransparency";
import withDisableCache from "./withDisableCache";
import withpreventRecentScreenshots from "./withPreventRecentScreenshots";
import withSSLPinning from "./withSSLPinning";

const withRNAS: ConfigPlugin<RNASConfig> = (config, props) => {
  config = withSSLPinning(config, props.sslPinning);

  config = withpreventRecentScreenshots(config, props.preventRecentScreenshots);
  config = withDisableCache(config, props.disableCache);
  config = withCertificateTransparency(config, props.certificateTransparency);

  return config;
};

export default withRNAS;

export type { RNASConfig };
