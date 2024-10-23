const PROXY_CONFIG = [
    {
        context: [
            '/api',
        ],
        changeOrigin: true,
        cookieDomainRewrite: 'localhost:4200',
        target: 'https://demo.angulararchitects.io',
    },
];

module.exports = PROXY_CONFIG;
