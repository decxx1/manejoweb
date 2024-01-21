import { useState } from 'react';
import '../styles/botonera.css';

const detectIsMobile = () => {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
  };

function MyComponent() {
  const [showChatButtons, setShowChatButtons] = useState(false);
  const [showFbChat, setShowFbChat] = useState(false);

  const handleMainButtonClick = () => {
    setShowChatButtons(!showChatButtons);
  };

  const handleMsnClick = () => {
    setShowFbChat(true);
  };

  const handleFbChatCloseClick = () => {
    setShowFbChat(false);
  };

  const isMobile = detectIsMobile();

  return (
    <div className="wrapper">
      <div id="main-div">
        <div
          id="main-button"
          className={`tooltip--left wave ${showChatButtons ? 'open' : ''}`}
          data-tooltip="Escríbanos"
          onClick={handleMainButtonClick}
        >
          <i className={`fas ${showChatButtons ? 'fa-times' : 'fa-comments'}`}></i>
        </div>
        <a
            target="_blank"
            href="https://wa.me/542612455960"
            className="tooltip--left whatsapp-color"
            data-tooltip="WhatsApp"
        >
            <i className="fab fa-whatsapp"></i>
        </a>
        {!isMobile && (
            <a
            id="msn"
            className="tooltip--left messenger-color"
            data-tooltip="Facebook"
            onClick={handleMsnClick}
            >
            <i className="fab fa-facebook-messenger"></i>
            </a>
        )}
        {isMobile && (
            <a
                id='msncel'
                href='https://m.me/MarGocomunicacion'
                className='tooltip--left messenger-color'
                data-tooltip='Facebook'
                target='_blank'
            >
                <i className='fab fa-facebook-messenger'></i>
            </a>
        )}
         
        {!isMobile && showFbChat && (
          <div id="fb-chat" className={showFbChat ? 'active' : ''}>
            <div className="close" onClick={handleFbChatCloseClick}>
              X
            </div>
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FMarGocomunicacion&tabs=messages&width=340&height=331&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=160649695194253"
              width="340"
              height="271"
              style={{ border: 'none', overflow: 'hidden' }}
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyComponent;