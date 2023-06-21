const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
console.log('_dirname :>> ', _dirname);
defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;
