import LoginImage from "@/assets/login.jpg";
import useLoginScreen from "@/features/auth/hooks/useLoginScreen";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import { Label } from "@/shared/components/ui/label";
import { IconEye } from "@tabler/icons-react";
import { ToastContainer } from "react-toastify";

const LoginScreen = () => {
  const { setEmail, setPassword, tapOnLogin } = useLoginScreen();

  return (
    <div className="flex flex-1 justify-center items-center w-full h-full gap-4">
      <img className="w-3/4 h-full" src={LoginImage} alt="login" />

      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col text-start">
          <CardTitle>Connectez-vous à votre compte</CardTitle>
          <CardDescription>
            Entrez votre email et mot de passe pour laisser place à la magie.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col text-start gap-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                onChangeCapture={(e) => setEmail(e.currentTarget.value)}
                required={true}
              />
            </div>

            <div className="flex flex-col text-start gap-4">
              <Label htmlFor="password">Mot de passe</Label>
              <InputGroup>
                <InputGroupInput
                  type="password"
                  onChangeCapture={(e) => setPassword(e.currentTarget.value)}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    aria-label="Copy"
                    title="Copy"
                    size="icon-xs"
                    onClick={() => {
                      console.log("log");
                    }}
                  >
                    <IconEye />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </div>

            <Button onClick={tapOnLogin} type="button">
              Se connecter
            </Button>

            <div className="w-full px-4 h-[1px] bg-black" />
          </form>

          <div className="flex justify-center items-center">
            <Label>Pas encore de compte ?</Label>
            <Button variant={"underline"} type="button">
              Inscrivez-vous
            </Button>
          </div>

          <div className="w-full px-4 h-[1px] bg-black" />
          <div className="flex flex-col items-center justify-center">
            <Button variant={"underline"} type="button">
              Politique de confidentialité
            </Button>
            <Button variant={"underline"} type="button">
              CGU
            </Button>
          </div>
        </CardContent>
      </Card>

      <ToastContainer />
    </div>
  );
};

export default LoginScreen;
