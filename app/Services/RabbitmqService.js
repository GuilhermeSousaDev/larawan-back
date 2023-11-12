const amqplib = require("amqplib");

class RabbitmqService {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    this.connection = await amqplib.connect("amqp://larawan:larawan@localhost");
    this.channel = await this.connection.createChannel();
  }

  async publish(queueName, message) {
    if (!this.connection) {
      await this.connect();
    }

    this.channel.assertQueue(queueName);
    this.channel.sendToQueue(queueName, Buffer.from(message));
  }

  async close() {
    if (this.connection) {
      await this.channel.close();
    }
  }
}

module.exports = RabbitmqService;
