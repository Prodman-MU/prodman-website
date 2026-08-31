import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      "resources/prodman-living-logo/**",
      ".next/**",
      "launch-video/**",
      "prodman-launch-video/**",
    ],
  },
];

export default eslintConfig;
