const nextTranslate = require("next-translate-plugin");

// module.exports = nextConfig
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  ...nextTranslate(),

  i18n: {
    locales: ["sr", "si", "en"],
    defaultLocale: "sr",
    localeDetection: false,
  },
};
