function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export const transformToSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(transformToSnakeCase);
  } else if (obj !== null && obj?.constructor === Object) {
    return Object.keys(obj).reduce((acc: any, key: string) => {
      const snakeKey = camelToSnake(key);
      acc[snakeKey] = transformToSnakeCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};
