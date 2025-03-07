const ForbiddenPage = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Press+Start+2P');

        /* Global Styles */
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background: black;
        }

        * {
          font-family: 'Press Start 2P', cursive;
          box-sizing: border-box;
        }

        /* Container */
        #app {
          padding: 1rem;
          display: flex;
          height: 100vh;
          justify-content: center;
          align-items: center;
          color: #54FE55;
          text-shadow: 0px 0px 10px #54FE55;
          font-size: 6rem;
          flex-direction: column;
        }

        /* Text */
        .txt {
          font-size: 1.8rem;
        }

        /* Blinking Animation */
        @keyframes blink {
          0%, 49% { opacity: 0; }
          50%, 100% { opacity: 1; }
        }

        .blink {
          animation: blink 1s infinite;
        }
      `}</style>

      {/* HTML Structure */}
      <div id="app">
        <div>403</div>
        <div className="txt">
          Forbidden<span className="blink">_</span>
        </div>
      </div>
    </>
  );
};

export default ForbiddenPage;
