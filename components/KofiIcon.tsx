type KofiIconProps = {
  className?: string;
  size?: number;
};

export function KofiIcon({ className, size = 20 }: KofiIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/kofi_brandasset/kofi_symbol.svg"
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    />
  );
}

export default KofiIcon;
