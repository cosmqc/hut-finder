import {useEffect, useState} from 'react';
import HutList from '../../components/huts/HutList.tsx';
import {getHuts} from '../../services/Huts.ts';

const BrowseHuts = () => {
  const [huts, setHuts] = useState<Hut[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchHuts = async () => {
      try {
        const data: Hut[] = await getHuts();
        setHuts(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch huts. Please try again later.');
      }
    }
    fetchHuts();
  }, []);

  if (error) {
    return (
      <div>
        {error}
      </div>
    )
  }
  return (
    <div>
      <HutList huts={huts}/>
    </div>
  )

}

export default BrowseHuts;