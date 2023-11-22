"use strict";

/**
 * check service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::check.check");
