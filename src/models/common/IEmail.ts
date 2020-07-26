export interface IEmailObject {
  subject: string,
  from: {
    email: string
  },
  text: string,
  html: string
}
