import { z } from 'zod';
import countryMap from '../../constants/countries';

const personalDataChangeScheme = z.object({
  firstName: z
    .string()
    .min(3, 'Minimum length - 3 characters')
    .max(20, 'Maximum length - 20 characters')
    .regex(/^[^0-9]*$/, {
      message: 'The string must not contain any numbers',
    }),
  lastName: z
    .string()
    .min(3, 'Minimum length - 3 characters')
    .max(20, 'Maximum length - 20 characters')
    .regex(/^[^0-9]*$/, {
      message: 'The string must not contain any numbers',
    }),
  dateOfBirth: z
    .string()
    .date()
    .refine((arg) => new Date(arg) < new Date(), {
      message: 'Incorrect date',
    }),

  city: z.string(),
  country: z
    .string()
    .transform((val) =>
      val === '' ? 'UNDEFINED' : val in countryMap ? countryMap[val] : 'null'
    )
    .refine((val) => val === 'UNDEFINED' || val !== 'null', {
      message: 'Country not found',
    }),

  streetName: z.string(),
  streetNumber: z.string(),
});

export type PersonalChangeData = z.infer<typeof personalDataChangeScheme>;

export default personalDataChangeScheme;
