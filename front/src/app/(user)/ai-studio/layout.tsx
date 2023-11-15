import { MultiFormDataProvider } from "@/app/MultiFormdataProvider";

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
