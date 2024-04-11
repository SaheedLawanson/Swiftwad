const EXECUTION_ENVIRONMENTS = {
    SANDBOX: "SANDBOX",
    DEVELOPMENT: "DEVELOPMENT",
    STAGING: "STAGING",
    PRODUCTION: "PRODUCTION",
}


const getExecutionEnv = () => {
    return process.env.EXEC_ENV
}