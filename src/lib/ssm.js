import { ssm } from '#lib/aws';

export const getParameter = async (params) => {
    return await ssm.getParameter(params)
  }