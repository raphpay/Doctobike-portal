import { signIn } from "@/features/auth/api/signIn";
import { useState } from "react";

export default function useLoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function tapOnLogin() {
    try {
      await signIn(email, password);
    } catch (error) {
      console.log("Show toast");
    }
  }

  return { setEmail, setPassword, tapOnLogin };
}
