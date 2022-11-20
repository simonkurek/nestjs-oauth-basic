import { Controller, UseGuards, Req, Get, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FacebookAuthGuard } from './guards/facebook.guard';
import { GoogleAuthGuard } from './guards/google.guard';
import { LocalAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { OAuthProvider } from './oauth.provider';
import { User } from 'src/users/entities/user.entity';
import { OAuth2Data } from './decorators/oauth2.decorator';
import { OAuth2GoogleDto } from './dto/oauth2-google.dto';
import { OAuth2FacebookDto } from './dto/oauth2-facebook.dto';
import OAuth2DataMapper from './mapper/oauth2.mapper';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  google_jd = {
    email: 'simonkurek@protonmail.com',
    firstName: 'Szymon',
    lastName: 'Kurek',
    accessToken:
      'ya29.a0AeTM1ie1bLSqRqxuex0vjclIS4_mu24uQ0sKopjr4A3Em-PaoN3d-0dOjhUDPZM6MoEUYoSbbXTgCI_TTc5uiexAt3CJ2GAOehj85ELMSfP1751DwDOBzEwMiogdxOmj19rRRPxWcCY_ptoU_D-ROU79VyFGaCgYKAUYSARISFQHWtWOmWsjhyjAh88sl5hSvm0CTuA0163',
  };

  facebook_jd = {
    user: {
      email: 'thebremekpl@gmail.com',
      firstName: 'Szymon',
      lastName: 'Kurek',
    },
    accessToken:
      'EAAJpLsQmpZBoBAGINDWvsSwPB6068EyJoa7pv2Stc1ZB3VzCbhrptHo9CnAcgQj6HrewJXXgULdsV23ZBE2fvZCBwtsuKVYwxaVTm9T8SedljQszQkZCUs6iYdpltZCRR8YH6eZBMSwZCRZBlu4jVmYghZAegPkIhcbIubm5ZBbBh43TscI2XR21NIBQgLk5dbbk1qZBwx3Kt9xzQdLbgEGPe3JqCipCZBHYoWVpmc00bZBiwiFAZDZD',
  };

  @UseGuards(LocalAuthGuard)
  @Get('profile')
  async profile() {
    return 'this return some profile data and test jwt token';
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async signInWithGoogle() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async signInWithGoogleRedirect(@OAuth2Data() oauthData: OAuth2GoogleDto) {
    const user = OAuth2DataMapper(oauthData);
    return this.authService.signInWith(OAuthProvider.GOOGLE, user);
  }

  @Get('/facebook')
  @UseGuards(FacebookAuthGuard)
  async signInWithFacebook(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(FacebookAuthGuard)
  async signInWithFacebookRedirect(@OAuth2Data() oauthData: OAuth2FacebookDto) {
    const user = OAuth2DataMapper(oauthData);
    return this.authService.signInWith(OAuthProvider.FACEBOOK, user);
  }
}
