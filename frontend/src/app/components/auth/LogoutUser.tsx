import { useMutation } from '@apollo/client'
import { Logout } from '@/app/graphql'
import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { setUserRole } from '@/app/globalRedux/features/userSlice';
import { GreenLight } from '../utils/alerts';

export default function LogoutUser() {
  const dispatch = useDispatch()
  
  const router = useRouter();
  const [logout, {data}] =  useMutation(Logout)

  const signOut = async () => {

    const res = await logout();

    if(res.errors?.length){
      console.error(res.errors);
    } 
  
    localStorage.clear();
    dispatch(setUserRole(""))
    GreenLight("Logged Out","User logged Out Successfully")
    router.push("/");
  }
  
  return (
    <Button 
    onClick={()=> signOut()}
    type='text'
    style={{
      paddingLeft: "0px",
    }}
    > Logout </Button>
  )
}
