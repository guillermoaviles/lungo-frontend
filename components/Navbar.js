import Link from "next/link";

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <h1>Lungo</h1>
            </div>
            <Link href="/user">Home</Link>
        </nav>
    )
}

export default Navbar;