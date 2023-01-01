import Container from 'react-bootstrap/Container';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import TodoAddForm from './components/TodoAddForm'
import TodoNavbar from './components/TodoNavbar'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className="App">
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs">
    <TodoNavbar />
    <Container>
      
      <TodoAddForm />
      <TodoList />
    </Container>
    </ThemeProvider>;
    </div>
  );
}

export default App;
