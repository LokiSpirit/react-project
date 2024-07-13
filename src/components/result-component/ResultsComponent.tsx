/* import React, { Component } from 'react';
import styles from './resultComponent.module.css';

type Props = {
  results: { [key: string]: string | number | string[] }[];
};

class ResultsComponent extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <>
        {this.props.results.map((result, index) => (
          <div className={styles.card} key={index}>
            <h3 className={styles.title}>{result.name || result.title}</h3>
            <div>
              {Object.entries(result)
                .slice(1)
                .map(([key, value]) => (
                  <div key={key} className={styles.row}>
                    <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{key}:</span>
                    <span>{typeof value === 'string' ? value : Array.isArray(value) ? value.join(', ') : value}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default ResultsComponent; */

import React from 'react';
import styles from './resultComponent.module.css';

type Props = {
  results: { [key: string]: string | number | string[] }[];
};

const ResultsComponent: React.FC<Props> = ({ results }) => {
  return (
    <>
      {results.map((result, index) => (
        <div className={styles.card} key={index}>
          <h3 className={styles.title}>{result.name || result.title}</h3>
          <div>
            {Object.entries(result)
              .slice(1)
              .map(([key, value]) => (
                <div key={key} className={styles.row}>
                  <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{key}:</span>
                  <span>{typeof value === 'string' ? value : Array.isArray(value) ? value.join(', ') : value}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default ResultsComponent;
