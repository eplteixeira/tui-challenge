interface User {
  username: string,
  password: string,
};

const standardUser: User = {
  username: 'standard_user',
  password: 'secret_sauce'
};

const lockedUser: User = {
  username: 'locked_out_user',
  password: 'secret_sauce'
}

const nonExistingUser: User = {
  username: 'test',
  password: 'test123'
}

export const Users = {
  standardUser,
  lockedUser,
  nonExistingUser
}