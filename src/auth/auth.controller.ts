import { Controller, UseGuards, Get, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FacebookAuthGuard } from './guards/facebook.guard';
import { GoogleAuthGuard } from './guards/google.guard';
import { LocalAuthGuard } from './guards/jwt.guard';
import { OAuthProvider } from './oauth.provider';
import { OAuth2Data } from './decorators/oauth2.decorator';
import { OAuth2GoogleDto } from './dto/oauth2-google.dto';
import { OAuth2FacebookDto } from './dto/oauth2-facebook.dto';
import {
  OAuth2FacebookDataMapper,
  OAuth2GoogleDataMapper,
} from './mapper/oauth2.mapper';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
    const user = OAuth2GoogleDataMapper(oauthData);
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
    const user = OAuth2FacebookDataMapper(oauthData);
    return this.authService.signInWith(OAuthProvider.FACEBOOK, user);
  }
}
