import amqp from 'amqplib';
import { sendEmail } from 'infra/email/sendEmail';
import { IEmailMessage } from 'infra/interfaces/IEmailMessage';


export async function receiveMessages(): Promise<void> {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'emailQueue';

    await channel.assertQueue(queue, { durable: true });
    console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queue);

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const { email } = JSON.parse(msg.content.toString()) as IEmailMessage;
        console.log(' [x] Received \'%s\'', email);

        await sendEmail(email);

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}