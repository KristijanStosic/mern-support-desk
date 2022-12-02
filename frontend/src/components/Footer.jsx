import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='footer'>
      <p>Copyright &copy; Support Desk 2022</p>
      <p>
        <Link to='/about'>About This Project</Link>
      </p>
    </footer>
  )
}

export default Footer
