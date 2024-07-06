import React, { Component } from 'react';

interface Props {
  results: { [key: string]: string | number | string[] }[];
}

class ResultsComponent extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <div>
        {this.props.results.map((result, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
            <h3>{result.name || result.title}</h3>
            <div>
              {Object.entries(result).map(([key, value]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{key}:</span>
                  <span>{typeof value === 'string' ? value : Array.isArray(value) ? value.join(', ') : value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ResultsComponent;
