import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getallwatchlater } from '../../actions/watchlater';
import WHL from '../../Components/WHL/WHL';

const Watchlater = () => {

  const watchlatervideolist = useSelector((state) => state.watchlaterreducer);

  return (
    <WHL page={"Watch Later"} videolist={{ data: watchlatervideolist.data }} />
  );
};

export default Watchlater;
