import { RecoilRoot } from 'recoil';
import CountdownController from './controller/CountdownController';

function App() {
  return (
    <RecoilRoot>
      <CountdownController />
    </RecoilRoot>
  );
}

export default App;
