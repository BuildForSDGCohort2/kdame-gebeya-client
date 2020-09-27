import React from 'react';
import SupplierSignUp from './supplier.sign-up.component';
import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../../apollo/server/mutations';
import { storeUser } from '../../utils';

const SupplierSignUpContainer = () => {
  let message = null;
  let inputErrors = null;
  const [signupUser, { data, loading }] = useMutation(SIGN_UP);
  if (data) {
    if (data && data.createUser.__typename === 'Token') {
      storeUser(data.createUser.token);
    } else if (data.createUser.__typename === 'SignupError') {
      message = data.createUser.message;
    } else if (data.createUser.__typename === 'UserInputError') {
      inputErrors = data.createUser.userErrors;
      message = data.createUser.message;
    }
  }

  return (
    <div>
      <SupplierSignUp
        signupUser={signupUser}
        loading={loading}
        message={message}
        inputErrors={inputErrors}
      />
    </div>
  );
};

export default SupplierSignUpContainer;
