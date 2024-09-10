import { Router, Request, Response } from "express";
import { body } from "express-validator";
import prisma from "./db";
import { sendMail } from "./modules/mail";
import { generateOTP } from "./modules/mail";
import { createJWT } from "./modules/auth";
const router = Router();

router.post(
  "/",
  body("email").isString(),
  async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(500).json({ message: "Invalid Email" });
      }
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      const otp = generateOTP();
      const response = await sendMail(email, otp);

      if (!response) {
        console.error(`Error sending mail to ${email}`);
        return res.status(500).json({ message: "Error sending mail" });
      }

      if (!existingUser) {
        const user = await prisma.user.create({
          data: {
            email,
            otp,
          },
        });
        console.log("New user created");
        return res.status(200).json({ message: "success", user });
      }

      const updatedUser = await prisma.user.update({
        where: { email: email },
        data: {
          otp: otp,
        },
      });

      return res.status(200).json({ updatedUser });
    } catch (err) {
      console.log(`Error : ${err}`);
      return res.status(500).json({ message: "Server Error" });
    }
  }
);

router.post("/verify", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(500).json({ message: "Email or OTP pending" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
        otp,
      },
    });

    if (!user) {
      console.log("User Does not exist");

      return res.status(404).json({ message: "Invalid credentials" });
    }

    //change status to active.
    await prisma.user.update({
      where: {
        email,
        otp,
      },
      data: {
        active: true,
        lastActive: new Date(),
      },
    });

    //FIXME: token creation gone wrong
    const token = createJWT(email);

    return res.status(200).json({ message: "success", token });
  } catch (err) {
    console.log("Error occured while verifying");
    return res.status(500).json({ message: "server error" });
  }
});

router.post("/add-info", async (req: Request, res: Response) => {
  try {
    const { name, contact, email } = req.body;

    if (!name || !contact) {
      return res.status(500).json({ message: "Invalid data" });
    }

    console.log({ name, contact, email });
    const user = await prisma.user.update({
      where: { email: email },
      data: {
        name,
        contact,
      },
    });

    return res.status(200).json({ message: "success", user });
  } catch (err) {
    console.log("Error occured while adding info");
    return res.status(500).json({ message: "server error" });
  }
});

export default router;
