"use strict";

/**
 * check controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::check.check");
