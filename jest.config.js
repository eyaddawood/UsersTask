module.exports = {
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([jt]sx?)$',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node', 'mjs'],
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
  };
  