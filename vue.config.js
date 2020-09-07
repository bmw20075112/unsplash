// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  // configureWebpack: {
  //   plugins: [
  //     new BundleAnalyzerPlugin()
  //   ]
  // },

  css: {
    loaderOptions: {
      sass: {
        prependData: `
                    @import "@/styles/variables.scss";
                `
      }
    }
  }
};
