'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class NotFoundException extends LogicalException {
  constructor(message, status = 404, code = 'E_NOT_FOUND') {
    super(message, status, code)
  }
}

module.exports = NotFoundException
