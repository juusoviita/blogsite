import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'


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
    <div>
      <p>Profile page will be here</p>      
    </div>
  )
}

export default ProfilePage
