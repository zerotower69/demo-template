import { SetMetadata } from '@nestjs/common';

export const Auth = () => SetMetadata('require-login', true);
export const RequireLogin = () => SetMetadata('require-login', true);
