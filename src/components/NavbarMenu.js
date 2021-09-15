// import '../App.css';
import { Nav } from 'react-bootstrap';


function NavbarMenu() {
    return (
      <>
        {/* <div className="Nav">
          <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/weather">Weather</a>
          </nav>
        </div> */}
        <div>
            <Nav
              className="justify-content-center"
              activeKey="/home"
              // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
              <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/about" eventKey="link-1">About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/weather" eventKey="link-2">MyWeather</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/contact" eventKey="link-2">Contact</Nav.Link>
              </Nav.Item>
            </Nav>
        </div>
      </>
    );
  }
  
  export default NavbarMenu;