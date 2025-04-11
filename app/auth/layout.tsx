export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="flex-1 flex flex-col justify-center items-center px-10">{children}</main>;
}
