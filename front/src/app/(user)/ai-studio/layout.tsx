import { MultiFormDataProvider } from "@/components/provider/AIFormdataProvider";

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
