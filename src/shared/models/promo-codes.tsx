export interface PromoCodes {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Result[];
}

interface Result {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: LastModifiedBy;
  createdBy: CreatedBy;
  code: string;
  name: Name;
  description: Description;
  cartDiscounts: CartDiscount[];
  isActive: boolean;
  references: unknown[];
  validFrom: string;
  validUntil: string;
  groups: unknown[];
}

interface LastModifiedBy {
  isPlatformClient: boolean;
  user: User;
}

interface User {
  typeId: string;
  id: string;
}

interface CreatedBy {
  isPlatformClient: boolean;
  user: User2;
}

interface User2 {
  typeId: string;
  id: string;
}

interface Name {
  'de-DE': string;
  'en-US': string;
}

interface Description {
  'de-DE': string;
  'en-US': string;
}

interface CartDiscount {
  typeId: string;
  id: string;
}
