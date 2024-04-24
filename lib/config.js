export const EXEC_ENV = process.env.EXEC_ENV
export const AWS_ACCOUNT_ID = process.env.AWS_ACCOUNT_ID 
export const BRANCH_NAME = process.env.BRANCH_NAME 
export const ENV_ENUM = {
    prod: "prod",
    dev: "dev",
    sandbox: "sandbox",
}

export const STABLE_ENVS = [ENV_ENUM.prod, ENV_ENUM.dev]