import GridDestinations from "./components/LandingPage/GridDestinations";
import Header from "./components/LandingPage/Header";
import SliderDestinations from "./components/LandingPage/SliderDestinations";



export default async function HomePage() {

  return (
    <div>
   
      <Header  />
      <SliderDestinations />
      <GridDestinations />
    </div>
  );
}
