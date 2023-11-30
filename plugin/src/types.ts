export type RNASConfig = {
  sslPinning?: {
    [hostName: string]: string[];
  };
  preventRecentScreenshots?: {
    ios?: { enabled: boolean };
    android?: { enabled: boolean };
  };
};
