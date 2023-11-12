"use strict";

const { LogicalException } = require("@adonisjs/generic-exceptions");

class UnauthorizedException extends LogicalException {
  constructor(message, status = 401) {
    super(message, status);
  }
}

module.exports = UnauthorizedException;
