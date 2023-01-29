const common = require('./rollup.js');
module.exports = {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'umd',
        name: "MyBundle",
        banner: common.banner,
    }
};