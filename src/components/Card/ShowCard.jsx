import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getPosts } from "../../api/posts";
import {
  CardContainer,
  Image,
  CircularCard,
  InfoContainer,
  Name,
  Species,
} from "./Card_Style";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Adopt from "../Adopt/Adopt";

function ShowCard() {
  const { isLoading, isError, data } = useQuery("Post", getPosts);
  const cardRef = useRef([]);
  const [showCardSection, setShowCardSection] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = () => {
      const adoptSectionHeight =
        document.getElementById("adopt-section").offsetHeight;
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition + windowHeight >= adoptSectionHeight) {
        setShowCardSection(true);
      } else {
        setShowCardSection(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showCardSection) {
      cardRef.current.forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
            onEnter: () => {
              gsap.to(card, { opacity: 1 });
            },
          },
        });
      });
    }
  }, [showCardSection]);

  if (isLoading) {
    return <h1>로딩중입니다....</h1>;
  }

  if (isError) {
    return <h1>오류가 발생했습니다....</h1>;
  }

  return (
    <>
      <div id="adopt-section">
        <Adopt />
      </div>
      <CardContainer>
        {data.map((post, index) => (
          <Link
            to={`/detail/${post.id}`}
            key={post.id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CircularCard ref={(el) => (cardRef.current[index] = el)}>
              <Image src={post.imageUrl} alt="Post Image" />
            </CircularCard>
            <br />
            <InfoContainer>
              <Name>{post.name}</Name>
              <Species>{post.species}</Species>
            </InfoContainer>
          </Link>
        ))}
        <div id="test"></div>
      </CardContainer>
    </>
  );
}

export default ShowCard;
