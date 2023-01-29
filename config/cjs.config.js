const common = require('./rollup.js');
export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        banner: common.banner,
    }
};