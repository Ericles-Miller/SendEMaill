import { inject, injectable } from "inversify";
import { IUsersRepository } from "@repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { User } from "@entities/User";

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}


@injectable()
export class CreateUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async create({email, name,password }: IRequestDTO) : Promise<void> {    
    try {
      const userAlreadyExists = await this.usersRepository.checkEmailAlreadyExist(email);
        
    if(userAlreadyExists) {
      throw new AppError('user already exists with email!', 400);
    }
    
    const user = new User(name, email, password);    
    await this.usersRepository.create(user);
    } catch (error) {
      if(error instanceof AppError) {
        throw error
      }
      throw new AppError('Unexpected server error!', 500);
    }
    
  }
}