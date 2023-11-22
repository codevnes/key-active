module.exports = {
  routes: [
    {
      method: "GET",
      path: "/check-key",
      handler: "check-key.verifyLicense",
      config: {
        auth: false,
      },
    },
  ],
};
