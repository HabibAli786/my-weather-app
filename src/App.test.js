import { render, screen, cleanup } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from './components/store'

const store = createStore(
  rootReducers
);

afterEach(cleanup)

test('renders the welcome message on the default page', () => {
  render(
    // Arrange
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  // Assert
  const linkElement = screen.getByText("My Weather App");
  // Expect
  expect(linkElement).toBeInTheDocument();
});

test('navbar has the correct links for each', async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
  expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '/about')
  expect(screen.getByText('MyWeather').closest('a')).toHaveAttribute('href', '/weather')
  expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '/contact')
});

test('correct date is shown on page', async () => {
  render(
    // Arrange
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  // Assert
  const date = new Date().toLocaleDateString()
  const element = document.getElementById("date")
  
  // Expect
  expect(element.innerHTML).toEqual("Current date today: " + date)
});


test('router test for about page', async () => {
  render(
    // Arrange
    <Provider store={store}>
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    </Provider>
    // root
  );

  // check that the content changed to the new page
  expect(screen.getByText(/about us/i)).toBeInTheDocument()
})

test('router test for weather page', async () => {
  render(
    // Arrange
    <Provider store={store}>
      <MemoryRouter initialEntries={['/weather']}>
        <App />
      </MemoryRouter>
    </Provider>
    // root
  );

  // check that the content changed to the new page
  expect(screen.getByText(/welcome to the weather page/i)).toBeInTheDocument()
})

test('router test for contact page', async () => {
  render(
    // Arrange
    <Provider store={store}>
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    </Provider>
    // root
  );

  // check that the content changed to the new page
  expect(screen.getByText(/contact us/i)).toBeInTheDocument()
})

test('router test for a bad page', async () => {
  render(
    // Arrange
    <Provider store={store}>
      <MemoryRouter initialEntries={['/randompage']}>
        <App />
      </MemoryRouter>
    </Provider>
    // root
  );

  // check that the content changed to the new page
  expect(screen.getByText(/bad request/i)).toBeInTheDocument()
})


// test('loads and displays greeting', async () => {
//   render(<Fetch url="/greeting" />)

//   fireEvent.click(screen.getByText('Load Greeting'))

//   await waitFor(() => screen.getByRole('heading'))

//   expect(screen.getByRole('heading')).toHaveTextContent('hello there')
//   expect(screen.getByRole('button')).toHaveAttribute('disabled')
// })