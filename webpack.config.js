module.exports = {
    entry: "./app.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.html$/, loader: "html-loader"},
            { test: /\.js@/, 
                exclude: /(node_modules)/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
            }}
        ]
    },
    target: 'node'
};
