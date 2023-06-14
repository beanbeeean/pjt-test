import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import styles from "./nav.module.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchAction } from "../redux/actions/searchAction";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  // console.log(process.env.REACT_APP_CLIENT_ID);
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    // getToken()

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const searching = (e) => {
    e.preventDefault();
    // console.log("search Key ", searchKey);
    dispatch(searchAction.searchByKeyword(searchKey));
    navigate("/search");
  };
  // const searchArtists = async (e) => {
  //   e.preventDefault();
  //   // console.log(token);
  //   const artists = await axios.get("https://api.spotify.com/v1/search", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     params: {
  //       q: searchKey,
  //       type: "artist",
  //       limit: 50,
  //     },
  //   });

  //   const tracks = await axios.get("https://api.spotify.com/v1/search", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     params: {
  //       q: searchKey,
  //       type: "track",
  //       limit: 50,
  //     },
  //   });

  //   const albums = await axios.get("https://api.spotify.com/v1/search", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     params: {
  //       q: searchKey,
  //       type: "album",
  //       limit: 50,
  //     },
  //   });
  //   // ("6RHTUrRF63xao58xh9FXYJ");
  //   const artistsTrack = await axios.get("https://api.spotify.com/v1/tracks", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     params: {
  //       id: "6RHTUrRF63xao58xh9FXYJ",
  //     },
  //   });
  //   console.log("artists", artists.data.artists.items);
  //   console.log("tracks", tracks.data.tracks.items);
  //   console.log("albums", albums.data.albums.items);
  //   console.log("artistsTrack", artistsTrack);
  //   navigate("/search");
  // };

  return (
    <Container>
      <Row className={styles.search_wrap}>
        <Col className={styles.search} md={9}>
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            <img src="./imgs/default.jpg" />
          </a>
          <form onSubmit={searching}>
            <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
            <button type="submit">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </Col>
        <Col md={3} className={`${styles.login_wrap} text-center`}></Col>
      </Row>
      <Row className={styles.Menubar}>
        <Col className={`${styles.list} text-center`}>
          <a href="#">Music Chart</a>
        </Col>
        <Col className={`${styles.list} text-center`}>
          <a href="#">Gongju</a>
        </Col>
        <Col className={`${styles.list} text-center`}>
          <a href="#">is Me</a>
        </Col>
        <Col className={`${styles.list} text-center`}>
          <a href="#">All Playlist</a>
        </Col>
        <Col className={`${styles.list} text-center`}>
          <a href="#">Playlist</a>
        </Col>
      </Row>
    </Container>
  );
};

export default Nav;
