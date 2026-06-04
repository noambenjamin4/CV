import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <div className="notfound">
        <div className="container">
          <p className="notfound-code">ERR / 404</p>
          <h1 className="notfound-title">This page doesn&apos;t exist.</h1>
          <p className="notfound-text">
            The link may be broken or the page may have moved. Let&apos;s get you
            back on track.
          </p>
          <div className="hero-actions">
            <Link href="/" className="btn btn-primary">
              Back home
              <span className="btn-arrow" aria-hidden="true">↗</span>
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact me
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
