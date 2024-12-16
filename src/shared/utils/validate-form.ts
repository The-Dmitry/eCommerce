import { z } from 'zod';

export default async function validateForm<T>(
  schema: z.ZodType<T>,
  data: FormData
): Promise<[{ [k: string]: FormDataEntryValue }, z.SafeParseReturnType<T, T>]> {
  const collection = Object.fromEntries(data.entries());
  const result = await schema.safeParseAsync(collection);
  return [collection, result];
}
