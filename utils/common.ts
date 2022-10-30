// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncTryCatch = async (tryer: any) => {
  try {
    const result = await tryer();
    return [result, null];
  } catch (error) {
    return [null, error];
  }
};
