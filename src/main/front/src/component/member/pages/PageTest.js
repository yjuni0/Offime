import { Link } from 'react-router-dom';
import Menu from './Menu';

function PageTest() {
    return (
        <section className="sec">
            <div className="inner">
                <div className="item">
                    <Link to={'/menu'}>메뉴</Link>
                </div>
            </div>
        </section>
    );
}
export default PageTest;
