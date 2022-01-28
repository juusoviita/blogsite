import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
import { TailSpin } from 'react-loading-icons'
import Avatar from '@mui/material/Avatar';
import TypoGraphy from '@mui/material/Typography'

const ProfilePage = () => {
  
  const auth = useSelector((state) => state.auth)
  const onprofile = useSelector((state) => state.onprofile)
  const indprofile = useSelector((state) => state.indprofile)
  const dispatch = useDispatch()

  const [loadProfile, setLoadProfile] = useState(true)

  const { onProfilePage, addProfile, clearProfile } = bindActionCreators(actionCreators, dispatch)

  useEffect(() => {
    { !loadProfile && setLoadProfile(true) }
    const fetchUser = async (id) => {
      const res = await fetch(`http://localhost:8000/api/user-detail/${id}`, {
        method: 'GET',
        headers: {
          'Content-type':'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
      })
      const data = await res.json()
      clearProfile()
      addProfile(data)
      setLoadProfile(false)
    }
    
    { !indprofile.id ? fetchUser(indprofile.pk) : fetchUser(indprofile.id) }
    
  }, [])  

  return (
    <>
      { loadProfile ?
        <div className="row justify-content-center">
          <TailSpin style={{textAlign: "center"}} stroke="#ff8d73" strokeWidth={2} />
          <p style={{color: "whitesmoke", textAlign: "center", marginTop: "15px"}}>Loading...</p>
        </div>
        :
        <div className="row justify-content-center">
          <Avatar alt={indprofile.username} src={indprofile.profile.image} sx={{ width: 90, height: 90 }} />
          <TypoGraphy variant='h5'>{indprofile.username}</TypoGraphy>
        </div>
      }
    </>        
  )
}

export default ProfilePage
