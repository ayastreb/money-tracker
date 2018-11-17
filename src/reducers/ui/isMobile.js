import { handleAction } from 'redux-actions';
import { windowResize } from '../../actions/ui/windowResize';

const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
export default handleAction(windowResize, isMobile, isMobile());
