module.exports = {
    // ...
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
      '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    moduleFileExtensions: ['js', 'jsx', 'json'],
    testEnvironment: 'node',
  };
  