import { FormDataProvider } from "@/app/FormDataProvider";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FormDataProvider>{children}</FormDataProvider>
    </>
  );
}
