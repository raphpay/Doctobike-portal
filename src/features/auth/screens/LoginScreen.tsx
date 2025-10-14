import useLoginScreen from "@/features/auth/hooks/useLoginScreen";
import SecureTextInput from "@/shared/components/SecureTextInput";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { ToastContainer } from "react-toastify";

const LoginScreen = () => {
  const { setEmail, setPassword, tapOnLogin } = useLoginScreen();

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="email@mail.com"
        onChangeCapture={(e) => setEmail(e.currentTarget.value)}
      />
      <SecureTextInput onChangeText={setPassword} />
      <Button variant="outline" onClick={tapOnLogin}>
        Se connecter
      </Button>

      <ToastContainer />
    </div>
  );
};

export default LoginScreen;
