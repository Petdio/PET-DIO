import { FormDataProvider } from "@/components/common/FormDataProvider";

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
