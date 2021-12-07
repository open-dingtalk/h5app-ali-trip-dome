const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
      '/biz',
      createProxyMiddleware({
        target: 'https://61c4-47-52-218-55.ngrok.io/biz',
        changeOrigin: true
      })
    )
};