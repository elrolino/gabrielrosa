import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 30px 0; // Add margin-bottom here
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const StyledCaption = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  font-size: 2em;
  color: white;
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  &:hover ${StyledCaption} {
    opacity: 1;
  }

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const skills = ['HTML/CSS', 'Figma', 'React', 'InDesign', 'WordPress', 'Photoshop'];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2>About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              With a background in the printing and service industries, I’ve worked on
              consumer-facing products for companies like Sonae, Renault, and Jerónimo Martins.
              While completing my bachelor’s in Multimedia and Communication Technologies, I became
              deeply interested in Human-Computer Interaction — especially UX and Cognitive Science.
              <p>
                Now, I’m exploring how digital product design and service design can come together
                to create more thoughtful, human-centered systems.{' '}
              </p>
              <p>
                I also freelance as a video editor and copywriter, and contribute as a volunteer
                proofreader for{' '}
                <a href="https://www.getdailyart.com/" target="_blank" rel="noopener noreferrer">
                  DailyArt
                </a>{' '}
                .
              </p>
            </p>
            <p>Here are a few technologies and tools I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
          <p>
            When I’m not online I'll usually be either reading, doing some exercise outside or at
            the gym, going to music shows, hanging out with my friends or just enjoying a lovely
            garden 🏡.
          </p>
          <p>
            By the way, add me on{' '}
            <a href="https://www.last.fm/user/eisteis" target="_blank" rel="noopener noreferrer">
              Last.fm
            </a>{' '}
            :)
          </p>
        </StyledText>

        <StyledPic>
          {/* <StyledCaption>This is .me</StyledCaption> */}
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
