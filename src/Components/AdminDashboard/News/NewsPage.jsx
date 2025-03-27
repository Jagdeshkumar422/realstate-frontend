import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "./newsPage.css";
import { token } from "../../../Hooks/UserHooks";
import NewsForm from "./NewsForm";
import axios from "axios";
import { showToast } from "../../../Utils/showToast";
import { APP_CONFIG } from "../../../config";
import "../../LatestNews/lnews.css"
const NewsPage = () => {
  const baseUrl = `${APP_CONFIG.backendUrl}api/news`;
  const [edit, setEdit] = useState(false);
  const [news, setNews] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setEdit(false);
  };
  useEffect(() => {
    getNews();
  }, []);
  const getNews = async () => {
    try {
      // setLoading(true)

      await axios
        .get(baseUrl, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            // setLoading(false)
            setNews(res.data);
          } else {
            setLoading(false);

            showToast("Error ! try again later", "error");
          }
        });
    } catch (error) {
      // setLoading(false)

      showToast("Error ! try again later", "error");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(baseUrl, news, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            // Update successful
            handleClose();
            setLoading(false);
            setNews(res.data);
            showToast("News updated successfully", "success");
          } else {
            setLoading(false);
            showToast("Error! Try again later", "error");
          }
        });
    } catch (error) {
      // setLoading(false)
      showToast("Error! Try again later", "error");
    }
  };

  return (
    <>
      <NewsForm
        edit={edit}
        loading={loading}
        setLoading={setLoading}
        setEdit={setEdit}
        news={news}
        setNews={setNews}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
      />
      <div className="news-page-container">
        <Button
          className="news-page-update-button"
          onClick={() => setEdit(!edit)}
        >
          Update
        </Button>
        <div name="Latest_news" className="latest_news_dash">
          <h3 className="latest_news_header">Preview</h3>
          <section id="Latest_news">
            <div className="news_container_dash">
              <h4>{news.title}</h4>
              <p dangerouslySetInnerHTML={{ __html: news.description }} />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default NewsPage;
