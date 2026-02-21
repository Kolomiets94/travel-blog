import React from "react";
import "./Hero.scss";

interface HeroProps {
  title: string;
  height?: number;
}

const Hero: React.FC<HeroProps> = ({ title, height = 251 }) => {
  return (
    <section
      className="hero"
      style={{
        height,
        backgroundImage: `url('/assets/images/hero-bg.jpg')`,
      }}
    >
      <div className="hero__overlay"></div>
      <h1 className="hero__title">{title}</h1>
    </section>
  );
};

export default Hero;
