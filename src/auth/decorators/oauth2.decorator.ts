import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const OAuth2Data = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const returnData = ctx.switchToHttp().getRequest().user;
    return returnData;
  },
);
