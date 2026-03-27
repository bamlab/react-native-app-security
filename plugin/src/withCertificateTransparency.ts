import { ConfigPlugin, withGradleProperties } from "@expo/config-plugins";
import { RNASConfig } from "./types";

type Props = RNASConfig["certificateTransparency"];

const withCertificateTransparency: ConfigPlugin<Props> = (config, props) => {
  config = withGradleProperties(config, (config) => {
    const gradleProperties = config.modResults;

    const failOnError = props?.android?.failOnError ?? true;

    const existingIndex = gradleProperties.findIndex(
      (prop) =>
        prop.type === "property" && prop.key === "RNAS_CT_FAIL_ON_ERROR"
    );
    if (existingIndex !== -1) {
      gradleProperties.splice(existingIndex, 1);
    }

    gradleProperties.push({
      type: "property",
      key: "RNAS_CT_FAIL_ON_ERROR",
      value: String(failOnError),
    });

    return config;
  });

  return config;
};

export default withCertificateTransparency;
