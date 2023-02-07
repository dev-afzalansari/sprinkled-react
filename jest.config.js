const config = {
    testEnvironment: 'jsdom',
    transform: {
        "\\.css\\.ts$": "@vanilla-extract/jest-transform"
    }
}

module.exports = config