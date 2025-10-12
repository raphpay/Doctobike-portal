import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

export interface StackItem<StateType = any> {
  path: string;
  title: string;
  state?: StateType;
}

interface NavigationStackContextType {
  stack: StackItem[];
  navigate: (path: string, title?: string, state?: any) => void;
  goBack: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

const NavigationStackContext = createContext<
  NavigationStackContextType | undefined
>(undefined);

export const NavigationStackProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialScreen: StackItem = {
    path: "dashboard",
    title: "Dashboard",
  };
  const [stack, setStack] = useState<StackItem[]>([initialScreen]);
  const routerNavigate = useNavigate();

  const navigate = (path: string, title?: string, state: any = {}) => {
    setStack((prev) => [...prev, { path, state, title: title || path }]);
    routerNavigate(path, { state });
  };

  const goBack = () => {
    setStack((prev) => {
      if (prev.length <= 1) return prev; // never remove first screen
      const newStack = prev.slice(0, -1);
      const top = newStack[newStack.length - 1];
      // also navigate router to previous screen
      routerNavigate(top.path, { state: top.state });
      return newStack;
    });
  };

  const jumpTo = (index: number) => {
    setStack((prev) => {
      const newStack = prev.slice(0, index + 1);
      const top = newStack[newStack.length - 1];
      routerNavigate(top.path, { state: top.state });
      return newStack;
    });
  };

  const reset = () => {
    setStack([]);
    routerNavigate(initialScreen.path);
  };

  return (
    <NavigationStackContext.Provider
      value={{ stack, navigate, goBack, jumpTo, reset }}
    >
      {children}
    </NavigationStackContext.Provider>
  );
};

export const useNavigationStack = (): NavigationStackContextType => {
  const context = useContext(NavigationStackContext);
  if (!context)
    throw new Error(
      "useNavigationStack must be used within NavigationStackProvider"
    );
  return context;
};
