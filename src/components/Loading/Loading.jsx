import React from 'react';
import "./Loading.scss"
import { DotsLoader } from '../Loader/DotsLoader';

export const Loading = () => {
  return (
    <div className="loading">
      <DotsLoader />
    </div>
  )
}
