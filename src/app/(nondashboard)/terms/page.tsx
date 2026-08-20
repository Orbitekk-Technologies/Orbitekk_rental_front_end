import DocumentPage from "@/components/DocumentPage";
import { termsContent } from "@/content/legalDocuments";
import FooterSection from "../landing/FooterSection";

export default function TermsPage() {
  return (
    <>
      <DocumentPage title="Terms and Conditions" content={termsContent} />
      <FooterSection />
    </>
  );
}
