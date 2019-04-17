import * as React from 'react';


class MapPlayer extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  public render()  {
    return (
          <g id="surface1">
            <path
              style={{
                fill: "rgb(0%,0%,0%)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
                transformOrigin: "50% 50%"

              }}
              d="M 123.820312 188.976562 L 63.808594 171.96875 L 5.316406 188.597656 L 0 184.441406 L 60.390625 0.0234375 L 67.226562 0.0234375 L 128 185.195312 L 123.820312 188.976562 M 106.351562 168.191406 L 63.808594 39.324219 L 21.648438 168.191406 L 63.808594 155.71875 L 106.351562 168.191406 " />
            <path
              style={{
                fill: "rgb(100%,100%,100%)",
                fillOpacity: 1,
                fillRule: "nonzero",
                stroke: "none",
                transformOrigin: "50% 50%"

              }}
              d="M 106.351562 168.191406 L 63.808594 155.71875 L 21.648438 168.191406 L 63.808594 39.324219 L 106.351562 168.191406 " />
          </g>
    )
  }
}

export default MapPlayer;
