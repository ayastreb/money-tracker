import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'semantic-ui-react';

class Pager extends React.Component {
  handlePageChange = nextPage => () => this.props.changeFilterPage(nextPage);

  handlePrevClick = () => {
    if (this.props.page > 0) {
      this.props.changeFilterPage(this.props.page - 1);
    }
  };

  handleNextClick = () => {
    const lastPage = this.props.pages[this.props.pages.length - 1];
    if (this.props.page < lastPage) {
      this.props.changeFilterPage(this.props.page + 1);
    }
  };

  render() {
    if (this.props.pages.length < 2) return null;

    return (
      <div className="transactions-list-pager">
        <Menu pagination>
          <Menu.Item as="a" icon onClick={this.handlePrevClick}>
            <Icon name="left chevron" />
          </Menu.Item>
          {this.props.pages.map(page => (
            <Menu.Item
              as="a"
              key={page}
              active={page === this.props.page}
              onClick={this.handlePageChange(page)}
            >
              {page + 1}
            </Menu.Item>
          ))}
          <Menu.Item as="a" icon onClick={this.handleNextClick}>
            <Icon name="right chevron" />
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

Pager.propTypes = {
  page: PropTypes.number,
  pages: PropTypes.arrayOf(PropTypes.number),
  changeFilterPage: PropTypes.func
};

export default Pager;
