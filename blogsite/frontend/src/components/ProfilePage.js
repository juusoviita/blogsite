import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import { TailSpin } from 'react-loading-icons'

const ProfilePage = () => {
  
  const auth = useSelector((state) => state.auth)
  const onprofile = useSelector((state) => state.onprofile)
  const indprofile = useSelector((state) => state.indprofile)
  const dispatch = useDispatch()

  const { onProfilePage, addProfile } = bindActionCreators(actionCreators, dispatch)

  if (indprofile.profile) {
    console.log('You came through a post click so you should have everything we need') 
  } else {
    console.log('You came through the navbar and some further data needs to be queried')
  }
  console.log(indprofile)
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-auto">
          <TailSpin stroke="#ff8d73" strokeWidth={2} />
        </div>
      </div>
      <div className="row">
        <div className="col-auto">
          <p>Loading...</p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
