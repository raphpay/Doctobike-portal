interface TextButtonProps {
  title: string;
  onClick: () => void;
}

export default function TextButton({ title, onClick }: TextButtonProps) {
  return (
    <button
      onClick={onClick}
      className="hover:underline cursor-pointer text-2xl"
    >
      {title}
    </button>
  );
}
