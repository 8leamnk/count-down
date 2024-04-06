import MainLayout from '../Layout/MainLayout';
import Countdown from '../Organisms/Countdown';
import Slider from '../Organisms/Slider';

function CountdownTemplate() {
  return (
    <>
      <Slider />
      <MainLayout>
        <Countdown />
      </MainLayout>
    </>
  );
}

export default CountdownTemplate;
