import { EmailJSResponseStatus, send } from '@emailjs/nodejs';

export const sendPasswordResetEmail = async (email, resetLink, userName) => {
  try {
    console.log('📧 Attempting to send password reset email to:', email);
    console.log('🔑 Using Service ID:', process.env.EMAILJS_SERVICE_ID);
    console.log('🔑 Using Template ID:', process.env.EMAILJS_TEMPLATE_ID);
    console.log('🔗 Reset Link:', resetLink);

    const templateParams = {
      to_email: email,
      user_name: userName || email,
      reset_link: resetLink,
      reply_to: email,
    };
    
    console.log('📋 Template Params:', JSON.stringify(templateParams, null, 2));

    const response = await send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        ...templateParams,
        from_name: 'ChatAI',
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    console.log('📧 EmailJS Response:', JSON.stringify(response, null, 2));
    
    if (response.status === EmailJSResponseStatus.SUCCESS || response.status === 200) {
      console.log('✅ Password reset email sent to:', email);
      return { success: true, message: 'Reset email sent' };
    } else {
      throw new Error(`Failed to send email. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('❌ Failed to send password reset email.');
    console.error('📛 Error object:', error);
    console.error('📛 Error message:', error?.message);
    console.error('📛 Error status:', error?.status);
    console.error('📛 Error text:', error?.text);
    console.error('📛 Error response:', error?.response);
    throw new Error(
      error?.text ||
      error?.message ||
      'Failed to send reset email. Please try again later.'
    );
  }
};

export const sendWelcomeEmail = async (email, userName) => {
  try {
    const response = await send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_WELCOME_TEMPLATE_ID,
      {
        to_email: email,
        user_name: userName || email,
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    if (response.status === EmailJSResponseStatus.SUCCESS) {
      console.log('Welcome email sent successfully to:', email);
      return { success: true, message: 'Welcome email sent' };
    }
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    // Don't throw - signup should succeed even if welcome email fails
    return { success: false, message: 'Welcome email could not be sent' };
  }
};
