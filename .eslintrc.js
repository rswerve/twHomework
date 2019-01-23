module.exports = {
    "extends": "airbnb-base",
    rules: {
        "no-console": ["error", { allow: ["error", "warn", "info"] }],
        "no-use-before-define": ["error", { "functions": false, "classes": true }]
    }
};