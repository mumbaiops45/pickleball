import Image from "next/image";


export default function Photo({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
  imgClassName = "object-cover",
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={imgClassName}
      />
    </div>
  );
}
