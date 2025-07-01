"use server";
import { SignupFormSchema } from "@/lib/validation";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession } from "../session/session";

export async function signup(value: any, formData: FormData) {
  let success = false;
  try {
    // 1. Validate form fields
    // ...

    const validatedFields = SignupFormSchema.safeParse({
      semail: formData.get("semail"),
      spassword: formData.get("spassword"),
    });

    console.log({ validatedFields });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const hashedPassword = await bcrypt.hash(
      validatedFields.data.spassword,
      10
    );

    console.log({ hashedPassword });
    // 3. Insert the user into the database or call an Auth Library's API
    const user = await prisma.user.create({
      data: {
        email: validatedFields.data.semail,
        password: hashedPassword,
      },
    });

    console.log({ user });
    if (!user) {
      return {
        message: "An error occurred while creating your account.",
        error: true,
      };
    }

    // TODO:
    // 4. Create user session
    // 5. Redirect user
    await createSession(user.id);
    // 5. Redirect user
    success = true;
  } catch (error) {
    console.log(error);

    return {
      message: "An error occurred while creating your account.",
      error: true,
    };
  }
  if (success) {
    redirect("/app/chat");
  } else {
    return {
      message: "An error occurred while creating your account.",
      error: true,
    };
  }
}
