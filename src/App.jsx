import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>

            <p>
              Browse through our diverse range of carefully crafted garments
              designed to bring out your individuality.
            </p>

            <button className="shop-button">Shop Now</button>

            <div className="stats">
              <div>
                <h3>200+</h3>
                <p>International Brands</p>
              </div>

              <div>
                <h3>2,000+</h3>
                <p>High-Quality Products</p>
              </div>

              <div>
                <h3>30,000+</h3>
                <p>Happy Customers</p>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
              alt="Fashion"
            />
          </div>
        </section>

        <section className="brands">
          <h2>VERSACE</h2>
          <h2>ZARA</h2>
          <h2>GUCCI</h2>
          <h2>PRADA</h2>
          <h2>Calvin Klein</h2>
        </section>

        <section className="section">
          <h2>NEW ARRIVALS</h2>

          <div className="products">
            <div className="product-card">
              <div className="product-image">T-Shirt</div>
              <h3>Basic T-Shirt</h3>
              <p>$120</p>
            </div>

            <div className="product-card">
              <div className="product-image">Jeans</div>
              <h3>Skinny Fit Jeans</h3>
              <p>$180</p>
            </div>

            <div className="product-card">
              <div className="product-image">Shirt</div>
              <h3>Checkered Shirt</h3>
              <p>$150</p>
            </div>

            <div className="product-card">
              <div className="product-image">T-Shirt</div>
              <h3>Graphic T-Shirt</h3>
              <p>$160</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;