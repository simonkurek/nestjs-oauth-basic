export class OAuth2FacebookDto {
  user: {
    email: string;
    firstName: string;
    lastName: string;
  };
  accessToken: string;
}
