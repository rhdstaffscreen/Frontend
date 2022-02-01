const Footer = () => {
    const Year = new Date().getFullYear()
    return ( 
        <section>
            <div className="container text-center padding-20">
                <div>
                   &copy; {Year} Ghana Health Service RHD Staff Screening
                </div>
                <div className="section">
                Powered by: <span className="opacity-3"> IT UNIT</span>
                </div>
            </div>
        </section>
     );
}
 
export default Footer;