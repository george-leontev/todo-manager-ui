import { Button } from "devextreme-react/button"
import { Link } from "react-router-dom"

export const HomePage = () => {
    return (
        <div>
            <Link to={'/login'}>
                <Button width={100} type="danger">
                    Login
                </Button>
            </Link>
        </div>
    )
}