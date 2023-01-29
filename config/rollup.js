const pkg = require('../package.json');
const {name,version,license,description} = pkg

const banner =
`/**
 * ${name} - ${description}
 * @version ${version}
 * @license ${license}
 */
`;

exports.banner = banner;