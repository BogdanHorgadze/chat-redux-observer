import { render, fireEvent, waitFor} from '@testing-library/react';
import EntryPage from '../Containers/entryPage/EntryPage';
import { createStore, applyMiddleware } from 'redux'
import { rootEpic, rootReducer } from '../redux/reducers/rootReducer';
import { Provider } from 'react-redux';


const store = createStore(rootReducer)


test('check email validation', async () => {

  const { getByText, getByPlaceholderText, debug } =
    render(
      <Provider store={store}>
        <EntryPage />
      </Provider>
    )
  const emailInp = getByPlaceholderText('login')
  const loginBut = getByText('login')


  fireEvent.change(emailInp, { target: { value: 'asdas' } })
  
  
  fireEvent.click(loginBut)

  await waitFor(() => {
    getByText('must be a valid email') 
  })

//  debug()
})