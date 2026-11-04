import AboutPage from "@/components/HomePage/About";
import Feature from "@/components/HomePage/Feature";

import Hero from "@/components/HomePage/Hero";
import HostGuarantee from "@/components/HomePage/HostGuarentee";
import HowWork from "@/components/HomePage/HowWork";
import StudioCategories from "@/components/HomePage/StudioCategories";

export default function Home() {
  return (
   <div>
     <Hero></Hero>
     <StudioCategories></StudioCategories>
     <Feature></Feature>
     <HowWork></HowWork>
     <HostGuarantee></HostGuarantee>
     <AboutPage></AboutPage>
   </div>
  );
}
