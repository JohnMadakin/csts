export default {
  jwtSecret: process.env.SECRET || '23453,3547656354q**&&_--,[',
  tokenDuration: process.env.TOKEN_DURATION || 360000,
  is_worker: process.env.QUEUE_WORKER,
  redis_url: process.env.REDIS_URL,
  workerConcurrency: process.env.WORKERCONCURRENCY || '20',
  sendgrid_api_keys: process.env.SENDGRID_API_KEY,
  verifyBaseURL: process.env.VERIFYEMAIL_URL,
  emailLink: process.env.EMAIL_LINK,
  hashExpiryDate: process.env.VERIFY_HASH_EXPIRY || 2,
  requestLimits: process.env.REQUEST_LIMITS || 50,
  seederPassword: process.env.ADMIN_PASSWORD || 'password@1'
};
