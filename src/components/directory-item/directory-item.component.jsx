import { useNavigate } from 'react-router-dom';
import {BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles.jsx'

export default function DirectoryItem({ title, imageUrl, route }) {
  const navigate = useNavigate();

  function onNavigateHandler() {
    navigate(route);
  }
    return(
        <DirectoryItemContainer onClick={onNavigateHandler}>
          <BackgroundImage imageUrl={imageUrl} />
          <Body>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
        </DirectoryItemContainer>
    );
}