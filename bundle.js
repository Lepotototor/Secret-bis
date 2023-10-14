module.exports = {
    entry: './script.js', // Votre fichier JavaScript principal
    output: {
        filename: 'bundle.js', // Le fichier de sortie
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};

