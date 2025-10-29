interface LeftBarButtonProps {
  title: string;
  onClick: () => void;
}

export default function LeftBarButton({ title, onClick }: LeftBarButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full h-[75px] border-border border-b-4 cursor-pointer hover:bg-main"
    >
      {title}
    </button>
  );
}
