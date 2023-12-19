import { ConfigPlugin } from "@expo/config-plugins";
import { RNASConfig } from "./types";
import withpreventRecentScreenshots from "./withPreventRecentScreenshots";
import withSSLPinning from "./withSSLPinning";

const withRNAS: ConfigPlugin<RNASConfig> = (config, props) => {
  config = withSSLPinning(config, props.sslPinning);

  config = withpreventRecentScreenshots(config, props.preventRecentScreenshots);

  return config;
};

export default withRNAS;

export type { RNASConfig };
