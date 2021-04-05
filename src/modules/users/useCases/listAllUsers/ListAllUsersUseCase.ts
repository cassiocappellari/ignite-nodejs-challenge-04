import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const checkIfUserExists = this.usersRepository.findById(user_id)

    if (!checkIfUserExists) {
      throw new Error("user not exists")
    }

    if (checkIfUserExists.admin === false) {
      throw new Error("unauthorized user")
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
