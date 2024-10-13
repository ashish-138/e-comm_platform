module.exports = {
    webpack: function (config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            os: require.resolve('os-browserify/browser'),
        };
        return config;
    },
};