import { Injectable, ProviderScope, Inject } from "@graphql-modules/di";
import { ModuleSessionInfo } from "@graphql-modules/core";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { secret, expiration } from '../../env';
import { UserProvider } from "../user/user.provider";

@Injectable({
  scope: ProviderScope.Session
})
export class AuthProvider {
  @Inject() private userProvider: UserProvider;
  @Inject() private module: ModuleSessionInfo;
  private _currentUser: any;

  private get req() {
    return this.module.session.req || this.module.session.request;
  }

  private get res() {
    return this.module.session.res;
  }

  async signIn({ username, password }) {
    const user = await this.userProvider.findByUsername(username);

    if (!user) {
      throw new Error('user not found');
    }

    const passwordsMatch = bcrypt.compareSync(password, user.password);

    if (!passwordsMatch) {
      throw new Error('password is incorrect');
    }

    const authToken = jwt.sign(username, secret);

    this.res.cookie('authToken', authToken, { maxAge: expiration });

    return {...user, authToken};
  }

  async signUp({ password, passwordConfirm, username }) {
    if (!username || !password) {
      throw Error('parameters not provided')
    }

    if (password !== passwordConfirm) {
      throw Error("req.password and req.passwordConfirm don't match");
    }

    const existingUser = await this.userProvider.findByUsername(username);

    if (existingUser) {
      throw Error('username already exists');
    }

    return this.userProvider.newUser({
      username,
      password,
    });
  }

  async currentUser(): Promise<any | null> {
    if (this._currentUser) {
      return this._currentUser;
    }

    const authToken = this.req.headers.authorization || (this.req.cookies && this.req.cookies.authToken);
    if (authToken) {
      const username = jwt.verify(authToken, secret) as string;

      if (username) {
        this._currentUser = await this.userProvider.findByUsername(username);
        return this._currentUser;
      }
    }

    return null;
  }
}