import React from "react";

const Errorpage = () => {
  return (
    <>
      <main>
        <div>
          <div class="container">
            <div class="wrapper">
              <div class="title">
                <span>404 ERROR</span>
              </div>
              <form action="#">
                <div class="signup-link">
                  <h1>OOPS! PAGE NOT FOUND</h1>
                  <h5>Sorry, Page you are looking for doesn't exist</h5>
                </div>
                <div class="signup-link">
                  return to <a href="/">Homepage</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Errorpage;
