const tasks = [
  {
    _id: "6040a97f63cfea2cf878e4b2",
    name: "test-1",
    email: "test-1@mail.com",
    phone: "000-777-555",
    owner: {
      name: "Volodka",
      subscription: "free",
      email: "volodka@mail.com",
    },
  },
  {
    _id: "6040a99163cfea2cf878e4b3",
    name: "test-2",
    email: "test-2@mail.com",
    phone: "000-777-555",
    owner: {
      name: "Volodka",
      subscription: "free",
      email: "volodka@mail.com",
    },
  },
];
const newContact = {
  name: "New",
  email: "new@mail.com",
  phone: "000-123-456",
};
const User = {
  _id: "603f5171ecbe9d0b54fd726a",
  name: "Volodka",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwM2Y1MTcxZWNiZTlkMGI1NGZkNzI2YSIsImlhdCI6MTYxNTQ2NTYzMiwiZXhwIjoxNjE1NDg3MjMyfQ.xAkoeQvtveBaIglg--UyASW7dAooYjJT1XWue0lEGRc",
  email: "volodka@mail.com",
  password: "$2a$06$KK7.RQM.62Q8HSXO8J5dbeCO8kk/E65UM92ukoO0gbzNwEoYnUAL.",
  subscription: "free",
  avatarURL: "/images/1615549581038-test-avatar.jpg",
};
const users = [];
users[0] = User;

const newUser = { email: "newtest@mail.com", password: "password" };
module.exports = { tasks, newContact, User, users, newUser };
