"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("welcome");

Route.group(() => {
  Route.get("/", "UserController.index");
  Route.get("/:id", "UserController.show");
  Route.put("/:id", "UserController.update");
  Route.delete("/:id", "UserController.destroy");
})
  .prefix("/user")
  .middleware("auth")
  .formats(["json"]);

Route.post("/", "UserController.create").prefix("/user").formats(["json"]);

Route.group(() => {
  Route.post("/", "SessionController.index");
  Route.get("/email/:token", "SessionController.verifyEmail");
})
  .prefix("/session")
  .formats(["json"]);
