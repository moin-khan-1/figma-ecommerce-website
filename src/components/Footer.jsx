function Footer() {
    return (
        <footer className="footer">

            {/* NEWSLETTER */}
            <div className="newsletter">

                <h2>
                    STAY UP TO DATE ABOUT
                    <br />
                    OUR LATEST OFFERS
                </h2>

                <div className="newsletter-form">

                    <input
                        type="email"
                        placeholder="Enter your email address"
                    />

                    <button>
                        Subscribe to Newsletter
                    </button>

                </div>

            </div>

            {/* FOOTER TOP */}
            <div className="footer-top">

                <div className="footer-brand">

                    <h2>SHOP.CO</h2>

                    <p>
                        We have clothes that suits your style and which you're proud
                        to wear. From women to men.
                    </p>

                    <div className="footer-socials">
                        ●　●　●　●
                    </div>

                </div>

                <div className="footer-column">

                    <h3>COMPANY</h3>

                    <a href="/">About</a>
                    <a href="/">Features</a>
                    <a href="/">Works</a>
                    <a href="/">Career</a>

                </div>

                <div className="footer-column">

                    <h3>HELP</h3>

                    <a href="/">Customer Support</a>
                    <a href="/">Delivery Details</a>
                    <a href="/">Terms & Conditions</a>
                    <a href="/">Privacy Policy</a>

                </div>

                <div className="footer-column">

                    <h3>FAQ</h3>

                    <a href="/">Account</a>
                    <a href="/">Manage Deliveries</a>
                    <a href="/">Orders</a>
                    <a href="/">Payments</a>

                </div>

            </div>

            {/* FOOTER BOTTOM */}
            <div className="footer-bottom">

                <p>
                    © 2026 SHOP.CO. All Rights Reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;