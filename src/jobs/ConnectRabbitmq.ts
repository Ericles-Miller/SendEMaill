import { EmailOptions } from '@entities/Email/EmailOptions';
import * as amqp from 'amqplib/callback_api';


export class RabbitMq {
  async connection(emailOptions: EmailOptions) {
    amqp.connect('amqp://localhost', (error0, connection) => {
      if (error0) {
        throw error0;
      }
      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        const queue = 'fila_de_emails';

        channel.assertQueue(queue, {
          durable: false
        });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(emailOptions)));
        console.log(" [x] Enviado para a fila");
      });
    });
  }
}

