import SignUpImage from "@/assets/signup.jpg";
import useSignUpScreen, { Tab } from "@/features/auth/hooks/useSignUpScreen";
import BackgroundImage from "@/shared/components/ui/background-image";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/shared/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { Label } from "@/shared/components/ui/label";
import LabelInput from "@/shared/components/ui/label-input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { IconEye } from "@tabler/icons-react";
import { ToastContainer } from "react-toastify";

const SignUpScreen = () => {
  const {
    selectedTab,
    setShopName,
    setShopLocation,
    setManagerName,
    setShopCode,
    setEmail,
    setPassword,
    setEmployeeName,
    tapOnSignUp,
    tapOnLogin,
    setSelectedTab,
  } = useSignUpScreen();

  const ExtraButtons = () => {
    return (
      <div className="w-full">
        <div className="w-full px-4 h-[1px] bg-black" />
        <div className="flex flex-col items-center justify-center">
          <Button variant={"underline"} type="button">
            Politique de confidentialité
          </Button>
          <Button variant={"underline"} type="button">
            CGU
          </Button>
        </div>
      </div>
    );
  };

  const EmployeeCard = () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col text-start">
          <CardTitle>Créer votre compte</CardTitle>
          <CardDescription>
            Vous êtes à deux doigts d'être le meilleur employé.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col text-start gap-4 w-full">
              <Label htmlFor="email">Code shop</Label>
              <InputOTP
                maxLength={6}
                onChangeCapture={(e) => setShopCode(e.currentTarget.value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <LabelInput
              label="Nom complet"
              id="employeeName"
              onChangeCapture={setEmployeeName}
            />

            <LabelInput
              label="Email"
              htmlFor="email"
              type="email"
              id="email"
              onChangeCapture={setEmail}
            />

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

            <Button onClick={tapOnSignUp} type="button">
              Se connecter
            </Button>

            <div className="w-full px-4 h-[1px] bg-black" />
          </form>

          <div className="flex justify-center items-center">
            <Label>Déjà un compte ?</Label>
            <Button onClick={tapOnLogin} variant={"underline"} type="button">
              Connectez-vous
            </Button>
          </div>

          <ExtraButtons />
        </CardContent>
      </Card>
    );
  };

  const ShopCard = () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col text-start">
          <CardTitle>Créer votre compte</CardTitle>
          <CardDescription>
            Vous êtes à deux doigts d'avoir le meilleur atelier.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4">
            <LabelInput
              htmlFor="shopName"
              label="Nom du shop / organisation"
              onChangeCapture={setShopName}
            />

            <LabelInput
              htmlFor="shopLocation"
              label="Localisation"
              onChangeCapture={setShopLocation}
            />

            <LabelInput
              htmlFor="managerName"
              label="Nom du manager"
              onChangeCapture={setManagerName}
            />

            <LabelInput
              htmlFor="email"
              label="Email"
              id="email"
              type="email"
              onChangeCapture={setEmail}
            />

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

            <Button onClick={tapOnSignUp} type="button">
              Commencer
            </Button>

            <div className="w-full px-4 h-[1px] bg-black" />
          </form>

          <div className="flex justify-center items-center">
            <Label>Déjà un compte ?</Label>
            <Button onClick={tapOnLogin} variant={"underline"} type="button">
              Connectez-vous
            </Button>
          </div>
          <ExtraButtons />
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-4 overflow-hidden">
      <div className="flex flex-col w-2/5 justify-center items-center gap-6">
        <Label className="text-4xl font-semibold">Doctobike</Label>

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="max-w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value={Tab.SHOP}>Shop</TabsTrigger>
            <TabsTrigger value={Tab.EMPLOYEE}>Employé</TabsTrigger>
          </TabsList>

          <TabsContent value={Tab.SHOP}>{ShopCard()}</TabsContent>
          <TabsContent value={Tab.EMPLOYEE}>{EmployeeCard()}</TabsContent>
        </Tabs>
      </div>

      <div className="relative w-3/4 h-full">
        <BackgroundImage src={SignUpImage} alt="signup-background" />

        <div className="absolute top-6 left-6 z-10 text-white text-start">
          <h1 className="text-3xl font-bold tracking-tight">
            L'entretien du futur.
          </h1>
          <p className="text-md opacity-80">Dès maintenant.</p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignUpScreen;
