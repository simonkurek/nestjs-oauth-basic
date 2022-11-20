import { createParamDecorator } from '@nestjs/common';

export const OAuth2Data = createParamDecorator((data, req) => {
  return req.user;
});
