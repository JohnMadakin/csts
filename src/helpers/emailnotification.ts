import { IEmailObject } from '../models/common/IEmail';
import sgMail from '@sendgrid/mail';

import config from '../config/app';

sgMail.setApiKey(config.sendgrid_api_keys);


/**
 * @description sends a mail
 * @param {string} to The recipient of the mail
 * @param {object} emailTemplate Message that the recipient should have
 * @param {string} emailLink Link users would click to verify
 * @returns {object} response from sendGrid api
 */
export const sendNotificationEmail = (to: string, emailTemplate: IEmailObject, emailLink: string = null) => {
  const { subject, from, text } = emailTemplate;

  if (emailLink) {
    emailTemplate.html = `${emailTemplate.html}
      <h2><a href="${emailLink}" style="background-color: #6C54EC;
      color: white; padding: 5px 10px; text-decoration: none;
      border-radius: 2px;">CLICK ME</a></h2>
      `;
  }
  const messageProperty = {
    to, from, subject, text, html: emailTemplate.html
  };

  return sgMail.send(messageProperty);
}
