const config = {
    collectCoverage: true,
    collectCoverageFrom: ['./src/**'],
    passWithNoTests: true,
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    verbose: true
}

module.exports = config
