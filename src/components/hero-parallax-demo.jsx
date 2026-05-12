"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export default function HeroParallaxDemo() {
  return <HeroParallax products={products} />;
}

import img1 from '../assets/highlights/highlights_image/1.43dc2821.jpg';
import img2 from '../assets/highlights/highlights_image/2.e469fb9b.jpg';
import img3 from '../assets/highlights/highlights_image/3.e749f717.jpg';
import img4 from '../assets/highlights/highlights_image/4.cbc9ea42.jpg';
import img5 from '../assets/highlights/highlights_image/5.c3a66f7c.jpg';
import img6 from '../assets/highlights/highlights_image/6.abb4ca67.png';
import img7 from '../assets/highlights/highlights_image/7.fed70ace.jpg';
import img8 from '../assets/highlights/highlights_image/8.87b1a289.jpg';
import img9 from '../assets/highlights/highlights_image/9.06cd791e.jpg';
import img10 from '../assets/highlights/highlights_image/10.06cd791e.jpg';
import img11 from '../assets/highlights/highlights_image/14.219de32f.jpg';
import img12 from '../assets/highlights/highlights_image/15.cbc9ea42.jpg';
import img13 from '../assets/highlights/highlights_image/16.139bb70b.jpg';
import img14 from '../assets/highlights/highlights_image/17.61e3fd83.jpg';
import img15 from '../assets/highlights/highlights_image/18.9eaefeb3.jpg';

export const products = [
  { title: "AI Integration", thumbnail: img1 },
  { title: "Machine Learning", thumbnail: img2 },
  { title: "Cloud Architecture", thumbnail: img3 },
  { title: "Neural Networks", thumbnail: img4 },
  { title: "Quantum Computing", thumbnail: img5 },
  { title: "Data Analytics", thumbnail: img6 },
  { title: "Cybersecurity", thumbnail: img7 },
  { title: "Blockchain Tech", thumbnail: img8 },
  { title: "IoT Devices", thumbnail: img9 },
  { title: "Edge Computing", thumbnail: img10 },
  { title: "Robotics", thumbnail: img11 },
  { title: "Virtual Reality", thumbnail: img12 },
  { title: "Augmented Reality", thumbnail: img13 },
  { title: "Deep Learning", thumbnail: img14 },
  { title: "5G Networks", thumbnail: img15 },
];

