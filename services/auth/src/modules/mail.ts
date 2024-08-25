import nodeMailer from "nodemailer";
import otpGenerator from "otp-generator";

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const generateOTP = (): string => {
  return otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
    digits: true,
  });
};

export const sendMail = async (email: string, otp: string) => {
  try {
    let info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "One-Time-Password to Sign Up to Surj",
      html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Thank you for Signin up to Surj.</h2>
        <h4>One more step and you are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Please enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
   </div>
    `,
    });
    return info;
  } catch (err) {
    console.log(`Error sending email: ${err}`);
    return false;
  }
};
