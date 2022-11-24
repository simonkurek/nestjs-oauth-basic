import { Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { OAuthProvider } from './oauth.provider';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = (
      await this.usersService.findBy({ where: [{ email: username }] })
    )[0];
    if (user && user.password === password) return user;
    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign(
        {
          sub: user.id,
          email: user.email,
        },
        {
          // for demo purposes only
          // secret: process.env.JWT_SECRET,
          secret: 'secret',
          // expiresIn: process.env.JWT_EXPIRE_TIME,
          expiresIn: 60,
        },
      ),
    };
  }

  async signInWith(oauthProvider: OAuthProvider, userDto: User) {
    const user = (
      await this.usersService.findBy({ where: [{ email: userDto.email }] })
    )[0];
    // if (user) throw new NotFoundException('User not found');
    if (user && user.oauthProvider === oauthProvider) {
      return this.login(user);
    } else if (user && user.oauthProvider !== oauthProvider) {
      throw new ForbiddenException(
        "User already exists, but account was not connected to user's account",
      );
    }

    try {
      await this.usersService.store(userDto);
      return this.login(userDto);
    } catch (e) {
      throw new Error(e);
    }
  }
}
