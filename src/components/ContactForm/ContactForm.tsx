import { FC } from 'react';

import styles from './ContactForm.module.css';

interface ContactFormProps {
  textAreaTitle: string;
  userNameInputValue: string;
  userEmailInputValue: string;
  textAreaValue: string;
  isEmailValid: boolean;
  userNameInputOnChangeHandler: (value: string) => void;
  userEmailInputOnChangeHandler: (value: string) => void;
  textAreaInputOnChangeHandler: (value: string) => void;
}

const ContactForm: FC<ContactFormProps> = ({
  textAreaTitle,
  userNameInputValue,
  userEmailInputValue,
  textAreaValue,
  isEmailValid,
  userNameInputOnChangeHandler,
  userEmailInputOnChangeHandler,
  textAreaInputOnChangeHandler,
}) => {
  return (
    <form
      className={styles.contactForm}
      onSubmit={(e) => e.preventDefault()}
    >
      <label
        className={styles.formInputLabel}
        htmlFor='userName'
      >
        Name:
      </label>
      <input
        className={styles.formInput}
        type='text'
        id='userName'
        placeholder='Type your name here...'
        name='userName'
        value = {userNameInputValue}
        onChange = {(e) => userNameInputOnChangeHandler(e.currentTarget.value)}
      />
      <label
        className={styles.formInputLabel}
        htmlFor='userEmail'
      >
        E-mail:
      </label>
      <input
        className={styles.formInput}
        type='email'
        id='userEmail'
        placeholder='Type your e-mail here...'
        name='userEmail'
        data-is-valid={isEmailValid}
        value = {userEmailInputValue}
        onChange = {(e) => userEmailInputOnChangeHandler(e.currentTarget.value)}
      />
      <span className={styles.validationMessage}>Please insert a valid e-mail</span>
      <div
        className={styles.textAreaWrapper}
      >
        <span className={styles.textAreaLable}>{`${textAreaTitle}:`}</span>
        <textarea
          className={styles.formTextArea}
          placeholder={`Type your ${textAreaTitle.toLowerCase()} here...`}
          name='userMessage'
          rows={4}
          value = {textAreaValue}
          onChange = {(e) => textAreaInputOnChangeHandler(e.currentTarget.value)}
        />
      </div>
      <span className={styles.text}>* All fields are required</span>
    </form>
  );
};

export default ContactForm;
