import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
  useState
} from 'react';

export default function Home(props) {
  const [ search, setSearch ] = useState();
  const [ results, setResults ] = useState([]);

  async function submit(e) {
    e.preventDefault();

    // make a search request with our API
    console.log(`/api/search?q=${search}`);
    const res = await fetch(`/api/search?q=${search}`);
    const json = await res.json();
    setResults(json);
  }

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search IGDB"
        onChange={(e) => setSearch(e.target.value)}></input>

      <button onClick={submit}>Search</button>

      {results.length > 0 &&
        <pre>{JSON.stringify(results, null, 2)}</pre>
      }
    </div>
  )
}
