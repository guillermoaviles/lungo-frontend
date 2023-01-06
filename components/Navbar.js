import Link from "next/link";

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <h1>Lungo</h1>
            </div>
            <Link className="button" href="/user"><div className="button">Home</div></Link>
        </nav>
    )
}


export default Navbar;