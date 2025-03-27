import React, { useState } from 'react';
import './lnews.css';
import axios from 'axios';
import { useEffect } from 'react';
import { Element } from 'react-scroll';
import { token } from '../../Hooks/UserHooks';
import { APP_CONFIG } from '../../config';

const Lnews = () => {
  const baseUrl = `${APP_CONFIG.backendUrl}api/news`;
  const [news, setNews] = useState(null);
  useEffect(() => {
    const getNews = async () => {
      try {
        await axios
          .get(baseUrl, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((res) => {
            setNews(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };

    getNews();
  }, []);

  return (
    <>
      {news ? (
        <Element name='Latest_news' className='latest_news'>
          <h1 className='latest_news_header'>Latest News</h1>
          <section id='Latest_news'>
            <div className='news_container'>
              <h4>{news.title}</h4>
              <p dangerouslySetInnerHTML={{ __html: news.description }} />
            </div>
          </section>
        </Element>
      ) : null}
    </>
  );
};

export default Lnews;
