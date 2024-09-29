import SignupForm from '@/components/auth/SignupForm'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <div className='h-[90vh] flex items-center px-3 md:px-0 overflow-y-hidden scroll-none'>
      <div className='max-w-sm  mx-auto'>
        <Card className=''>
          <CardHeader>
            <CardTitle>Sign Up Now</CardTitle>
            <CardDescription>
              Sign up is quick and easy! Just a few details and you're in!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm></SignupForm>
          </CardContent>
          <CardFooter>
            Have an account? &nbsp;
            <Link
              to='/login'
              className='underline
            text-blue-700'
            >
              {' '}
              Click here{' '}
            </Link>{' '}
            &nbsp; to log in.
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Signup
