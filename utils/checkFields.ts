/**
 * It takes an array of required fields and an object of fields, and returns an array of missing fields
 * @param {any} requiredFields - an array of strings that represent the required fields
 * @param {any} fields - the object that contains the fields to be checked
 * @returns An array of missing fields
 */
export const checkContainFields = (requiredFields: any, fields: any) => {
  const missingFields = requiredFields.filter((field: any) => !(fields as any)[field]);

  return missingFields;
};
