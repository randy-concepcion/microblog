const config = {
    collectCoverage: true,
    collectCoverageFrom: [
      './src/**',
    '!./src/index.js'
    ],
    passWithNoTests: true,
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    verbose: true
}

module.exports = config
