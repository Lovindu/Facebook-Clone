import './App.css';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Feed from './Components/Feed';
import Rightbar from './Components/Rightbar';

function App() {
  return (
    <div className="App">
      
      {/* Header */}
      <Header />

      <div className="app__content">
        <Sidebar />  
        <Feed />
        <Rightbar />
      </div>

    </div>
  );
}

export default App;
