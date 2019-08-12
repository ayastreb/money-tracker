import React from 'react';
import PropTypes from 'prop-types';
import { Button, Message } from 'semantic-ui-react';
import './index.css';
import {save} from 'save-file';
import TransactionsStorage from '../../util/storage/transactions';

class DataExport extends React.Component {

  handleSaveFile = async () => {
    let transactions = await TransactionsStorage.getAll();
    save(JSON.stringify(transactions), JSON.stringify(new Date(Date.now())) + '_export.json');
  }

  render() {
    return (
      <div className="mt-dataExport">
        <p>Export transactions to a JSON file.</p>
        {this.props.error && (
          <Message
            error
            icon="warning circle"
            header="Failed to Export"
            content={this.props.error}
          />
        )}
        {!this.props.isFileSelected && (
          <React.Fragment>
            <Button
              content="Export JSON File"
              icon="file text"
              onClick={this.handleSaveFile}
            />            
          </React.Fragment>
        )}
      </div>
    );
  }
}

DataExport.propTypes = {
  error: PropTypes.string
};

export default DataExport;
