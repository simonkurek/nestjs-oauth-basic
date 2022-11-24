import { User } from 'src/users/entities/user.entity';
import { OAuth2FacebookDto } from '../dto/oauth2-facebook.dto';
import { OAuth2GoogleDto } from '../dto/oauth2-google.dto';

const createUser = (email: string, firstName: string, lastName: string) => {
  const user = new User();
  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  return user;
};
export const OAuth2GoogleDataMapper = (oauth2Data: OAuth2GoogleDto): User => {
  // const { accessToken } = oauth2Data;
  const { email, firstName, lastName } = oauth2Data;
  return createUser(email, firstName, lastName);
};

export const OAuth2FacebookDataMapper = (
  oauth2Data: OAuth2FacebookDto,
): User => {
  // const { accessToken } = oauth2Data;
  const { user } = oauth2Data;
  const { email, firstName, lastName } = user;
  return createUser(email, firstName, lastName);
};
