const nextTranslate = require("next-translate-plugin");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
};

// module.exports = nextConfig
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  ...nextTranslate(),

  i18n: {
    locales: ["default", "sr", "si", "en"],
    defaultLocale: "default",
    localeDetection: false,
  },
};
