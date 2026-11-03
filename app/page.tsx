import AboutPage from "@/components/About";
import Feature from "@/components/Feature";

import Hero from "@/components/Hero";
import HostGuarantee from "@/components/HostGuarentee";
import HowWork from "@/components/HowWork";
import StudioCategories from "@/components/StudioCategories";

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
