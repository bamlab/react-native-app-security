import * as React from 'react';

import { RNASViewProps } from './RNAS.types';

export default function RNASView(props: RNASViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
