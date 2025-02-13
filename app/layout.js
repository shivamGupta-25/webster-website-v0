import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "Webster's - The Computer Science Society",
  //description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jost.className}>{children}
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </body>
    </html>
  );
}
