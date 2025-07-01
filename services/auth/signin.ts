"use server";
import { SigninFormSchema } from "@/lib/validation";
import { prisma } from "@/prisma/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { createSession } from "../session/session";

export async function signin(value: any, formData: FormData) {
  let success = false;
  try {
    // 1. Validate form fields
    // ...

    // e.g. Hash the user's password before storing it

    const validatedFields = SigninFormSchema.safeParse({
      lemail: formData.get("lemail"),
      lpassword: formData.get("lpassword"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: validatedFields.data.lemail,
      },
    });

    if (!user) {
      return {
        message: "An error occurred while creating your account.",
        error: true,
      };
    }

    const isMatch = await bcrypt.compareSync(
      validatedFields.data.lpassword,
      user.password as string
    );

    // 3. Insert the user into the database or call an Auth Library's API
    console.log(user);

    if (!isMatch) {
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
  }
  if (success) {
    redirect("/app/dashboard");
  } else {
    return {
      message: "An error occurred while creating your account.",
      error: true,
    };
  }
}
