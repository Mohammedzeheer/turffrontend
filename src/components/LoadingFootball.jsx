import React from 'react';
import './loading.css'

function LoadingFootball() {

    const styles = {
        html: {
          height: '100%',
        },
        body: {
          height: '100%',
        },
        box: {
          margin: '0 auto',
          width: '40px',
          height: '140px',
          // border: 'solid 1px black',
          position: 'relative',
        },
        shadow: {
          position: 'absolute',
          width: '100%',
          height: '10px',
          backgroundColor: 'grey',
          bottom: '0',
          borderRadius: '100%',
          transform: 'scaleX(.8)',
          opacity: '.6',
          animation: 'shadowScale 1s linear infinite',
        },
        gravity: {
          width: '40px',
          height: '40px',
          animation: 'bounce 1s cubic-bezier(0.68, 0.35, 0.29, 0.54) infinite',
        },
        ball: {
          width: '40px',
          height: '40px',
          backgroundImage: 'url("https://cdn2.iconfinder.com/data/icons/activity-5/50/26BD-soccer-ball-128.png")',
          backgroundSize: 'cover',
          animation: 'roll .7s linear infinite',
        },
        '@keyframes roll': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      
        '@keyframes bounce': {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(100px)' },
          '100%': { transform: 'translateY(0)' },
        },
      
        '@keyframes shadowScale': {
          '0%': { transform: 'scaleX(1)', opacity: '0.6' },
          '50%': { transform: 'scaleX(0.8)', opacity: '0.8' },
          '100%': { transform: 'scaleX(1)', opacity: '0.6' },
        },
      };

  return (
    <div>
    {/* <div style={styles.box}>
      <div style={styles.shadow}></div>
      <div style={styles.gravity}>
        <div style={styles.ball}></div>
      </div>
    </div> */}
    <div className="box">
  <div className="shadow"></div>
  <div className="gravity">
    <div className="ball"></div>
  </div>
</div>
  </div>
  );
}



export default LoadingFootball;
