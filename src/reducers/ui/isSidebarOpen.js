import { handleAction } from 'redux-actions'
import { toggleSidebar } from '../../actions/ui/sidebar'

export default handleAction(toggleSidebar, state => !state, false)
