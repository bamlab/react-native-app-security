import { ConfigPlugin } from "@expo/config-plugins";
import withSSLPinning from "./withSSLPinning";
import withpreventRecentScreenshots from "./withPreventRecentScreenshots";
import { RNASConfig } from "./types";

const withRNAS: ConfigPlugin<RNASConfig> = (config, props) => {
  config = withSSLPinning(config, props.sslPinning);

  config = withpreventRecentScreenshots(config, props.preventRecentScreenshots);

  return config;
};

export default withRNAS;

export type { RNASConfig };
