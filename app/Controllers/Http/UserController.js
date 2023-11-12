"use strict";

const User = use("App/Models/User");

class UserController {
  async index() {
    return await User.all();
  }

  async show({ params }) {
    return await User.find(params.id);
  }

  async create({ request }) {
    const { name, email, password } = request.all();

    const userEmailExists = await User.query().where('email', email).fetch();

    if (userEmailExists.rows.length) {
      return {
        success: false,
        errorMessage: 'email',
        data: null,
      }
    }

    const userNameExists = await User.query().where('name', name).fetch();

    if (userNameExists.rows.length) {
      return {
        success: false,
        errorMessage: 'name',
        data: null,
      }
    }

    const user = new User();

    user.name = name;
    user.email = email;
    user.password = password;

    await user.save();

    return {
      success: true,
      errorMessage: null,
      data: user,
    };
  }

  async update({ params, request }) {
    const { name, email } = request.all();

    const user = await User.find(params.id);

    user.name = name;
    user.email = email;

    await user.save();

    return user;
  }

  async destroy({ params }) {
    const user = await User.find(params.id);

    await user.delete();
  }
}

module.exports = UserController;
