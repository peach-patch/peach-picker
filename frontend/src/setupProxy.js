const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://peach-picker.site/api",
      changeOrigin: true,
    })
  );
};
