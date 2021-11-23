import emailjs from 'emailjs-com';

interface IEmailjsResponce {
  status: number,
  text: string,
}

export const sendUserMessage = async (userFormData: Record<string, unknown>): Promise<IEmailjsResponce> => {
  const result = await emailjs.send(`${process.env.REACT_APP_EMAILJS_SERVICE_ID}`, `${process.env.REACT_APP_EMAILJS_TEMPLATE_ID}`, userFormData, `${process.env.REACT_APP_EMAILJS_USER_ID}`);

  return result;
};
