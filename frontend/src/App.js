
import './App.css';
import AllRoutes from './Components/AllRoutes/AllRoutes';
import Loading from './Components/LoadingOverlay/Loading';
import { useSelector } from 'react-redux';


function App() {
  const fetching = useSelector((store) => store.ProductReducer.loading)

  return (
    <>
      {fetching && <Loading show={fetching} />}
      <AllRoutes />
    </>
  );
}

export default App;
