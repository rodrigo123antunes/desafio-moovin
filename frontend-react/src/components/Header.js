import React from 'react'
import './Header.scss';

const Header = () => {
	const logoMoovin =
		'https://www.moovin.com.br/assets/images/svg/logo2.svg';

	return (
		<div className="header-app">
            <img src={logoMoovin} alt="logo" width="100" />
        </div>
	)
}

export default Header
