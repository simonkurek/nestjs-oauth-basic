import { OAuthProvider } from 'src/auth/oauth.provider';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  oauthProvider: OAuthProvider;
}
