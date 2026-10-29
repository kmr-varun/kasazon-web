import type { Metadata } from "next";
import { Poppins, Roboto_Condensed, Montaga } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/src/lib/auth-context";
import { BookingProvider } from "@/src/lib/booking-context";

// Poppins font for general text and navigation
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Roboto Condensed for logo subtitle and headings
const robotoCondensed = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// Montaga font for promotional headings
const montaga = Montaga({
  variable: "--font-montaga",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Against font for logo - TODO: Need to source the actual font file
// Using serif fallback for now
// When font is available, add it to public/fonts/ and uncomment below:
// const against = localFont({
//   src: "../public/fonts/against-regular.woff2",
//   variable: "--font-against",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "WallKas - Your Space, Our Care",
  description: "WallKas - Your trusted service platform for cleaning, repairs, maintenance, beauty, painting, and more",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${robotoCondensed.variable} ${montaga.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-poppins">
        <AuthProvider>
          <BookingProvider>
            {children}
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
