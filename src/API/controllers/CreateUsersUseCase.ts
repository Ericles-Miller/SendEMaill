import { inject, injectable } from "inversify";
import { AppError } from "@shared/errors/AppError";
import { sendEmail } from "infra/email/sendEmail";
import { User } from "@Domain/entities/User/User";
import { IUsersRepository } from "@infra/repositories/IUsersRepository";

export interface IRequestDTO {
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

  async create({email, name, password }: IRequestDTO) : Promise<void> {    
    try {
      const userAlreadyExists = await this.usersRepository.checkEmailAlreadyExist(email);
        
    if(userAlreadyExists) {
      throw new AppError('user already exists with email!', 400);
    }
    
    await sendEmail(email);

    const user = new User(name, email, password);    
    await this.usersRepository.create(user);


    } catch (error) {
      if(error instanceof AppError) {
        throw error
      }
      console.log(error);
      throw new AppError('Unexpected server error!', 500);
    }
    
  }
}