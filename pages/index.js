import dedent from 'dedent';
import styles from '../styles/Home.module.css';
import {
  useState
} from 'react';

const defaultQuery = dedent`
    fields name,summary,rating;
    search "zelda";
    limit 50;`;

export default function Home() {
  const [ query, setQuery ] = useState(defaultQuery);
  const [ endpoint, setEndpoint ] = useState('games');
  const [ results, setResults ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    // make a search request with our API
    const res = await fetch(`/api/search?q=${query}&e=${endpoint}`);
    const json = await res.json();
    setResults(json);
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <textarea
        className={styles.query}
        placeholder="Search IGDB"
        value={query}
        onChange={(e) => setQuery(e.target.value)}></textarea>

      <button
        className={styles.button}
        onClick={submit}>Query</button>

      {loading &&
        <p>Fetching results...</p>
      }

      {results.length > 0 &&
        <div className={styles.results}>
          <pre className={styles.json}>
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      }
    </div>
  )
}
