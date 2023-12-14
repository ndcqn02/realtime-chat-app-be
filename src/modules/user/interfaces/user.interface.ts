export interface IUser {
  id: string;
  passwordEnabled: boolean;
  totpEnabled: boolean;
  backupCodeEnabled: boolean;
  twoFactorEnabled: boolean;
  banned: boolean;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
  hasImage: boolean;
  gender: string;
  birthday: string;
  primaryEmailAddressId: string;
  primaryPhoneNumberId: string | null;
  primaryWeb3WalletId: string | null;
  lastSignInAt: number;
  externalId: string | null;
  username: string | null;
  firstName: string;
  lastName: string;
  publicMetadata: Record<string, unknown>;
  privateMetadata: Record<string, unknown>;
  unsafeMetadata?: Record<string, unknown>;
  emailAddresses?: IEmailAddress[];
  phoneNumbers?: IPhoneNumber[];
  web3Wallets?: IWeb3Wallet[];
  externalAccounts?: IExternalAccount[];
}

interface IVerification {
  status: string;
  strategy: string;
  externalVerificationRedirectURL: string | null;
  attempts: number | null;
  expireAt: number | null;
  nonce: string | null;
}

interface IEmailAddress {
  id: string;
  emailAddress: string;
  verification: IVerification;
  linkedTo: Array<{ id: string; type: string }>;
}

interface IPhoneNumber {
  id: string;
  // Define other properties as needed
}

interface IWeb3Wallet {
  id: string;
  // Define other properties as needed
}

interface IExternalAccount {
  id: string;
  approvedScopes: string;
  emailAddress: string;
  username: string | null;
  publicMetadata: Record<string, unknown>;
  label: string | null;
  verification: IVerification;
}
