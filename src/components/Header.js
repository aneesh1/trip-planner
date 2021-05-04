import { Link } from 'react-router-dom';

import './Header.css';

const HeaderLink = ({ displayName, page }) => {
    const title = displayName;
    
    return <Link to={`/${page}`} className="headerlink-title">{title}</Link>;
};

const Header = () => {
    return (
        <div className="full-header">
            <div className="logo">
                <h1>Plan My Trip</h1>
            </div>
            <div className='nav-links'>
                <HeaderLink displayName="How it Works" page='HowItWorks' />
                <HeaderLink displayName="Try It" page='TryIt' />
            </div>
            <div className="empty"></div>
        </div>
        
    );
  };
  
  export { Header, HeaderLink };