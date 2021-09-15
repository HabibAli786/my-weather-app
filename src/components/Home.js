// import '../App.css';
import { connect} from 'react-redux';
import { increment, decrement } from './actions/HomeAction';
import env from "@beam-australia/react-env";

function Home(props) {

  const { increment, decrement, count } = props

  // const counter = useSelector(state => state.count)
  // const dispatch = useDispatch()
  // console.log())

  return (
    <div className="Home">
      <h1 className="d-flex justify-content-center">My Weather App</h1>
      <div>
        <p>{env("HELLO")}</p>
        <p className="px-5">A prefect site to view the weather forcast</p>
        <p id="date" className="px-5">Current date today: {new Date().toLocaleDateString()}</p>
        <p>{count}</p>
        <button onClick={() => increment()}>+</button>
        <button onClick={() => decrement()}>-</button>
      </div>
    </div>
  );
}

const matchStateToProps = state => ({
  count: state.count
})

const mapDispatchToProps = (dispatch) => {
  return {
      increment: () => dispatch(increment(5)),
      decrement: () => dispatch(decrement(5))
  }
}

export default connect(matchStateToProps, mapDispatchToProps)(Home);