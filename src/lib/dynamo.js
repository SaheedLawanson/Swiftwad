import { docClient } from '#lib/aws';

export const generateKeyExpression = (key, keyName, subkey, subkeyName) => {
  const params = {};

  if (key) {
    params.ExpressionAttributeValues = {
      ":k": key,
    };
    params.KeyConditionExpression = `${keyName}=:k`;
    if (subkey) {
      params.ExpressionAttributeValues[":sk"] = subkey;
      params.KeyConditionExpression =
        params.KeyConditionExpression + ` AND ${subkeyName}=:sk`;
    }
  }
  return params;
};

export const generateFilterExpressions = (
  filter,
  { ExpressionAttributeNames, ExpressionAttributeValues, FilterExpression }
) => {
  const params = {};

  if (filter && Object.keys(filter).length > 0) {
    params.ExpressionAttributeNames = ExpressionAttributeNames || {};
    params.ExpressionAttributeValues = ExpressionAttributeValues || {};
    params.FilterExpression = FilterExpression || "";

    Object.keys(filter).map((f, id) => {
      const key = `:f${id}`;
      const filterKey = `#f${id}`;
      params.ExpressionAttributeNames[filterKey] = f;
      params.ExpressionAttributeValues[key] = filter[f];
      params.FilterExpression = `${params.FilterExpression || ""}${
        params.FilterExpression ? " AND " : ""
      }${filterKey}=${key}`;
    });
  }
  return params;
};

export const generateUpdateExpression = function ({ params }) {
  return {
    UpdateExpression: `set ${Object.keys(params)
      .map((k) => `#${k} = :${k}`)
      .join(", ")}`,
    ExpressionAttributeNames: Object.keys(params).reduce(
      (attrNames, attrKey) => ({ ...attrNames, [`#${attrKey}`]: attrKey }),
      {}
    ),
    ExpressionAttributeValues: Object.entries(params).reduce(
      (attrValues, attr) => ({ ...attrValues, [`:${attr[0]}`]: attr[1] }),
      {}
    ),
  };
};

export const generateBatchFromParams = async (params, type) => {
  switch (type.toLowerCase()) {
    case "put":
      type = "PutRequest";
      break;
    case "delete":
      type = "DeleteRequest";
      break;
    default:
      type = "";
  }
  const batchParams = {};
  batchParams;
};

export const queryFromDb = async (params) => {
  const fn = params.KeyConditionExpression ? "query" : "scan";
  return await docClient[fn](params);
};

export const getAllFromDb = async (params, result) => {
  result = result || {};
  const newResult = await queryFromDb(params);
  result = {
    Items: (result.Items || []).concat(newResult.Items),
    Count: (result.Count || 0) + newResult.Count,
    ScannedCount: (result.ScannedCount || 0) + newResult.ScannedCount,
  };
  if (newResult.LastEvaluatedKey) {
    params.ExclusiveStartKey = newResult.LastEvaluatedKey;
    return getAllFromDb(params, result);
  } else {
    return result;
  }
}

export const putToDb = async (params) => {
  return await docClient.put(params);
}

export const updateDb = async (params) => {
  return await docClient.update(params);
}

export const deleteFromDb = async (params) => {
  return await docClient.delete(params);
}

export const getFromDb = async (params) => {
  return docClient.get(params)
}
