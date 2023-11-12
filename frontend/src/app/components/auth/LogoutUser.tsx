import { useMutation } from '@apollo/client'
import { Logout } from '@/app/graphql'
import { useRouter } from 'next/navigation';
import { Button } from 'antd';

export default function LogoutUser() {
  
  const router = useRouter();
  const [logout, {data}] =  useMutation(Logout)

  const signOut = async () => {

    const res = await logout();

    if(res.errors?.length){
      console.error(res.errors);
    } 
  
    console.log(res.data)
    router.push("/")
  }
  
  return (
    <Button onClick={()=> signOut()}> Logout </Button>
  )
}
