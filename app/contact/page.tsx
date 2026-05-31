import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";
import ContactDetails from "@/components/ContactDetails";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Contact · ${profile.name}`,
  description: `Get in touch with ${profile.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <div className="contact-wrap">
        <div className="contact-card">
          <Link href="/" className="back-link">
            ← Back to home
          </Link>
          <div className="contact-head">
            <h1>Say hello.</h1>
            <p>
              Have an opportunity, question, or idea? Send me a message and it
              lands straight in my inbox. I usually reply within 24 hours.
            </p>
          </div>
          <ContactForm />
          <div className="contact-or">or reach me directly</div>
          <ContactDetails />
        </div>
      </div>
      <Footer />
    </>
  );
}
