import { ConfigPlugin } from "@expo/config-plugins";
import withSSLPinning from "./withSSLPinning";

type Props = {
  sslPinning?: {
    [hostName: string]: string[];
  };
};

const withRNAS: ConfigPlugin<Props> = (config, props) => {
  config = withSSLPinning(config, props.sslPinning);

  return config;
};

export default withRNAS;
