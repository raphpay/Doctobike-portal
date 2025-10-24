import LoginImage from "@/assets/login.jpg";
import useLoginScreen from "@/features/auth/hooks/useLoginScreen";
import BackgroundImage from "@/shared/components/ui/background-image";
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
  const { setEmail, setPassword, tapOnLogin, tapOnSignUp } = useLoginScreen();

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-4 overflow-hidden">
      <div className="relative w-3/4 h-full">
        <BackgroundImage src={LoginImage} alt="login-background" />

        <div className="absolute top-6 left-6 z-10 text-white">
          <h1 className="text-3xl font-bold tracking-tight">
            L'entretien simplifié.
          </h1>
          <p className="text-md opacity-80">Le temps retrouvé.</p>
        </div>
      </div>

      <div className="flex flex-col w-2/5 justify-center items-center gap-6">
        <Label className="text-4xl font-semibold">Doctobike</Label>
        <Card className="w-full max-w-md">
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
              <Button onClick={tapOnSignUp} variant={"underline"} type="button">
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
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginScreen;
