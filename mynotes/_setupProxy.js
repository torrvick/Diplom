const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api/notes',
		createProxyMiddleware({
			target: 'http://localhost:3003',
			changeOrigin: true,
		})
	);
};
