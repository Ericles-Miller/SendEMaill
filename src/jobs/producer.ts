import amqp from 'amqplib';
import { IEmailMessage } from 'infra/interfaces/IEmailMessage';


export async function addEmailToQueue(email: string): Promise<void> {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'emailQueue';

    await channel.assertQueue(queue, { durable: true });
    const msg: IEmailMessage = { email };
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
      persistent: true,
    });

    console.log(' [x] Sent \'%s\'', email);

    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error:', error);
  }
}
