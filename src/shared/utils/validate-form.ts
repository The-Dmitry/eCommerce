import { z } from 'zod';

export default async function validateForm<T>(
  schema: z.ZodType<T>,
  data: FormData
): Promise<z.SafeParseReturnType<T, T>> {
  const collection = Object.fromEntries(data.entries()) as T;
  const result = await schema.safeParseAsync(collection);
  return result;
}
