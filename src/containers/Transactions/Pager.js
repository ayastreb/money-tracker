import { connect } from 'react-redux'
import Pager from '../../components/Transaction/List/Pager'
import { changeFilterPage } from '../../actions/ui/transaction/filter'
import { getPage, getVisiblePages } from '../../selectors/ui/transaction/filter'

const mapStateToProps = state => ({
  page: getPage(state),
  pages: getVisiblePages(state)
})

export default connect(mapStateToProps, { changeFilterPage })(Pager)
