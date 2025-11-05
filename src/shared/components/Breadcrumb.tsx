import { useNavigationStack } from "@/features/navigation/context/NavigationStackContext";
import classNames from "classnames";
import React from "react";

type BreadcrumbProps = {
  separator?: string;
  className?: string;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  separator = ">",
  className,
}) => {
  const { stack, jumpTo } = useNavigationStack();

  if (stack.length === 0) return null;

  return (
    <div className={classNames("flex items-center gap-2", className)}>
      {stack.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index === stack.length - 1 ? (
            // Current screen: not clickable, highlighted
            <p className="text-foreground text-2xl font-bold">{item.title}</p>
          ) : (
            // Clickable breadcrumb
            <button
              className={classNames(
                "cursor-pointer hover:underline text-2xl font-light text-foreground",
              )}
              onClick={() => jumpTo(index)}
            >
              {item.title}
            </button>
          )}

          {/* Separator, except after the last item */}
          {index < stack.length - 1 && (
            <span className="text-foreground font-light text-2xl">
              {separator}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
