import { EmailOptions } from "@entities/Email/EmailOptions";
import { AppError } from "@shared/errors/AppError";
import { Mailer } from "jobs/EmailProvider";

export async function sendEmail(email: string) : Promise<void> {
  const subject = 'oi Hannaaa estou passando aqui pra mostrar que sou um programer';
  const text = 'eu sei programar viu hanna';
  const from = process.env.EMAIL_LOGIN; 
  const to = email;
  
  if(!from) {
    throw new AppError('The variable from present in .env is null', 404);
  }

  const emailOptions = new EmailOptions(to, subject,text,from);

  const mailer = new Mailer();

  const transporter = await mailer.execute();
  
  (await transporter).sendMail(emailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
}