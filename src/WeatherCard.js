import React from "react";
// 載入 emotion 的 styled 套件
import styled from "@emotion/styled";
//載入 WeatherIcon
import WeatherIcon from "./WeatherIcon.js";
//載入dayjs
import dayjs from "dayjs";
// 載入FontAwesome圖示
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faUmbrella,
  faTemperatureFull,
  faSun,
  faLocationDot,
  faMoon
} from "@fortawesome/free-solid-svg-icons";

const WeatherCardWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`;

// 在兩個反引號中放入該 Component 的 CSS 樣式，頁首
const Header = styled.div`
  margin-bottom: 10px;
  .icons {
    width: 15px;
    height: 15px;
    position: absolute;
    right: 15px;
    cursor: pointer;
    color: #6d8299;
  }
`;

const Location = styled.div`
  font-size: 60px;
  font-weight: bold;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 10px;
  text-align: center;
  .icons {
    cursor: pointer;
    margin-right: 10px;
  }
  .icons:hover {
    color: #3db2ff;
  }
`;

const Description = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  margin-bottom: 15px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 15px;
`;

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const CurrentInfo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 15px;
`;

const Rain = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 20px;
  font-weight: 300;
  display: flex;
  .icons {
    width: 20px;
    height: 20px;
    color: #3db2ff;
  }
`;
const Distribution = styled.div`
  font-weight: normal;
  font-size: 20px;
  display: flex;
  color: ${({ theme }) => theme.textColor};
  .icons {
    width: 20px;
    height: 20px;
    color: #ff2442;
  }
`;
const UV = styled.div`
  font-weight: normal;
  font-size: 20px;
  display: flex;
  color: ${({ theme }) => theme.textColor};
  .icons {
    width: 20px;
    height: 20px;
    color: #ffb830;
  }
`;

const UpdataTime = styled.div`
  text-align: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
`;

const WeatherCard = (props) => {
  const { weatherElement, moment, fetchData, setCurrentPage, cityName } = props;
  const {
    observationTime,
    temperature,
    minTemperature,
    maxTemperature,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    uvi
  } = weatherElement;

  return (
    <WeatherCardWrapper>
      <Header>
        <FontAwesomeIcon
          icon={faArrowsRotate}
          className="icons"
          onClick={fetchData}
        ></FontAwesomeIcon>
      </Header>
      <Location>
        <FontAwesomeIcon
          icon={faLocationDot}
          className="icons"
          onClick={() => setCurrentPage("WeatherSetting")}
        ></FontAwesomeIcon>
        {cityName}
      </Location>
      <Description>
        {description} {comfortability}
      </Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(temperature)} <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon
          currentWeatherCode={weatherCode}
          moment={moment || "day"}
        />
      </CurrentWeather>
      <CurrentInfo>
        <Rain>
          <FontAwesomeIcon
            icon={faUmbrella}
            className="icons"
            pull="left"
          ></FontAwesomeIcon>
          {Math.round(rainPossibility)}%
        </Rain>
        <Distribution>
          <FontAwesomeIcon
            icon={faTemperatureFull}
            className="icons"
            pull="left"
          ></FontAwesomeIcon>
          {Math.round(minTemperature)}-{Math.round(maxTemperature)}
        </Distribution>
        <UV>
          <FontAwesomeIcon
            icon={faSun}
            className="icons"
            pull="left"
          ></FontAwesomeIcon>
          {Math.round(uvi)}
        </UV>
      </CurrentInfo>
      <UpdataTime>
        最後更新時間:
        {new Intl.DateTimeFormat("zh-TW", {
          hour: "numeric",
          minute: "numeric"
        }).format(dayjs(observationTime))}{" "}
      </UpdataTime>
    </WeatherCardWrapper>
  );
};

export default WeatherCard;
