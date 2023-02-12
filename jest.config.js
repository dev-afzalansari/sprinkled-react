const config = {
    testEnvironment: 'jsdom',
    transform: {
        '\\.css\\.ts$': '@vanilla-extract/jest-transform',
        '\\.tsx?$':'babel-jest',
    },
    testMatch: ["**/__tests__/**/*[-test].[jt]sx"],
    setupFilesAfterEnv: ['./setup.jest.ts']
}

module.exports = config