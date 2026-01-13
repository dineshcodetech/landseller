"use server";

import bcrypt from "bcryptjs";
import { signIn, signOut } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/models/User";

export interface ActionResult {
  success: boolean;
  message: string;
  error?: string;
}

export async function registerUser(formData: FormData): Promise<ActionResult> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const phone = formData.get("phone") as string;

    if (!name || !email || !password) {
      return { success: false, message: "All fields are required" };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters",
      };
    }

    await connectDB();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return { success: false, message: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
    });

    return { success: true, message: "Registration successful! Please login." };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Registration failed. Please try again." };
  }
}

export async function loginUser(formData: FormData): Promise<ActionResult> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true, message: "Login successful!" };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Invalid email or password" };
  }
}

export async function logoutUser(): Promise<void> {
  await signOut({ redirect: false });
}
