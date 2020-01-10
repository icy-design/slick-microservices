export default {
  User: {
    id: user => user.id
  },
  Query: {
    me: (_, __, ctx) => ctx.authenticatedUser
  }
}