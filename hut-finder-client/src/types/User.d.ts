type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
}

type UserRegister = {
  email: string;
  password: string;
} & User