import { useEffect } from "react";
import styled from "styled-components";
import { centerBox, columnBox } from "../styles";

const coord = [37.5082633, 127.0396983];
let mapInstance: naver.maps.Map | null = null;

const MapArea = () => {
  useEffect(() => {
    initMap();
  }, []);

  const initMap = () => {
    mapInstance = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(coord[0], coord[1]),
      zoom: 15,
    });

    new naver.maps.Marker({
      position: new naver.maps.LatLng(coord[0], coord[1]),
      map: mapInstance,
    });
  };
  return (
    <ComponentWrapper>
      <h2>오시는 길</h2>
      <span>
        서울 강남구 언주로 564 라움아트센터
        <br />
        (역삼동 680-1)
      </span>
      <MapContainer id="map" />
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  ${columnBox}
  ${centerBox}
  width: 100%;
  height: 100vh;
  color: black;
  gap: 1rem;
  text-align: center;
`;

const MapContainer = styled.div`
  width: 90%;
  height: 40vh;
  border: 3px solid var(--secondary-gold);
`;

export default MapArea;
