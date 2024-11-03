import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { color } from 'chart.js/helpers';
const LandingPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNavigate = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/createspace');
    }, 500);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="absolute inset-0 bg-repeat opacity-15 -z-10"
        style={{
          backgroundImage: "url('/src/assets/bgimagee.jpg')",
          backgroundSize: '300px 300px',
        }}
      ></div>
      <div className="flex flex-1 justify-center items-center">
        <div className="container card xl:px-32 2xl:px-64">
          <div className="px-6 md:px-16 lg:px-48">
            <div className="card-content flex flex-col justify-center items-center bg-white  px-12 rounded-2xl shadow-2xl border border-gray-900">
              <div className="upperText flex flex-col justify-center items-center py-2 sm:py-6">
                <div className="title sm:pb-2">
                  <p className="text-black text-lg sm:text-3xl font-bold font-mono">
                    Welcome To Rater
                  </p>
                </div>
                <p className="subTitle text-xs sm:text-md md:text-lg 2xl:text-lg text-gray-500 font-mono text-center">
                  Rate, collaborate, and grow together with your friends
                </p>
              </div>
              <div className="Icon pb-2 sm:pb-6">
                <Icon
                  icon="mynaui:star-solid"
                  className="text-4xl sm:text-6xl"
                  style={{ color: 'gray' }}
                />
              </div>
              <p className="subTitle text-xs sm:text-md md:text-lg 2xl:text-lg text-center text-gray-500 font-mono">
                Rater is an innovative platform for friend groups to evaluate
                each other's performance in various activities, from football
                matches to gaming sessions.
              </p>
              <div className="buttons pt-2 pb-2 sm:pt-6">
                <button
                  type="button"
                  onClick={handleNavigate}
                  className="text-white font-mono bg-gradient-to-br from-blue-950 to-black focus:outline-none font-medium rounded-lg text-xs sm:text-sm w-32 sm:w-40 h-10 sm:h-12 text-center me-2 mb-2"
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Create Space'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
