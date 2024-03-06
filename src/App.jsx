import { useEffect, useState } from 'react';
import './App.css';
import imgError from './img/error.png'

function App() {
  const CAT_ENDPOINT_RANDOM_FACT = 'https://meowfacts.herokuapp.com/?lang=esp';
  const [fact, setFact] = useState('');
  const [url, setUrl] = useState('');
  const [again, setAgain] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);          

      try {
        const res = await fetch(CAT_ENDPOINT_RANDOM_FACT);
        const data = await res.json();
        setFact(data.data);
      } catch (error) {
        setFact('')
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [again]);

  useEffect(() => {
    const getCatImg = async () => {
      setLoading(true);

      try {
        const res = await fetch('https://cataas.com/cat');
        setUrl(res.url);
      } catch (error) {
        setUrl(imgError)
      } finally {
        setLoading(false);
      }
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
