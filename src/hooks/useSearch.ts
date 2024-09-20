import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import { allPosts as posts, Post } from 'content-collections';

const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Post[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);

      try {
        const filtered = posts?.filter((post) =>
          post.title.includes(debouncedQuery ?? '')
        );
        setResult(filtered ?? []);
      } catch (err) {
        setResult([]);
      } finally {
        setIsLoading(false);
      }
    };

    if ((debouncedQuery?.length ?? 0) > 0) {
      search();
    }
  }, [debouncedQuery]);

  return {
    isLoading,
    query,
    searchResult: setQuery,
    result,
  };
};

export default useSearch;
