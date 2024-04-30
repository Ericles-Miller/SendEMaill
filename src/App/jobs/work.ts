import * as amqp from 'amqplib/callback_api';

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

    console.log(" [*] Esperando mensagens na fila. Para sair, pressione CTRL+C");

    channel.consume(queue, (msg) => {
      const emailDetails = JSON.parse(msg.content.toString());

      transporter.sendMail(emailDetails, (error, info) => {
        if (error) {
          console.error('Erro ao enviar e-mail:', error);
        } else {
          console.log('E-mail enviado:', info.response);
        }
      });
    }, {
      noAck: true
    });
  });
});
