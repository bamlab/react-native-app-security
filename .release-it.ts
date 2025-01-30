import type { Config } from "release-it";

const standardConfig = {
  git: {
    commitMessage: "v${version}",
    tagExclude: "[-]*",
  },
  github: {
    release: true,
    autoGenerate: true,
    releaseName: "v${version}",
    comments: {
      submit: true,
    },
  },
} satisfies Config;

const nextConfig = {
  git: {
    commit: false,
    tag: true,
    push: true,
  },
  github: {
    release: false,
    comments: {
      submit: false,
    },
  },
} satisfies Config;

const config =
  process.env.RELEASE_TYPE === "next" ? nextConfig : standardConfig;

export default config satisfies Config;
