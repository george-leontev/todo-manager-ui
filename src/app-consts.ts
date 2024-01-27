const webApiRoot = process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000'
    : 'https://fast-api-test-8znp.onrender.com'

export const AppConsts = {
    webApiRoutes: {
        todos: `${webApiRoot}/todos`,
        signIn: `${webApiRoot}/sign-in`,
        registration: `${webApiRoot}/registration`
    }
}