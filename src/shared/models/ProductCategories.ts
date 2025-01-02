export interface ProductCategories {
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
  key: string;
  name: Name;
  slug: Slug;
  description: Description;
  ancestors: Ancestor[];
  orderHint: string;
  assets: unknown[];
  parent?: Parent;
}

interface LastModifiedBy {
  clientId: string;
  isPlatformClient: boolean;
}

interface CreatedBy {
  clientId: string;
  isPlatformClient: boolean;
}

interface Name {
  'en-US': string;
}

interface Slug {
  'en-US': string;
}

interface Description {
  'en-US': string;
}

interface Ancestor {
  typeId: string;
  id: string;
}

interface Parent {
  typeId: string;
  id: string;
  obj: Obj;
}

interface Obj {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: LastModifiedBy2;
  createdBy: CreatedBy2;
  key: string;
  name: Name2;
  slug: Slug2;
  description: Description2;
  ancestors: unknown[];
  orderHint: string;
  assets: unknown[];
}

interface LastModifiedBy2 {
  clientId: string;
  isPlatformClient: boolean;
}

interface CreatedBy2 {
  clientId: string;
  isPlatformClient: boolean;
}

interface Name2 {
  'en-US': string;
}

interface Slug2 {
  'en-US': string;
}

interface Description2 {
  'en-US': string;
}
