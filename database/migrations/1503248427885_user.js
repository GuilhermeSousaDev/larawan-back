"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.uuid("id").unique().defaultTo(this.db.raw("gen_random_uuid()"));
      table.string("name", 80).notNullable().unique();
      table.string("email", 254).notNullable().unique();
      table.boolean('verified_email').notNullable().defaultTo(false);
      table.string("password", 60).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
