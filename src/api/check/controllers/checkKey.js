module.exports = {
  routes: [
    {
      method: "POST",
      path: "/checks/verify-license",
      handler: "check.verifyLicense",
      config: {
        auth: false,
      },
    },
  ],
};
