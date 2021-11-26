import React from 'react';
import privacy1 from '../assets/images/privacy1.jpg';
import privacy2 from '../assets/images/privacy2.jpg';
import download from '../assets/images/download.png';

import '../style.css';

const Privacy = () => {
    return (
        <React.Fragment>
   

   <div class="row">
       <div class="column">
           <img className='privacy' src={privacy1} />
           <img className='privacy' src={privacy2} />
           <div> Click Here To Download Privacy Policy: <a href=" "><img className='download' src={download} /> </a> </div>
        </div> 
    </div>

        </React.Fragment>
    );
};

export default Privacy;