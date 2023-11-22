"use strict";

/**
 * A set of functions called "actions" for `check-key`
 */
// Get License, Domain, and Soft_Id from the request body
// const { License, Domain, Soft_Id } = ctx.params;
// const { License, Domain, Soft_Id } = ctx.request.body;
module.exports = {
  verifyLicense: async (ctx, next) => {
    try {
      const { License, Domain, Soft_Id } = ctx.query;

      let response = {
        error: 103,
        success: false,
        msg: License + " không hợp lệ",
      };

      const licenseRecords = await strapi.entityService.findMany(
        "api::check.check",
        {
          filters: { License },
          limit: 1,
        }
      );

      // If no License is found, return an error
      if (licenseRecords.length === 0) {
        return ctx.send(response);
      }

      // Get the first license record and its Soft_Id and Domain
      const licenseRecord = licenseRecords[0];
      const actualSoftId = licenseRecord.Soft_Id;
      const actualDomain = licenseRecord.Domain;
      const actualStatus = licenseRecord.Active;
      const actualExpiry = licenseRecord.Expiry;
      const expiryDate = new Date(actualExpiry);
      const formattedExpiry = `${expiryDate
        .getDate()
        .toString()
        .padStart(2, "0")}-${(expiryDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${expiryDate.getFullYear()}`;

      if (actualDomain !== Domain) {
        response = {
          error: 102,
          success: false,
          msg: "Tên miền không hợp lệ.",
        };
        return ctx.send(response);
      }
      if (actualStatus === false) {
        response = {
          error: 101,
          success: false,
          msg: "Bị vô hiệu hoá rùi! Liên hệ Zalo: <strong style='color:green'> 0813.908.901 </strong>.",
        };
        return ctx.send(response);
      }

      if (actualSoftId !== Soft_Id) {
        response = {
          error: 101,
          success: false,
          msg: "Plugin không hợp lệ.",
        };
        return ctx.send(response);
      }

      response = {
        error: 100,
        success: true,
        msg: "License: " + License + " - Hợp lệ",
        plugin: {
          row: 118,
          ID: actualSoftId,
          Name: actualSoftId,
          Price: 0,
          Download_Url: "",
          Change_Log: "",
          Newest_Version: "1.0",
          "Update New Core": "",
        },
        license: {
          row: 118,
          License: License,
          Soft_Id: actualSoftId,
          Soft_Name: actualSoftId,
          Price: "",
          Domain: actualDomain,
          Expiry_Date: formattedExpiry,
          Customer_Name: "",
          Customer_Phone: "",
          Customer_Email: "",
          Status: "Active",
          Expiry_C_Use: "",
          Timestamp: "",
          Note: "",
        },
      };

      ctx.send(response);
    } catch (err) {
      ctx.body = { error: 500, success: false, msg: err.message };
    }
  },
};
