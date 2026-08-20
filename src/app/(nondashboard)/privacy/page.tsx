import DocumentPage from "@/components/DocumentPage";
import { privacyContent } from "@/content/legalDocuments";
import FooterSection from "../landing/FooterSection";

export default function PrivacyPage() {
  return (
    <>
      <DocumentPage title="Privacy Policy" content={privacyContent} />
      <FooterSection />
    </>
  );
}
