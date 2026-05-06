import React, { useState } from "react";
import { ContentWrapper, SectionWrapper } from "src/components/base";
import {
  BrowserWindow,
  BrowserWindowGradient,
} from "src/components/base/BrowserWindow";
import GlowText from "src/components/base/GlowText";
import { useDeviceSize } from "src/utils";
import { useWindowSize } from "src/utils";
import { mediaQueries } from "src/utils/responsive";
import styled, { useTheme } from "styled-components";

import { Heading1, LargeBody, LargeBodyBold, Heading3 } from "../../styles";

import { SDGs } from "./sdgData";

interface SDG {
  id: number;
  num: string;
  title: string;
  color: string;
  logoUrl: string;
  imageUrl: string;
  description: string;
  challenges: string[];
}

interface ImageWindowProps {
  gradientStartColor: string;
  gradientEndColor: string;
  source: string;
  orientation: string;
  top: string;
  left: string;
  order: number;
  alt: string;
}

interface TextWindowProps {
  gradientStartColor: string;
  gradientEndColor: string;
  sdgNum: string;
  sdgTitle: string;
  description: string;
  challenges: string[];
  top: string;
  left: string;
  order: number;
}

const ProblemStatements: React.FC = () => {
  const [selectedSDG, setSelectedSDG] = useState<SDG>(SDGs[0]);

  const theme = useTheme();
  const { windowWidth } = useWindowSize();
  const isMobile = windowWidth !== undefined && windowWidth <= 767;
  const isTablet = useDeviceSize("tablet");
  const isMedium = useDeviceSize("medium");

  const handleFolderClick = (sdg: SDG) => {
    setSelectedSDG(sdg);
  };

  const LogoWindow: React.FC<ImageWindowProps> = ({
    gradientStartColor,
    gradientEndColor,
    source,
    top,
    left,
    order,
    alt,
  }) => {
    return (
      <WindowAnimation top={top} left={left} order={order}>
        <BrowserWindow
          gradientStartColor={gradientStartColor}
          gradientEndColor={gradientEndColor}
        >
          <BrowserLogoContainer>
            <GradientOverlay
              gradientStartColor={gradientStartColor}
              gradientEndColor={gradientEndColor}
            />
            <BrowserLogo src={source} alt={alt} loading="lazy" />
          </BrowserLogoContainer>
        </BrowserWindow>
      </WindowAnimation>
    );
  };

  const PhotoWindow: React.FC<ImageWindowProps> = ({
    gradientStartColor,
    gradientEndColor,
    source,
    top,
    left,
    order,
    alt,
  }) => {
    return (
      <WindowAnimation top={top} left={left} order={order}>
        <BrowserWindow
          gradientStartColor={gradientStartColor}
          gradientEndColor={gradientEndColor}
        >
          <BrowserImageContainer>
            <GradientOverlay
              gradientStartColor={gradientStartColor}
              gradientEndColor={gradientEndColor}
            />
            <BrowserImage src={source} alt={alt} loading="lazy" />
          </BrowserImageContainer>
        </BrowserWindow>
      </WindowAnimation>
    );
  };

  const DescriptionWindow: React.FC<TextWindowProps> = ({
    gradientStartColor,
    gradientEndColor,
    sdgNum,
    sdgTitle,
    description,
    challenges,
    top,
    left,
    order,
  }) => {
    return (
      <TextWindowWrapper>
        <WindowAnimation top={top} left={left} order={order}>
          <BrowserWindowGradient
            gradientStartColor={gradientStartColor}
            gradientEndColor={gradientEndColor}
          >
            <BrowserTextContainer>
              <SDGHeader>
                <SDGNumber style={{ color: gradientStartColor }}>
                  {sdgNum}
                </SDGNumber>
                <div>
                  <SDGTitle style={{ color: theme.colors.text.dark.white }}>
                    {sdgTitle}
                  </SDGTitle>
                  <SDGDescription style={{ color: theme.colors.text.dark.gray }}>
                    {description}
                  </SDGDescription>
                </div>
              </SDGHeader>
              <ChallengesContainer>
                <ChallengeLabel style={{ color: theme.colors.text.dark.gray }}>
                  Challenge Statements:
                </ChallengeLabel>
                {challenges.map((challenge, idx) => (
                  <ChallengeItem key={idx} style={{ color: theme.colors.text.dark.gray }}>
                    • {challenge}
                  </ChallengeItem>
                ))}
              </ChallengesContainer>
            </BrowserTextContainer>
          </BrowserWindowGradient>
        </WindowAnimation>
      </TextWindowWrapper>
    );
  };
      </TextWindowWrapper>
    );
  };

  return (
    <StyledSectionWrapper>
      <ContentWrapper>
        <HeadingContainer>
          <StyledHeading1>
            Explore the{" "}
            <GlowText color={selectedSDG.color}>UN Sustainable Development Goals</GlowText>
          </StyledHeading1>
        </HeadingContainer>
        <SubHeadingContainer>
          <SubHeading>
            Click on any goal to see the challenges we&apos;re tackling to make
            a global impact by 2030.
          </SubHeading>
        </SubHeadingContainer>
        <ContentContainer>
          <SDGFolderContainer>
            <GlassmorphismPanel />
            {SDGs.map((sdg, index) => {
              return (
                <SDGFolderWrapper
                  key={sdg.id}
                  onClick={() => handleFolderClick(sdg)}
                  isSelected={selectedSDG.id === sdg.id}
                  sdgColor={sdg.color}
                >
                  <SDGFolderIcon>
                    <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none">
                      <path
                        d="M30 40L170 40Q180 40 180 50L180 170Q180 180 170 180L30 180Q20 180 20 170L20 50Q20 40 30 40Z"
                        fill={sdg.color}
                        opacity="0.2"
                        stroke={sdg.color}
                        strokeWidth="2"
                      />
                      <text
                        x="100"
                        y="120"
                        textAnchor="middle"
                        fontSize="60"
                        fontWeight="bold"
                        fill={sdg.color}
                      >
                        {sdg.num}
                      </text>
                    </svg>
                  </SDGFolderIcon>
                  <SDGFolderLabel>{sdg.title}</SDGFolderLabel>
                </SDGFolderWrapper>
              );
            })}
          </SDGFolderContainer>

          <WindowContainer>
            <DescriptionWindow
              gradientStartColor={selectedSDG.color}
              gradientEndColor={selectedSDG.color}
              sdgNum={selectedSDG.num}
              sdgTitle={selectedSDG.title}
              description={selectedSDG.description}
              challenges={selectedSDG.challenges}
              top="80px"
              left="200px"
              order={2}
            />
            <LogoWindow
              gradientStartColor={selectedSDG.color}
              gradientEndColor={selectedSDG.color}
              source={selectedSDG.logoUrl}
              orientation="square"
              top="0px"
              left="0px"
              order={0}
              alt={`SDG ${selectedSDG.num}: ${selectedSDG.title}`}
            />
            <PhotoWindow
              gradientStartColor={selectedSDG.color}
              gradientEndColor={selectedSDG.color}
              source={selectedSDG.imageUrl}
              orientation="horizontal"
              top="280px"
              left="100px"
              order={1}
              alt={`Real-world image for SDG ${selectedSDG.num}`}
            />
          </WindowContainer>
        </ContentContainer>
      </ContentWrapper>
    </StyledSectionWrapper>
  );
};

