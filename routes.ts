/**
 * An Array of public routes.
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/landingpage","/"
]

/**
 * An Array of auth routes.
 * @type {string[]}
 */
export const authRoutes: string[] = [
    "/auth/signin",
    "/auth/signup",
    "/auth/login",
    "/auth/register"
]

/**
 * Never Block this path
 * @type {string}
 */
export const apiAuthPrefix : string = "/api/auth"

/**
 * After authentication, redirect user here
 * @type {string}
 */
export const DEFAULT_AUTH_REDIRECT : string = "/home"