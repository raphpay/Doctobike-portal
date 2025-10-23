import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

export default function SecureInput() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button variant="noShadow" type="button">
        Subscribe
      </Button>
    </div>
  );
}
