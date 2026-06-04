import Image from "next/image";

const SIZES = {
  small: { height: 52, width: 198 },
  normal: { height: 70, width: 266 },
} as const;

export default function Logo({
  size = "normal",
}: {
  size?: keyof typeof SIZES;
}) {
  const { height, width } = SIZES[size];

  return (
    <Image
      src="/assets/logos/logo1-transparent.png"
      alt="Neuroflex Kenya"
      width={width}
      height={height}
      className="h-auto w-auto max-h-[52px] md:max-h-[70px] object-contain"
      priority
    />
  );
}
