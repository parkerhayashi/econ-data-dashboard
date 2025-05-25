function NavBar({ sectors }) {
    return (
        <nav style={{ background: "#3b9dff", padding: "1rem", color: "#fff", position: "sticky", top: 0, zIndex: 1000 }}>
            <ul style={{ display: "flex", justifyContent: "center", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}>
                <li style={{ fontWeight: "bold" }}>                    
                    <a href="/" style={{ color: "#fff", textDecoration: "none" }}>
                        Economic Dashboard
                    </a>
                </li>
                {sectors.map((sector) => (
                <li key={sector.id}>
                    <a href={`/sector/${sector.id}`} style={{ color: "#fff", textDecoration: "none" }}>
                        {sector.id}
                    </a>
                </li>
                ))}
            </ul>
      </nav>
    );
}

export default NavBar;