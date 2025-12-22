"use client";

interface ProfilePictureProps {
  src: string;
  alt: string;
  name: string;
}

export default function ProfilePicture({ src, alt, name }: ProfilePictureProps) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      className="w-24 h-24 rounded-full object-cover"
      onError={(e) => {
        // Fallback to a default avatar if the image fails to load
        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=96&background=random`;
      }}
    />
  );
}
