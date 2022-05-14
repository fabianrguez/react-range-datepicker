import { Calendar } from 'components';

function App() {
  return (
    <div className="App">
      <Calendar months={2} onRangeSelected={({ range }) => console.log('range selected', range)} />
    </div>
  );
}

export default App;
