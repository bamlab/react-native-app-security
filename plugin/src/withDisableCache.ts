import { ConfigPlugin, withInfoPlist } from "@expo/config-plugins";
import { RNASConfig } from "./types";

type Props = RNASConfig["preventRecentScreenshots"];

const withDisableCache: ConfigPlugin<Props> = (config, props) => {
  config = withInfoPlist(config, (config) => {
    const infoPlist = config.modResults;

    const isEnabled = props?.ios?.enabled ?? false;

    if (!isEnabled) {
      delete infoPlist.RNAS_DISABLE_CACHE;
      return config;
    }

    infoPlist.RNAS_DISABLE_CACHE = true;

    return config;
  });

  return config;
};

export default withDisableCache;
