const PROXY_CONFIG = [
    {
        context: [
            '/api',
        ],
        target: 'http://localhost:8181',
    },
];

module.exports = PROXY_CONFIG;
