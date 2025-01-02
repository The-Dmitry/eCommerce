export interface ProductProjectionResponse {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: ProductProjection[];
}

export interface ProductProjection {
  id: string;
  version: number;
  productType: ProductType;
  name: Name;
  description: Description;
  categories: Category[];
  slug: Slug;
  metaTitle?: MetaTitle;
  metaDescription?: MetaDescription;
  variants: unknown[];
  masterVariant: MasterVariant;
  hasStagedChanges: boolean;
  published: boolean;
  key: string;
  taxCategory: TaxCategory;
  createdAt: string;
  lastModifiedAt: string;
}

interface ProductType {
  typeId: string;
  id: string;
}

interface Name {
  'en-US': string;
}

interface Description {
  'en-US': string;
}

interface Category {
  typeId: string;
  id: string;
  obj: {
    id: string;
    key: string;
    name: Name;
    slug: Slug;
    description: Description;
    parent: {
      obj: {
        name: {
          'en-US': string;
        };
      };
    };
  };
}

interface Slug {
  'en-US': string;
}

interface MetaTitle {
  'en-US': string;
}

interface MetaDescription {
  'en-US': string;
}

interface MasterVariant {
  attributes: Attribute[];
  assets: unknown[];
  images: Image[];
  prices: Price[];
  key: string;
  sku: string;
  id: number;
}

interface Attribute {
  name: string;
  value: string;
}

interface Image {
  url: string;
  dimensions: Dimensions;
}

interface Dimensions {
  w: number;
  h: number;
}

interface Price {
  id: string;
  value: Value;
  key?: string;
  discounted?: {
    value: {
      type: string;
      currencyCode: string;
      centAmount: number;
      fractionDigits: number;
    };
    discount: {
      typeId: string;
      id: string;
    };
  };
}

interface Value {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

interface TaxCategory {
  typeId: string;
  id: string;
}
