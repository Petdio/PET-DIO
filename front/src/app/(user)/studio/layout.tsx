import { FormDataProvider } from "@/components/provider/FormDataProvider";

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