const StyledSectionWrapper = styled(SectionWrapper)`
  margin-bottom: 150px;
  ${mediaQueries.medium} {
    margin-bottom: 125px;
  }
  ${mediaQueries.tablet} {
    margin-top: 48px;
    margin-bottom: 100px;
    max-width: 774.5px;
  }
  @media screen and (min-width: 425px) and (max-width: 767px) {
    margin-bottom: 750px;
  }
  ${mediaQueries.largeMobile} {
    margin-bottom: 750px;
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.dark.white};
  margin-bottom: 24px;
  ${mediaQueries.tablet} {
    margin-bottom: 12px;
  }
`;

const StyledHeading1 = styled(Heading1)`
  text-align: center;
  ${mediaQueries.tablet} {
    font-size: 48px;
  }
  ${mediaQueries.largeMobile} {
    font-size: 24px;
  }
`;

const SubHeadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SubHeading = styled(LargeBody)`
  text-align: center;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.text.dark.gray};
  ${mediaQueries.tablet} {
    font-size: 20px;
  }
  @media screen and (min-width: 600px) and (max-width: 767px) {
    max-width: 500px;
  }
  @media screen and (min-width: 425px) and (max-width: 600px) {
    max-width: 358px;
  }
  ${mediaQueries.largeMobile} {
    font-size: 16px;
    max-width: 358px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 94px;
  margin-top: 56px;
  padding: 140px 0;
  @media screen and (min-width: 1065px) and (max-width: 1220px) {
    gap: 29px;
    padding: 140px 20px;
  }
  @media screen and (min-width: 1025px) and (max-width: 1065px) {
    gap: 10px;
    padding: 140px 10px;
  }
  @media screen and (min-width: 980px) and (max-width: 1025px) {
    gap: 94px;
    padding: 140px 0px 140px 45px;
  }
  @media screen and (min-width: 900px) and (max-width: 980px) {
    gap: 65px;
    padding: 140px 0px 140px 20px;
  }
  @media screen and (min-width: 834px) and (max-width: 900px) {
    gap: 34px;
    padding: 140px 0;
  }
  ${mediaQueries.tablet} {
    gap: 29px;
  }
  @media screen and (min-width: 425px) and (max-width: 767px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    padding: 0;
  }
  ${mediaQueries.largeMobile} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    padding: 0;
  }
`;

const WindowContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
`;

const SDGFolderContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 32px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  min-width: 500px;
  
  ${mediaQueries.tablet} {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    padding: 24px;
    min-width: 100%;
  }
  
  ${mediaQueries.largeMobile} {
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    padding: 16px;
  }
`;

const GlassmorphismPanel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: -1;
`;

interface SDGFolderWrapperProps {
  isSelected: boolean;
  sdgColor: string;
}

const SDGFolderWrapper = styled.div<SDGFolderWrapperProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 12px;
  border-radius: 12px;
  
  ${(props) =>
    props.isSelected
      ? `
    background: ${props.sdgColor}20;
    border: 2px solid ${props.sdgColor};
    transform: scale(1.05);
  `
      : `
    border: 1px solid transparent;
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: scale(1.02);
    }
  `}
`;

const SDGFolderIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${mediaQueries.tablet} {
    width: 60px;
    height: 60px;
  }
  
  ${mediaQueries.largeMobile} {
    width: 48px;
    height: 48px;
  }
`;

const SDGFolderLabel = styled(LargeBodyBold)`
  font-size: 13px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.dark.white};
  line-height: 16px;
  word-break: break-word;
  max-width: 100px;
  
  ${mediaQueries.tablet} {
    font-size: 11px;
    max-width: 80px;
  }
  
  ${mediaQueries.largeMobile} {
    font-size: 10px;
    max-width: 60px;
  }
`;

const TextWindowWrapper = styled.div`
  position: absolute;
  z-index: 10;
`;

const WindowAnimation = styled.div<PositionProps>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: scale(0);
  animation: scaleUp 0.9s 1 forwards;
  animation-delay: ${(props) => `${props.order * 0.3}s`};
  z-index: ${(props) => props.order};

  @keyframes scaleUp {
    0% {
      transform: scale(0);
    }
    70% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const BrowserTextContainer = styled.div`
  position: relative;
  width: 380px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 2;
  
  ${mediaQueries.medium} {
    width: 300px;
    padding: 24px;
  }
`;

const SDGHeader = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

const SDGNumber = styled.div`
  font-size: 48px;
  font-weight: bold;
  min-width: 80px;
  text-align: center;
`;

const SDGTitle = styled.div`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const SDGDescription = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const ChallengesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ChallengeLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const ChallengeItem = styled.div`
  font-size: 12px;
  line-height: 16px;
  padding-left: 12px;
`;

const BrowserLogoContainer = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
`;

const BrowserImageContainer = styled.div`
  position: relative;
  width: 360px;
  height: 240px;
  
  ${mediaQueries.medium} {
    width: 280px;
    height: 180px;
  }
`;

const BrowserLogo = styled.img`
  width: 180px;
  height: 180px;
  object-fit: contain;
`;

const BrowserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GradientOverlay = styled.div<GradientProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${(props) => props.gradientStartColor}20,
    ${(props) => props.gradientEndColor}10
  );
  opacity: 0.4;
  z-index: 1;
`;

export default ProblemStatements;
