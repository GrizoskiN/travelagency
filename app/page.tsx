import AboutUs from "./components/LandingPage/AboutUs";
import BlogSection from "./components/LandingPage/BlogSection";
import GridDestinations from "./components/LandingPage/GridDestinations";
import Header from "./components/LandingPage/Header";
import SliderDestinations from "./components/LandingPage/SliderDestinations";
import TestimonialCarousel from "./components/LandingPage/Testimonials";
import SignUp from "./components/Newsletter/SignUp";



export default async function HomePage() {

  return (
    <div>
   
      <Header  />
      <SliderDestinations />
      <GridDestinations />
      <AboutUs/>
      <TestimonialCarousel/>
      <BlogSection/>
      <SignUp/>
    </div>
  );
}
