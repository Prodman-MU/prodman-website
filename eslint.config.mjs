import nextConfig from "eslint-config-next";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: ["resources/prodman-living-logo/**", ".next/**"],
  },
];

export default eslintConfig;
