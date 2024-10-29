type UserData = Data | Error;

interface Data {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  createdBy: {
    isPlatformClient: boolean;
    user: {
      typeId: string;
      id: string;
    };
  };
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  title: string;
  locale: string;
  salutation: string;
  dateOfBirth: string;
  password: string;
  addresses: unknown[];
  shippingAddressIds: unknown[];
  billingAddressIds: unknown[];
  isEmailVerified: boolean;
  stores: unknown[];
  authenticationMode: string;
}

interface Error {
  statusCode: number;
  message: string;
  errors: {
    code: string;
    message: string;
  }[];
}

export default UserData;