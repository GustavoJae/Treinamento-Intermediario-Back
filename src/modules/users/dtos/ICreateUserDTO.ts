interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  cpf: string;
  telephone: string;
}

export default ICreateUserDTO;
