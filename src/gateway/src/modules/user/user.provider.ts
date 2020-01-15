import { Injectable, ProviderScope } from "@graphql-modules/di";
import bcrypt from 'bcrypt';

const users = [
  {
    id: '1',
    username: 'adalovelace',
    password: '$2b$08$LNob3RGJrX7L6WMkyLRMM.xTcVxwfAqvfBrW/6KsVM340/oBPKg/y' // 123456
  },
  {
    id: '2',
    username: 'alanturing',
    password: '$2b$08$LNob3RGJrX7L6WMkyLRMM.xTcVxwfAqvfBrW/6KsVM340/oBPKg/y' // 123456
  }
];

@Injectable({
  scope: ProviderScope.Session,
})
export class UserProvider {
  
  async findById(userId: string) {
    return users.find(user => user.id === userId);
  }

  async findByUsername(username: string) {
    return users.find(user => user.username === username);
  }

  async newUser({ username, password }) {
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    users.push({
      id: users.length + '',
      username,
      password: passwordHash
    });
    return users[users.length-1];
  }
}
