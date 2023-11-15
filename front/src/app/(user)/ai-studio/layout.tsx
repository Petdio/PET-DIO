import { MultiFormDataProvider } from "@/app/MultiFormdataProvider";
import BackButton from "@/components/ai-studio/back-button/BackButton";

export default function AiStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MultiFormDataProvider>
        <BackButton />
        {children}
      </MultiFormDataProvider>
    </>
  );
}
