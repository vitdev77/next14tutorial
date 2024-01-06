"use server";

import { revalidatePath } from "next/cache";
import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import slugify from "slugify";

export const addPost = async (prevState, formData) => {
  const { title, desc, img, userId } = Object.fromEntries(formData);

  try {
    connectToDb();

    const titleSlug = slugify(title, { lower: true, remove: /[*+~.()'"!:@]/g });

    const newPost = new Post({
      title,
      desc,
      img,
      slug: titleSlug,
      userId,
    });

    await newPost.save();
    console.log("Post saved to db");

    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log("Post deleted from db");

    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const addUser = async (prevState, formData) => {
  const { username, email, password, img, isAdmin } =
    Object.fromEntries(formData);

  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
      isAdmin,
    });

    await newUser.save();
    console.log("User saved to db");

    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("User deleted from db");

    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, passwordRepeat, img } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();

    console.log("saved to db");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", {
      username,
      password,
    });
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    // return { error: "Something went wrong!" };
    throw err;
  }
};
