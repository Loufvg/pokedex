module.exports = {
  launch: {
    headless: 'new',
    ignoreHTTPSErrors: true,
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins',
      '--disable-site-isolation-trials',
    ],
  },
  browserContext: 'default',
};
