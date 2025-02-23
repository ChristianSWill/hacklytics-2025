import React from "react";

const Disclaimer = () => {
  return (
    <div className="disclaimer">
      <h2>
        Disclaimer: This is only a predictive model and not meant to replace
        your doctor! In fact, some of the questions ask for information that you
        have to go to the doctor to find out about. This is a Random Forest
        Regression on three different datasets that we used in order to come up
        with these numbers. Please go to the doctor, or STAMPS, or like...
        somewhere that is actually medically certified if you are suspecting you
        might be at risk of any of these.
      </h2>
    </div>
  );
};

export default Disclaimer;
