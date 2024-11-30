export interface CartData {
  type: string;
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: LastModifiedBy;
  createdBy: CreatedBy;
  lineItems: LineItem[];
  cartState: string;
  totalPrice: TotalPrice2;
  shippingMode: string;
  shipping: unknown[];
  customLineItems: unknown[];
  discountCodes: unknown[];
  directDiscounts: unknown[];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  deleteDaysAfterLastModification: number;
  refusedGifts: unknown[];
  origin: string;
  itemShippingAddresses: unknown[];
  totalLineItemQuantity: number;
}

export interface LastModifiedBy {
  clientId: string;
  isPlatformClient: boolean;
  anonymousId: string;
}

export interface CreatedBy {
  clientId: string;
  isPlatformClient: boolean;
  anonymousId: string;
}

export interface LineItem {
  id: string;
  productId: string;
  productKey: string;
  name: Name;
  productType: ProductType;
  productSlug: ProductSlug;
  variant: Variant;
  price: Price2;
  quantity: number;
  discountedPricePerQuantity: unknown[];
  perMethodTaxRate: unknown[];
  addedAt: string;
  lastModifiedAt: string;
  state: State[];
  priceMode: string;
  lineItemMode: string;
  totalPrice: TotalPrice;
  taxedPricePortions: unknown[];
}

export interface Name {
  'en-US': string;
}

export interface ProductType {
  typeId: string;
  id: string;
  version: number;
}

export interface ProductSlug {
  'en-US': string;
}

export interface Variant {
  id: number;
  sku: string;
  key: string;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
  assets: unknown[];
}

export interface Price {
  id: string;
  value: Value;
  key: string;
}

export interface Value {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface Image {
  url: string;
  dimensions: Dimensions;
}

export interface Dimensions {
  w: number;
  h: number;
}

export interface Attribute {
  name: string;
  value: unknown;
}

export interface Price2 {
  id: string;
  value: Value2;
  key: string;
}

export interface Value2 {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface State {
  quantity: number;
  state: State2;
}

export interface State2 {
  typeId: string;
  id: string;
}

export interface TotalPrice {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface TotalPrice2 {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}
