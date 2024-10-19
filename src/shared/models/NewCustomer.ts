export type NewCustomer<T> = {
  customer: Customer;
} & T;

interface Customer {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: LastModifiedBy;
  createdBy: CreatedBy;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: unknown[];
  shippingAddressIds: unknown[];
  billingAddressIds: unknown[];
  isEmailVerified: boolean;
  stores: unknown[];
  authenticationMode: string;
}

interface LastModifiedBy {
  clientId: string;
  isPlatformClient: boolean;
  anonymousId: string;
}

interface CreatedBy {
  clientId: string;
  isPlatformClient: boolean;
  anonymousId: string;
}
