import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./css/search_tracks.module.css";

const TracksItem = ({ num, item }) => {
  return (
    <Row className={styles.tracks_wrap}>
      <Col md={1} className={styles.tracks_num}>
        {num + 1}
      </Col>
      <Col md={5} className={styles.tracks_title}>
        <div className={styles.tracks_img}>
          <img src={item.album.images[2].url} alt="" />
        </div>
        <div className={styles.tracks_info}>
          <div className={styles.tracks_track}>{item.name}</div>
          <span>{item.artists[0].name}</span>
        </div>
      </Col>
      <Col md={4}>
        <span className={styles.tracks_album}>{item.album.name}</span>
      </Col>
      <Col md={2} className={styles.tracks_time}>
        {parseInt(item.duration_ms / 1000 / 60)}:
        {parseInt((item.duration_ms / 1000) % 60) + 1 < 10
          ? "0" + (parseInt((item.duration_ms / 1000) % 60) + 1)
          : parseInt((item.duration_ms / 1000) % 60) + 1}
      </Col>
    </Row>
  );
};

export default TracksItem;