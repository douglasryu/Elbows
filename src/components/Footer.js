import React from "react";
import GitHubIcon from '@material-ui/icons/GitHub';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__section0">
                <div className="footer__section-header">Created by:
                    <a href="https://github.com/douglasryu" className="footer__section-item">Douglas Ryu <GitHubIcon className="footer__github" style={{ fontSize: 20 }} /></a>
                </div>
            </div>
            <div className="footer__section1">
                <div className="footer__section-header">Portfolio</div>
                <a href="https://douglasryu.github.io/" className="footer__section-item">Visit my Website</a>
            </div>
            <div className="footer__section2">
                <div className="footer__section-header">Projects</div>
                <a href="https://elbowsapp.herokuapp.com/" className="footer__section-item">Elbows</a>
                <a href="https://rockinhood.herokuapp.com/" className="footer__section-item">Rockinhood</a>
                <a href="https://aa-flash-app.herokuapp.com/" className="footer__section-item footer__flash">Flash</a>
            </div>
        </div>
    );
}

export default Footer;