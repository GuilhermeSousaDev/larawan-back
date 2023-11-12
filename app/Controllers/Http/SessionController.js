"use strict";

const RabbitmqService = require("../../Services/RabbitmqService");
const jwt = require("jsonwebtoken");

const Env = use("Env");
const Hash = use("Hash");

const User = use("App/Models/User");

const NotFoundException = use("App/Exceptions/NotFoundException");
const UnauthorizedException = use("App/Exceptions/UnauthorizedException");

class SessionController {
  async index({ request, response, auth }) {
    const { email, password } = request.all();

    const user = await User.query().where("email", email).first();

    if (!user) {
      throw new NotFoundException("User Not Found");
    }

    const isSamePassword = await Hash.verify(password, user.password);

    if (!isSamePassword) {
      throw new UnauthorizedException("Incorrect Password");
    }

    if (!user.verified_email) {
      const queue = "verify_email";
      const message = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      const rabbitmq = new RabbitmqService();

      try {
        await rabbitmq.connect();

        await rabbitmq.publish(queue, JSON.stringify(message));
      } finally {
        await rabbitmq.close();
      }

      return {
        success: true,
        errorMessage: null,
        data: "Email Enviado"
      };
    }

    if (auth.user) {
      await auth.logout();
    }

    await auth.login(user);

    return {
      success: true,
      errorMessage: null,
      data: user,
    };
  }

  async show() {
    try {
      const user = await auth.getUser();

      return user;
    } catch (e) {
      return e;
    }
  }

  async verifyEmail({ params }) {
    const { token } = params;

    try {
      const { id } = jwt.decode(token, Env.get("JWT_SECRET"));

      const user = await User.find(id);

      if (!user) {
        throw new NotFoundException("User Not Found");
      }

      user.verified_email = true;

      await user.save();

      return user;
    } catch (e) {
      throw new UnauthorizedException("Token Inválido ou Inspirado");
    }
  }
}

module.exports = SessionController;
