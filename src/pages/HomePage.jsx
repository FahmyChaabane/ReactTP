import React, { useEffect, useState } from "react";
import { fetchNews } from "../services/news.service";
import FilteringComponent from "../components/filteringComponent/filteringComponent";
import NewsList from "../components/newsList/NewsList";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNews();
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.log("err", error.message);
      }
    };

    fetchData();
  }, []);

  const onFilter = async (filter) => {
    setLoading(true);
    let newsClone = await fetchNews();
    newsClone = newsClone.filter(
      (n) =>
        n.title.includes(filter.text) &&
        (filter.selection ? filter.selection === n.category : true)
    );
    setNews(newsClone);
    setLoading(false);
  };

  return (
    <>
      <FilteringComponent onFilter={onFilter} />
      {loading ? <p>loading.....</p> : <NewsList news={news} />}
    </>
  );
}
