module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                corejs: 3,
            },
        ],
    ],
    plugins: [
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true
            }
        ]
    ]
};
