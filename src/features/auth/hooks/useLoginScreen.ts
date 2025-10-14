import { signIn } from "@/features/auth/api/signIn";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useLoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function tapOnLogin() {
    try {
      await signIn(email, password);
    } catch (error) {
      const message = (error as Error).message ?? "Une erreur s'est produite";
      toast.error(message);
    }
  }

  return { setEmail, setPassword, tapOnLogin };
}
