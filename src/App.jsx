import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const CAT_ENDPOINT_RANDOM_FACT = 'https://meowfacts.herokuapp.com/?lang=esp';
  const [fact, setFact] = useState('');
  const [url, setUrl] = useState('');
  const [again, setAgain] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);                
   
      const res = await fetch(CAT_ENDPOINT_RANDOM_FACT);
      const data = await res.json();
      setFact(data.data);

      setLoading(false);
    };

    fetchData();
  }, [again]);

  useEffect(() => {
    const getCatImg = async () => {
      setLoading(true);

      const res = await fetch('https://cataas.com/cat');
      setUrl(res.url);

      setLoading(false);
    };

    getCatImg();
  }, [fact]);

  return (
    <>
      <h1>Random Cats Fact<span style={{color: 'orange'}}>{`[`}</span>o<span style={{color: 'orange'}}>{`]`}</span>s</h1>
      <main>
        {loading ? (
          <div className="loader">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        ) : (
          <>
            <p style={{fontSize: 'large'}}>{fact}</p>
            <img src={url} alt="imagen de gato random" />
            <button onClick={() => setAgain(!again)}>Otro facto</button>
          </>
        )}
      </main>
    </>
  );
}

export default App;
