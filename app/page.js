import Header from "./_components/Header";
import Footer from "./_components/Footer";
import Banner from "./_components/Banner";
import About from "./_components/About";
import Workshop from "./_components/Workshop";
import PastEvent from "./_components/PastEvent";
import Council from "./_components/Council";

export default function Home() {
  return (
    <>
      <Header>
        <main>
          <Banner />
          <About />
          <Workshop />
          <PastEvent />
          <Council />
        </main>
      </Header>
      <Footer />
    </>
  );
}
