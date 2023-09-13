import { connect } from "@/configs/db-config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import chalk from "chalk";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("password hashed!!!");
    // save to database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    console.log("user created!!!", newUser);
    await newUser.save();
    console.log("user saved!!!");
    console.log(newUser);
    // send verification email
    const mailRes = await sendEmail({
      email,
      emailType: "VERIFY",
      userId: newUser._id,
    });
    console.log(chalk.green(`email sent and response: ${mailRes}`));
    return NextResponse.json(
      { message: "User created successfully", success: true, user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
