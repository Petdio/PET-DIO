import AIFormDataProvider from "@/components/provider/AIFormdataProvider";

export default function AiStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AIFormDataProvider>{children}</AIFormDataProvider>
    </>
  );
}
