// EmailQueue.ts
import * as amqp from 'amqplib/callback_api';

export class EmailQueue {
  private static instance: EmailQueue;
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  private constructor() {}

  public static getInstance(): EmailQueue {
    if (!EmailQueue.instance) {
      EmailQueue.instance = new EmailQueue();
    }
    return EmailQueue.instance;
  }

  public async init(): Promise<void> {
    this.connection = await new Promise((resolve, reject) => {
      amqp.connect('amqp://localhost', (error, connection) => {
        if (error) reject(error);
        resolve(connection);
      });
    });
    
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue('email_queue', { durable: true });
  }

  public async enqueueEmail(email: string): Promise<void> {
    await this.channel.sendToQueue('email_queue', Buffer.from(email), { persistent: true });
  }

  public async close(): Promise<void> {
    await this.channel.close();
    await this.connection.close();
  }
}
