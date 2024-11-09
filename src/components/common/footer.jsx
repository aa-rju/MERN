import React from "react";
// import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

// Images
import Logo from "../../assets/logo/Logo-Light.jpg";

// Footer data arrays
const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces"
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
    return (
        <div className="bg-richblack-800 text-richblack-5 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                    
                    {/* Logo Section */}
                    <div className="flex flex-col items-start">
                        <img src={Logo} alt="Logo" className="h-12 mb-4" />
                        <p className="leading-relaxed">
                            Empowering learners to achieve their goals through accessible and high-quality resources.
                        </p>
                        <div className="flex mt-4 space-x-4">
                            <FaFacebook className="text-2xl cursor-pointer hover:text-blue-600" />
                            <FaGoogle className="text-2xl cursor-pointer hover:text-red-500" />
                            <FaTwitter className="text-2xl cursor-pointer hover:text-blue-400" />
                            <FaYoutube className="text-2xl cursor-pointer hover:text-red-600" />
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="flex flex-wrap justify-between flex-1 gap-8">
                        {/* Resources */}
                        <div>
                            <h3 className="font-semibold mb-4">Resources</h3>
                            <ul>
                                {Resources.map((resource, index) => (
                                    <li key={index} className="mb-2 hover:text-white">
                                        <Link to={`/${resource.toLowerCase()}`}>{resource}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Plans */}
                        <div>
                            <h3 className="font-semibold mb-4">Plans</h3>
                            <ul>
                                {Plans.map((plan, index) => (
                                    <li key={index} className="mb-2 hover:text-white">
                                        <Link to={`/${plan.toLowerCase().replace(" ", "-")}`}>{plan}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Community */}
                        <div>
                            <h3 className="font-semibold mb-4">Community</h3>
                            <ul>
                                {Community.map((community, index) => (
                                    <li key={index} className="mb-2 hover:text-white">
                                        <Link to={`/${community.toLowerCase()}`}>{community}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-richblack-700 mt-8 pt-4 flex justify-between items-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} LearnDev. All rights reserved.</p>
                    <div className="flex space-x-4">
                        {BottomFooter.map((item, index) => (
                            <Link key={index} to={`/${item.toLowerCase().replace(" ", "-")}`} className="text-sm hover:text-white">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
