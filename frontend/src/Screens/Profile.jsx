import React, { useCallback, useContext, useState } from 'react'
import SideBar from './SideBar'
import Uploader from '../Components/Uploader'
import { Input } from '../Components/UserInputs'
import Backend from '../utils/Backend'
import { toast } from 'sonner'
import AuthContext from '../context/AuthContext'


const Profile = () => {

  const backend = Backend()


  const { authTokens, user } = useContext(AuthContext)
  const [image, setFileResponse] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from being submitted the default way

    const formData = new FormData(e.target);
    const newEnail = formData.get('email')
    const formObject = Object.fromEntries(formData.entries())

    if (image) {
      formObject['image'] = image      // Append the actual file object
    }
    const toastOptions = {
      classNames: {
        toast: 'bg-subMain',
        title: 'text-white',
        closeButton: 'bg-subMain text-white hover:text-subMain',
      },
    }
    try {
      const response = await backend.updateProfile(authHeader, formObject);
      if (response.data) {
        toast("Profile Updated", toastOptions)
      }
      else {

        toastOptions.classNames.toast = 'bg-oldMain'
        console.log(toastOptions)
        toast("Profile update failed, Try again later", toastOptions)

      }

    } catch (error) {
      console.error('Error uploading profile:', error); // Handle any errors
    }
  };


  const handleDataFromChild = useCallback((data) => {
    setFileResponse(data)
  })

  document.title = `Update Profile`

  return (
    <>
      <SideBar>
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6" action='' method='post' encType='multipart/form-data'>
          <h2 className='text-xl font-bold'>Profile</h2>

          {user?.image &&
            <div style={{ alignItems: 'center' }} className="flex gap-5 my-auto">
              <p>Current image:</p>
              <img className="w-20 h-20 rounded-full" src={backend.BACKEND_URL + user.image} alt={user?.username + ' image'} />
            </div>
          }
          <Uploader updateParentFile={handleDataFromChild}></Uploader>
          <Input label="Full Name" placeholder='SG Uploads' type='text' bg name='name'></Input>
          <Input label="Email" placeholder='johndoe@gmail.com' type='email' name='email' bg></Input>
          <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
            {/* <button className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Delete Account</button> */}
            <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">Update Profile</button>
          </div>
        </form>

      </SideBar>

    </>

  )
}

export default Profile
