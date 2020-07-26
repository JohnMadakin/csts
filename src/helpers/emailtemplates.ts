/**
 * @description creates template for sending emails
 * @returns object of temapltes for sending emails;
 */
const emailTemplate = {
  verification: {
    from: {
      email: 'no-reply@csts.com',
    },
    subject: 'Email Verification',
    text: 'Please click the link below to verify your Email',
    html: `
        <h1 style="color: #6C54EC"> Welcome to csts.com</h1>
        <p style="color:black">Thank you for signing up
        for an csts.com
        please click on the button to verify your email address</p>
        `,
  },
  welcome: {
    from: {
      email: 'no-reply@csts.com',
    },
    subject: 'csts.com account created',
    text: 'Thank you for creating an account at csts.com',
    html: `
        <h1 style="color: #6C54EC"> Welcome to csts.com</h1>
        Log in into your account to start contributing.
         `,
  },
  expiredToken: {
    from: {
      email: 'no-reply@ctst.com',
    },
    subject: 'Expired Token',
    text: 'The token you attempt to verify your account with has expired',
    html: `
        <h1 style="color: #6C54EC"> Welcome to csts.com</h1>
        You are receiving this mail because you made attempt to verify your
        account with expired credentials. Kindly click the link
        below to verify your account.
         `,
  },
  confirmation: {
    from: {
      email: 'no-reply@ctst.com',
    },
    subject: 'Account successfully confirmed',
    text: 'Thank you for confirming your account at csts.com',
    html: `
        <h1 style = "color: #6C54EC"> Welcome to csts.com </h1>
        <p>'Thank you for confirming your account at csts.com'</p>
        Log in into your account to start contributing.
         `,
  },
  resetPassword: {
    from: {
      email: 'no-reply@ctst.com',
    },
    subject: 'Please Reset Password',
    text: 'Reset Password at ctst.com',
    html: `
        < h1 style = "color: #6C54EC" > csts.com </h1>
        < p > 'You requested to reset your csts.com password.' </p>
        <p>'Please click on the button below within
        the next 30 minute to reset your password:'</p>
         `,
  },

};

export default emailTemplate;
