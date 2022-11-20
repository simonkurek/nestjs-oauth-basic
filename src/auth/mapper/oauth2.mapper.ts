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

const OAuth2DataMapper = (
  oauth2Data: OAuth2FacebookDto | OAuth2GoogleDto,
): User => {
  // const { accessToken } = oauth2Data;
  let newUser: User;
  if (oauth2Data instanceof OAuth2FacebookDto) {
    const { user } = oauth2Data;
    const { email, firstName, lastName } = user;
    newUser = createUser(email, firstName, lastName);
  } else if (oauth2Data instanceof OAuth2GoogleDto) {
    const { email, firstName, lastName } = oauth2Data;
    newUser = createUser(email, firstName, lastName);
  }
  return newUser;
};

export default OAuth2DataMapper;
