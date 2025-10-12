import { useState } from "react";

export default function useLoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function tapOnLogin() {
    console.log("email", email);
    console.log("password", password);
  }

  function tapOnSignUp() {}

  return { setEmail, setPassword, tapOnLogin, tapOnSignUp };
}
