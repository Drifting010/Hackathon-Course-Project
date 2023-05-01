module.exports = {
    // ...
    testPathIgnorePatterns: ['/node_modules/', '/frontendTest/'],
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
      '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    moduleFileExtensions: ['js', 'jsx', 'json'],
    testEnvironment: 'node',
  };
  