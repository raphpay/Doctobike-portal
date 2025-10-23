type Props = {
  src?: string;
  alt?: string;
};

const BackgroundImage = ({ src, alt }: Props) => {
  return (
    <div className="h-full w-full">
      <img className="w-full h-full object-cover" src={src} alt={alt} />

      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
};

export default BackgroundImage;
