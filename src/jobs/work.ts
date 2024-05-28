import { EmailQueue } from './EmailQueue';
import { Mailer } from './Mailer';

const mailer = new Mailer();

async function processEmail(email: string): Promise<void> {
  try {
    await mailer.execute(); // Configure o transporte Nodemailer
    // Lógica para enviar o e-mail aqui
    console.log(`Email enviado para: ${email}`);
  } catch (error) {
    console.error(`Erro ao enviar e-mail para: ${email}`, error);
  }
}

const emailQueue = EmailQueue.getInstance();

emailQueue.init().then(() => {
  emailQueue.channel.consume('email_queue', async (msg) => {
    if (msg !== null) {
      const email = msg.content.toString();
      await processEmail(email);
      emailQueue.channel.ack(msg); // Confirma o processamento da mensagem
    }
  });
});
