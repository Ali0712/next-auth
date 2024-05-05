import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken, verifyTokenExpire: Date.now() + 3600000 
            })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 
            })
        }

        const transport = nodemailer.createTransport({
            host: `${process.env.MAILTRAP_HOST}`,
            port: parseInt(`${process.env.MAILTRAP_PORT}`),
            auth: {
              user: `${process.env.MAILTRAP_USER}`,
              pass: `${process.env.MAILTRAP_PASS}`
            }
          });

        const mailOptions = {
            from: "ali@ali.com",
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email": "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`,
        };

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch (error: any) {
        throw new Error("Error while sending email", error.message);
    }
};
