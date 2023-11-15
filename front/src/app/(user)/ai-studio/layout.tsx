import { MultiFormDataProvider } from "@/components/provider/MultiFormdataProvider";

export default function AiStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MultiFormDataProvider>{children}</MultiFormDataProvider>
    </>
  );
}
